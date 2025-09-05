import React from 'react';
import { Plus, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CartItem } from '../BurgerApp';

interface SalesSectionProps {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

const productsData = [
  {
    id: 'burger-classic',
    name: 'Hamburguesa Clásica',
    description: 'Carne, queso, lechuga, tomate',
    price: 8.50,
    category: 'Hamburguesas',
    image: '🍔',
    available: true
  },
  {
    id: 'burger-deluxe',
    name: 'Hamburguesa Deluxe',
    description: 'Doble carne, doble queso, tocino',
    price: 12.90,
    category: 'Hamburguesas',
    image: '🍔',
    available: true
  },
  {
    id: 'combo-classic',
    name: 'Combo Clásico',
    description: 'Hamburguesa + papas + bebida',
    price: 11.50,
    category: 'Combos',
    image: '🍟',
    available: true
  },
  {
    id: 'combo-deluxe',
    name: 'Combo Deluxe',
    description: 'Hamburguesa deluxe + papas + bebida',
    price: 16.90,
    category: 'Combos',
    image: '🍟',
    available: true
  },
  {
    id: 'fries',
    name: 'Papas Fritas',
    description: 'Papas doradas y crujientes',
    price: 3.50,
    category: 'Acompañamientos',
    image: '🍟',
    available: true
  },
  {
    id: 'drink',
    name: 'Bebida',
    description: 'Refrescos variados',
    price: 2.50,
    category: 'Bebidas',
    image: '🥤',
    available: false
  },
  {
    id: 'nuggets',
    name: 'Nuggets de Pollo',
    description: '6 piezas de pollo crujiente',
    price: 5.90,
    category: 'Acompañamientos',
    image: '🍗',
    available: true
  },
  {
    id: 'milkshake',
    name: 'Milkshake',
    description: 'Batido de vainilla o chocolate',
    price: 4.50,
    category: 'Bebidas',
    image: '🥤',
    available: true
  },
];

export const SalesSection: React.FC<SalesSectionProps> = ({ addToCart }) => {
  const categories = [...new Set(productsData.map(product => product.category))];

  const handleAddToCart = (product: typeof productsData[0]) => {
    if (product.available) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-foreground">Registrar Venta</h2>
          <p className="text-muted-foreground mt-1">Selecciona productos para agregar al carrito</p>
        </div>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
            {category}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {productsData
              .filter(product => product.category === category)
              .map((product) => (
                <Card 
                  key={product.id} 
                  className={`cursor-pointer transition-all duration-200 border-border ${
                    product.available 
                      ? 'hover:shadow-elegant hover:scale-105 active:scale-95' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => handleAddToCart(product)}
                >
                  <CardHeader className="text-center pb-3">
                    <div className="text-4xl mb-2">{product.image}</div>
                    <CardTitle className="text-base font-medium text-card-foreground leading-tight">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground h-8 flex items-center justify-center">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col items-center space-y-2">
                      <Badge 
                        variant="secondary" 
                        className="bg-gradient-gold text-primary-foreground font-semibold"
                      >
                        <DollarSign className="w-3 h-3 mr-1" />
                        ${product.price.toFixed(2)}
                      </Badge>
                      
                      {product.available ? (
                        <Button 
                          size="sm" 
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-button"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Agregar
                        </Button>
                      ) : (
                        <Badge variant="destructive" className="w-full justify-center">
                          Sin Stock
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};