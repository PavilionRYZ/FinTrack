'use client';

import { motion } from 'framer-motion';
import {
  FiHome,
  FiList,
  FiPieChart,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'overview', label: 'Overview', icon: FiHome },
  { id: 'transactions', label: 'Transactions', icon: FiList },
  { id: 'insights', label: 'Insights', icon: FiPieChart },
];

export function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed }) {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] border-r border-border bg-sidebar transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        'hidden lg:block'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="grid gap-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={activeTab === item.id ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    collapsed ? 'px-3' : 'px-4'
                  )}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className={cn('h-5 w-5', !collapsed && 'mr-3')} />
                  {!collapsed && (
                    <span className="text-sm">{item.label}</span>
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapse Toggle */}
        <div className="border-t border-sidebar-border p-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <FiChevronRight className="h-4 w-4" />
            ) : (
              <>
                <FiChevronLeft className="mr-2 h-4 w-4" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.aside>
  );
}

export function MobileNav({ activeTab, setActiveTab }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background lg:hidden">
      <ul className="flex items-center justify-around p-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <Button
              variant={activeTab === item.id ? 'secondary' : 'ghost'}
              size="sm"
              className="flex flex-col gap-1 h-auto py-2"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
