import { useLocation } from "wouter";
import { useUser } from "@/hooks/use-user";
import { NavItem } from "@/types";

export default function Sidebar() {
  const [location, navigate] = useLocation();
  const { user } = useUser();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line', path: '/' },
    { id: 'add-meal', label: 'Adicionar Refeição', icon: 'ri-restaurant-line', path: '/add-meal' },
    { id: 'reports', label: 'Relatórios', icon: 'ri-bar-chart-line', path: '/reports' },
    { id: 'profile', label: 'Perfil', icon: 'ri-user-line', path: '/profile' },
    { id: 'contact', label: 'Fale Conosco', icon: 'ri-customer-service-line', path: '/contact' }
  ];

  return (
    <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <h1 className="text-xl font-semibold text-primary-700">NutriTrack</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button 
                onClick={() => navigate(item.path)}
                className={`
                  flex items-center w-full p-3 rounded-lg text-left transition-colors
                  ${location === item.path ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-50'}
                `}
              >
                <i className={`${item.icon} text-xl mr-3`}></i>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {user && (
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
              <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
            </div>
            <div>
              <p className="font-medium">{user.name || 'Usuário'}</p>
              <p className="text-sm text-slate-500">
                {user.dailyCalorieGoal ? `${user.dailyCalorieGoal} kcal/dia` : '0 kcal/dia'}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
