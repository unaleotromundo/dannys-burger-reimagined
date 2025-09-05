import React from 'react';
import { Download, TrendingUp, DollarSign, Package, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const salesData = [
  { date: '2024-01-05', time: '14:30', items: 'Combo Clásico x2, Papas x1', total: 25.50, customer: 'Mesa 3' },
  { date: '2024-01-05', time: '15:15', items: 'Hamburguesa Deluxe x1', total: 12.90, customer: 'Para llevar' },
  { date: '2024-01-05', time: '16:00', items: 'Combo Deluxe x1, Bebida x2', total: 21.90, customer: 'Mesa 1' },
  { date: '2024-01-05', time: '16:45', items: 'Hamburguesa Clásica x3', total: 25.50, customer: 'Mesa 5' },
  { date: '2024-01-05', time: '17:20', items: 'Combo Clásico x1, Nuggets x1', total: 17.40, customer: 'Para llevar' },
];

const statsData = [
  { 
    title: 'Ventas Hoy', 
    value: '$103.20', 
    change: '+12.5%', 
    icon: DollarSign,
    color: 'text-success'
  },
  { 
    title: 'Productos Vendidos', 
    value: '23', 
    change: '+8.2%', 
    icon: Package,
    color: 'text-success'
  },
  { 
    title: 'Clientes Atendidos', 
    value: '15', 
    change: '+15.0%', 
    icon: Users,
    color: 'text-success'
  },
  { 
    title: 'Promedio por Venta', 
    value: '$6.88', 
    change: '+3.1%', 
    icon: TrendingUp,
    color: 'text-success'
  },
];

export const ReportsSection = () => {
  const totalToday = salesData.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-foreground">Reportes y Estadísticas</h2>
          <p className="text-muted-foreground mt-1">Analiza el rendimiento de tu negocio</p>
        </div>
        <Button className="bg-gradient-gold hover:bg-brand-gold-dark text-primary-foreground shadow-button">
          <Download className="w-4 h-4 mr-2" />
          Exportar PDF
        </Button>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index} className="hover:shadow-elegant transition-all duration-200 border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-sm font-medium ${stat.color}`}>
                    {stat.change} vs. ayer
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Historial de ventas */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-medium text-card-foreground">
            Historial de Ventas - Hoy
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Últimas transacciones registradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesData.map((sale, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border hover:bg-muted/70 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-muted-foreground font-medium">
                      {sale.time}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {sale.customer}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {sale.items}
                  </div>
                </div>
                <div className="text-lg font-semibold text-foreground">
                  ${sale.total.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-foreground">Total del Día:</span>
              <span className="text-2xl font-bold text-primary">${totalToday.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Productos más vendidos */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-medium text-card-foreground">
            Productos Más Vendidos
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Top 5 productos de la semana
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Combo Clásico', sales: 45, revenue: 517.50 },
              { name: 'Hamburguesa Clásica', sales: 38, revenue: 323.00 },
              { name: 'Papas Fritas', sales: 32, revenue: 112.00 },
              { name: 'Combo Deluxe', sales: 28, revenue: 473.20 },
              { name: 'Bebidas', sales: 25, revenue: 62.50 },
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} unidades vendidas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${product.revenue.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};