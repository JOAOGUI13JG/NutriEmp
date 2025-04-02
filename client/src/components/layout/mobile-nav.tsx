import { useLocation } from "wouter";
import { NavItem } from "@/types";

export default function MobileNav() {
  const [location, navigate] = useLocation();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Home', icon: 'ri-home-line', path: '/' },
    { id: 'add-meal', label: 'Adicionar', icon: 'ri-add-circle-line', path: '/add-meal' },
    { id: 'reports', label: 'Relatórios', icon: 'ri-bar-chart-line', path: '/reports' },
    { id: 'profile', label: 'Perfil', icon: 'ri-user-line', path: '/profile' }
  ];

  return (
    <nav className="md:hidden bg-white border-t border-slate-200 fixed bottom-0 left-0 right-0 z-10">
      <div className="grid grid-cols-4">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`
              flex flex-col items-center py-2
              ${location === item.path ? 'text-primary-700' : 'text-slate-600'}
            `}
          >
            <i className={`${item.icon} text-xl`}></i>
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
