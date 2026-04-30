import { useAuthStore } from '../store/authStore';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useProductStore } from '../store/productStore';
import { useEffect } from 'react';
import { ShoppingBag, Users, TrendingUp } from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuthStore();
  const { productos, fetchProductos } = useProductStore();

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const stats = [
    { title: 'Productos Totales', value: productos.length, icon: ShoppingBag, color: 'text-blue-600' },
    { title: 'Usuarios Activos', value: '12', icon: Users, color: 'text-green-600' },
    { title: 'Ventas del Mes', value: '$12,450', icon: TrendingUp, color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Bienvenido, {user?.username} 👋</h2>
        <p className="text-muted-foreground">Aquí tienes un resumen de lo que está pasando hoy.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">+20.1% desde el mes pasado</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nuevo producto agregado</p>
                  <p className="text-xs text-muted-foreground">Hace {i * 2} horas</p>
                </div>
                <div className="text-sm font-medium text-green-600">Completado</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
