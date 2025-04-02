import { Meal } from "@/types";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useMeals } from "@/hooks/use-meals";

interface MealListProps {
  meals: Meal[];
}

export function MealList({ meals }: MealListProps) {
  const [, navigate] = useLocation();
  const { deleteMeal, isPending } = useMeals();

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Refeições de Hoje</h2>
        <Button
          onClick={() => navigate("/add-meal")}
          className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg flex items-center"
        >
          <i className="ri-add-line mr-1"></i> Adicionar
        </Button>
      </div>
      
      {/* Meal List */}
      <div className="space-y-3">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal.id} className="border border-slate-200 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-lg">{meal.name}</span>
                    <span className="ml-2 text-xs bg-slate-100 px-2 py-0.5 rounded">{meal.time}</span>
                  </div>
                  <div className="text-slate-500 text-sm mt-1">
                    {meal.foods.map((food, idx) => (
                      <span key={idx}>
                        {food.name}
                        {idx < meal.foods.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{meal.calories} kcal</div>
                  <div className="text-xs text-slate-500 mt-1">
                    <span>{meal.protein}g</span> P • 
                    <span>{meal.carbs}g</span> C • 
                    <span>{meal.fat}g</span> G
                  </div>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 flex justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-500 hover:text-red-600"
                  onClick={() => deleteMeal(meal.id)}
                  disabled={isPending}
                >
                  <i className="ri-delete-bin-line mr-1"></i> Remover
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
              <i className="ri-restaurant-line text-3xl"></i>
            </div>
            <p className="text-slate-500">Nenhuma refeição registrada hoje</p>
            <Button 
              onClick={() => navigate("/add-meal")}
              className="mt-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg inline-flex items-center"
            >
              <i className="ri-add-line mr-1"></i> Adicionar Refeição
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
