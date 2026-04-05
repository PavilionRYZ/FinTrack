'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import {
  FiSun,
  FiMoon,
  FiUser,
  FiDownload,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);
  const exportToJSON = useStore((state) => state.exportToJSON);
  const exportToCSV = useStore((state) => state.exportToCSV);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExport = (format) => {
    const data = format === 'json' ? exportToJSON() : exportToCSV();
    const blob = new Blob([data], {
      type: format === 'json' ? 'application/json' : 'text/csv',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-lg font-bold">F</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-foreground">FinTrack</h1>
            <p className="text-xs text-muted-foreground">Finance Dashboard</p>
          </div>
        </motion.div>

        {/* Desktop Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden items-center gap-3 md:flex"
        >
          {/* Role Selector */}
          <div className="flex items-center gap-2">
            <FiUser className="h-4 w-4 text-muted-foreground" />
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <FiDownload className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('json')}>
                Export as JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            {mounted ? (
              resolvedTheme === 'dark' ? (
                <FiSun className="h-4 w-4" />
              ) : (
                <FiMoon className="h-4 w-4" />
              )
            ) : (
              <span className="h-4 w-4" />
            )}
          </Button>
        </motion.div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <FiX className="h-5 w-5" />
          ) : (
            <FiMenu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border bg-background md:hidden"
        >
          <div className="grid gap-4 p-4">
            {/* Role Selector */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Role</span>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              >
                {mounted ? (
                  resolvedTheme === 'dark' ? (
                    <>
                      <FiSun className="mr-2 h-4 w-4" />
                      Light
                    </>
                  ) : (
                    <>
                      <FiMoon className="mr-2 h-4 w-4" />
                      Dark
                    </>
                  )
                ) : (
                  <span>Toggle</span>
                )}
              </Button>
            </div>

            {/* Export Options */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Export</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport('csv')}
                >
                  CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport('json')}
                >
                  JSON
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
