import {
  LayoutDashboard,
  ArrowRightLeft,
  Lightbulb,
  Wallet,
  X,
} from 'lucide-react';
import useStore from '../../store/useStore';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar() {
  const activePage = useStore((s) => s.activePage);
  const setActivePage = useStore((s) => s.setActivePage);
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const setSidebarOpen = useStore((s) => s.setSidebarOpen);

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 
          bg-brand-950 dark:bg-gray-950 
          border-r border-brand-900 dark:border-gray-800
          flex flex-col transition-transform duration-300
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-brand-900 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <Wallet className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              FinSight
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-brand-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = activePage === id;
            return (
              <button
                key={id}
                onClick={() => setActivePage(id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-150
                  ${
                    active
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-900/30'
                      : 'text-brand-200 hover:bg-brand-900/50 hover:text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-brand-900 dark:border-gray-800">
          <p className="text-xs text-brand-400 dark:text-gray-500">
            © 2026 FinSight
          </p>
        </div>
      </aside>
    </>
  );
}
