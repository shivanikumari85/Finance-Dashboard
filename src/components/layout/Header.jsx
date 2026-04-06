import { Menu, Moon, Sun, Shield, Eye } from 'lucide-react';
import useStore from '../../store/useStore';
import { useTheme } from '../../context/ThemeContext';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  insights: 'Insights',
};

export default function Header() {
  const activePage = useStore((s) => s.activePage);
  const activeRole = useStore((s) => s.activeRole);
  const setActiveRole = useStore((s) => s.setActiveRole);
  const toggleSidebar = useStore((s) => s.toggleSidebar);
  const { dark, toggle: toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          {PAGE_TITLES[activePage]}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Switcher */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
          <button
            onClick={() => setActiveRole('viewer')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
              activeRole === 'viewer'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Viewer</span>
          </button>
          <button
            onClick={() => setActiveRole('admin')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
              activeRole === 'admin'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
