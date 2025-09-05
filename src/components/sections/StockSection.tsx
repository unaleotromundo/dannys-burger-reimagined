import React from 'react';
import { Plus, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const stockData = [
  { id: 1, item: 'Carne de Hamburguesa', quantity: 25, minStock: 10, unit: 'unidades', status: 'good' },
  { id: 2, item: 'Pan de Hamburguesa', quantity: 45, minStock: 20, unit: 'unidades', status: 'good' },
  { id: 3, item: 'Queso Cheddar', quantity: 8, minStock: 15, unit: 'rebanadas', status: 'low' },
  { id: 4, item: 'Lechuga', quantity: 3, minStock: 5, unit: 'hojas', status: 'critical' },
  { id: 5, item: 'Tomate', quantity: 12, minStock: 8, unit: 'rodajas', status: 'good' },
  { id: 6, item: 'Papas Fritas', quantity: 18, minStock: 12, unit: 'porciones', status: 'good' },
  { id: 7, item: 'Bebidas', quantity: 30, minStock: 20, unit: 'unidades', status: 'good' },
  { id: 8, item: 'Salsas', quantity: 6, minStock: 10, unit: 'porciones', status: 'low' },
];

export const StockSection = () => {
  const getStatusBadge = (status: string, quantity: number, minStock: number) => {
    if (status === 'critical') {
      return <Badge variant="destructive" className="flex items-center space-x-1">
        <AlertTriangle className="w-3 h-3" />
        <span>Crítico</span>
      </Badge>;
    }
    if (status === 'low') {
      return <Badge variant="secondary" className="flex items-center space-x-1 bg-warning text-warning-foreground">
        <AlertTriangle className="w-3 h-3" />
        <span>Bajo</span>
      </Badge>;
    }
    return <Badge variant="secondary" className="flex items-center space-x-1 bg-success text-success-foreground">
      <CheckCircle className="w-3 h-3" />
      <span>Bueno</span>
    </Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-foreground">Stock Actual</h2>
          <p className="text-muted-foreground mt-1">Gestiona el inventario de ingredientes</p>
        </div>
        <Button className="bg-gradient-gold hover:bg-brand-gold-dark text-primary-foreground shadow-button">
          <Plus className="w-4 h-4 mr-2" />
          Añadir Stock
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stockData.map((item) => (
          <Card key={item.id} className="hover:shadow-elegant transition-all duration-200 border-border">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-medium text-card-foreground">{item.item}</CardTitle>
                {getStatusBadge(item.status, item.quantity, item.minStock)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cantidad:</span>
                  <span className="font-semibold text-foreground">{item.quantity} {item.unit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Stock mínimo:</span>
                  <span className="text-sm text-foreground">{item.minStock} {item.unit}</span>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Nivel</span>
                  <span>{Math.round((item.quantity / (item.minStock * 2)) * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      item.status === 'critical' ? 'bg-destructive' :
                      item.status === 'low' ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${Math.min(100, (item.quantity / (item.minStock * 2)) * 100)}%` }}
                  />
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3 border-border hover:bg-muted"
              >
                <Plus className="w-3 h-3 mr-1" />
                Reabastecer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};