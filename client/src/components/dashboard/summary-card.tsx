import { DailySummary } from "@/types";
import { useUser } from "@/hooks/use-user";
import { calculateCalorieDeficit, getDeficitColor } from "@/lib/utils/nutrition";

interface SummaryCardProps {
  summary: DailySummary;
}

export function SummaryCard({ summary }: SummaryCardProps) {
  const { user } = useUser();
  const dailyGoal = user?.dailyCalorieGoal || 2000;
  
  const calorieDeficit = calculateCalorieDeficit(summary.calories, dailyGoal);
  
  // Calculate percentage for progress bars
  const caloriePercentage = Math.min(100, (summary.calories / dailyGoal) * 100);
  const proteinPercentage = 70; // In a real app, this would be based on goals
  const carbsPercentage = 55;
  const fatPercentage = 40;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Resumo do Dia</h2>
        <div className="flex space-x-2 text-sm mt-2 sm:mt-0">
          <button className="px-3 py-1 bg-primary-500 text-white rounded-full">Hoje</button>
          <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full">Ontem</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Calories Target */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 mb-1">Calorias</div>
          <div className="flex items-end">
            <span className="text-2xl font-semibold">{summary.calories}</span>
            <span className="text-sm text-slate-500 ml-1">/ {dailyGoal} kcal</span>
          </div>
          <div className="mt-2 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-secondary-500 h-full" 
              style={{ width: `${caloriePercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Proteins */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 mb-1">Proteínas</div>
          <div className="flex items-end">
            <span className="text-2xl font-semibold">{summary.protein}</span>
            <span className="text-sm text-slate-500 ml-1">g</span>
          </div>
          <div className="mt-2 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: `${proteinPercentage}%` }}></div>
          </div>
        </div>
        
        {/* Carbs */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 mb-1">Carboidratos</div>
          <div className="flex items-end">
            <span className="text-2xl font-semibold">{summary.carbs}</span>
            <span className="text-sm text-slate-500 ml-1">g</span>
          </div>
          <div className="mt-2 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-orange-500 h-full" style={{ width: `${carbsPercentage}%` }}></div>
          </div>
        </div>
        
        {/* Fats */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="text-sm text-slate-500 mb-1">Gorduras</div>
          <div className="flex items-end">
            <span className="text-2xl font-semibold">{summary.fat}</span>
            <span className="text-sm text-slate-500 ml-1">g</span>
          </div>
          <div className="mt-2 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full" style={{ width: `${fatPercentage}%` }}></div>
          </div>
        </div>
      </div>

      {/* Deficit summary */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Balanço Calórico</h3>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 bg-slate-50 p-4 rounded-lg">
            <div className="text-sm text-slate-500 mb-1">Meta Diária</div>
            <div className="text-2xl font-semibold">{dailyGoal} kcal</div>
          </div>
          <div className="flex-1 bg-slate-50 p-4 rounded-lg">
            <div className="text-sm text-slate-500 mb-1">Consumido</div>
            <div className="text-2xl font-semibold">{summary.calories} kcal</div>
          </div>
          <div className="flex-1 bg-slate-50 p-4 rounded-lg">
            <div className="text-sm text-slate-500 mb-1">Déficit/Excesso</div>
            <div className={`text-2xl font-semibold ${getDeficitColor(calorieDeficit)}`}>
              <span>{calorieDeficit < 0 ? '-' : '+'}</span>
              <span>{Math.abs(calorieDeficit)} kcal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
