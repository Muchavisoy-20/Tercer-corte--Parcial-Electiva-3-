import { Link, Outlet, useNavigate } from 'react-router';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { LayoutDashboard, ShoppingBag, LogOut, User } from 'lucide-react';

export const DashboardLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r bg-card lg:block">
        <div className="flex h-full flex-col p-6">
          <Link to="/" className="flex items-center gap-2 mb-10 hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 rounded-lg premium-gradient" />
            <span className="text-xl font-bold">AdminPanel</span>
          </Link>

          <nav className="flex-1 space-y-2">
            <Link to="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <ShoppingBag className="h-5 w-5" />
                Productos
              </Button>
            </Link>
            <Link to="/categories">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <LayoutDashboard className="h-5 w-5" />
                Categorías
              </Button>
            </Link>
          </nav>

          <div className="mt-auto pt-6 border-t">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <User className="h-4 w-4 text-primary-600" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{user?.username || 'Usuario'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <Button variant="destructive" className="w-full justify-start gap-3" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:pl-64">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-md">
          <Link to="/" className="lg:hidden">
            <h1 className="text-lg font-semibold">AdminPanel</h1>
          </Link>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
