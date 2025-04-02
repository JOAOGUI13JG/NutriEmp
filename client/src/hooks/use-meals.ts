import { useQuery, useMutation } from "@tanstack/react-query";
import { Meal, DailySummary, Food } from "@/types";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { format, subDays, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function useMeals() {
  const [userId, setUserId] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  }, []);

  // Get today's date formatted as YYYY-MM-DD
  const today = format(new Date(), 'yyyy-MM-dd');
  
  // Get meals for today
  const { 
    data: todayMeals = [], 
    isLoading: isLoadingTodayMeals,
  } = useQuery<Meal[]>({ 
    queryKey: [userId ? `/api/users/${userId}/meals` : null, { date: today }],
    enabled: !!userId,
    staleTime: 30000, // Reduce refetching frequency to prevent constant flickering
    refetchInterval: 60000, // Only refetch every minute
    refetchOnWindowFocus: false, // Prevent refetching when window regains focus
  });

  // Calculate daily summary from meals
  const calculateDailySummary = (meals: Meal[]): DailySummary => {
    return meals.reduce((summary, meal) => {
      return {
        calories: summary.calories + meal.calories,
        protein: summary.protein + meal.protein,
        carbs: summary.carbs + meal.carbs,
        fat: summary.fat + meal.fat,
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const todaySummary = calculateDailySummary(todayMeals);

  // Get a week of meals for reports
  const weekStart = format(subDays(new Date(), 6), 'yyyy-MM-dd');
  const weekEnd = today;

  const { 
    data: weeklyMeals = [],
    isLoading: isLoadingWeeklyMeals, 
  } = useQuery<Meal[]>({ 
    queryKey: [userId ? `/api/users/${userId}/meals` : null, { startDate: weekStart, endDate: weekEnd }],
    enabled: !!userId,
    staleTime: 30000, // Reduce refetching frequency
    refetchInterval: 60000, // Only refetch every minute
    refetchOnWindowFocus: false, // Prevent refetching when window regains focus
  });

  // Group weekly meals by date
  const weeklyData = [...Array(7)].map((_, index) => {
    const date = format(subDays(new Date(), 6 - index), 'yyyy-MM-dd');
    const day = format(subDays(new Date(), 6 - index), 'EEEE', { locale: ptBR });
    
    const mealsForDay = weeklyMeals.filter(meal => meal.date === date);
    const summary = calculateDailySummary(mealsForDay);
    
    return {
      date,
      day: day.charAt(0).toUpperCase() + day.slice(1),
      ...summary
    };
  });

  // Get all available foods
  const { 
    data: foods = [],
    isLoading: isLoadingFoods, 
  } = useQuery<Food[]>({ 
    queryKey: ['/api/foods'],
    staleTime: 60000, // Cache for longer since food data changes less frequently
    refetchOnWindowFocus: false
  });

  // Add a new meal
  const addMealMutation = useMutation({
    mutationFn: async (mealData: Omit<Meal, 'id' | 'createdAt'>) => {
      const res = await apiRequest('POST', '/api/meals', mealData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/meals`] });
      toast({
        title: "Refeição adicionada",
        description: "Sua refeição foi registrada com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao adicionar refeição",
        description: "Não foi possível adicionar a refeição. Tente novamente.",
        variant: "destructive",
      });
      console.error("Failed to add meal:", error);
    },
  });

  // Delete a meal
  const deleteMealMutation = useMutation({
    mutationFn: async (mealId: number) => {
      await apiRequest('DELETE', `/api/meals/${mealId}`);
      return mealId;
    },
    onSuccess: (mealId) => {
      queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/meals`] });
      toast({
        title: "Refeição removida",
        description: "A refeição foi removida com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao remover refeição",
        description: "Não foi possível remover a refeição. Tente novamente.",
        variant: "destructive",
      });
      console.error("Failed to delete meal:", error);
    },
  });

  return {
    todayMeals,
    todaySummary,
    weeklyData,
    foods,
    addMeal: addMealMutation.mutate,
    deleteMeal: deleteMealMutation.mutate,
    isLoading: isLoadingTodayMeals || isLoadingWeeklyMeals || isLoadingFoods,
    isPending: addMealMutation.isPending || deleteMealMutation.isPending,
  };
}
