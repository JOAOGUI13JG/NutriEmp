import { SummaryCard } from "@/components/dashboard/summary-card";
import { MealList } from "@/components/dashboard/meal-list";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { useMeals } from "@/hooks/use-meals";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { todayMeals, todaySummary, weeklyData, isLoading } = useMeals();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6 pb-16 md:pb-0">
        <Skeleton className="h-[300px] w-full rounded-xl" />
        <Skeleton className="h-[200px] w-full rounded-xl" />
        <Skeleton className="h-[300px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pb-16 md:pb-0">
      {/* Daily Summary */}
      <SummaryCard summary={todaySummary} />
      
      {/* Meals Today */}
      <MealList meals={todayMeals} />
      
      {/* Weekly Stats */}
      <ProgressChart weeklyData={weeklyData} />
    </div>
  );
}
