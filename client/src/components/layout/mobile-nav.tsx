import { useLocation } from "wouter";
import { NavItem } from "@/types";

export default function MobileNav() {
  const [location, navigate] = useLocation();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Home', icon: 'ri-home-line', path: '/' },
    { id: 'add-meal', label: 'Adicionar', icon: 'ri-add-circle-line', path: '/add-meal' },
    { id: 'reports', label: 'Relatórios', icon: 'ri-bar-chart-line', path: '/reports' },
    { id: 'profile', label: 'Perfil', icon: 'ri-user-line', path: '/profile' },
    { id: 'contact', label: 'Contato', icon: 'ri-customer-service-line', path: '/contact' }
  ];

  return (
    <nav className="md:hidden bg-white border-t border-slate-200 fixed bottom-0 left-0 right-0 z-10 shadow-lg">
      <div className="grid grid-cols-5">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`
              flex flex-col items-center py-3 relative
              ${location === item.path 
                ? 'text-primary-700' 
                : 'text-slate-500 hover:text-primary-600'}
            `}
          >
            {location === item.path && (
              <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-1 bg-primary-500 rounded-full"></span>
            )}
            <i className={`${item.icon} text-xl ${location === item.path ? 'text-primary-600' : ''}`}></i>
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
