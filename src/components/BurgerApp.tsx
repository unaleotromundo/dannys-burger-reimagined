import React, { useState } from 'react';
import { Package, ChefHat, DollarSign, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StockSection } from './sections/StockSection';
import { RecipesSection } from './sections/RecipesSection';
import { SalesSection } from './sections/SalesSection';
import { ReportsSection } from './sections/ReportsSection';
import { Cart } from './Cart';
import burgerLogo from '@/assets/danny-burger-logo.png';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const BurgerApp = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState('sales');

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-4">
            <img src={burgerLogo} alt="Danny's Burger" className="w-16 h-16" />
            <div className="text-center">
              <h1 className="text-3xl font-brand font-bold tracking-wider text-foreground">
                DANNY'S BURGER
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                Sistema de Gestión
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-14 bg-card border border-border shadow-card">
            <TabsTrigger 
              value="stock" 
              className="flex items-center space-x-2 text-sm font-medium data-[state=active]:bg-gradient-gold data-[state=active]:text-primary-foreground data-[state=active]:shadow-button"
            >
              <Package className="w-5 h-5" />
              <span>Stock Actual</span>
            </TabsTrigger>
            <TabsTrigger 
              value="recipes" 
              className="flex items-center space-x-2 text-sm font-medium data-[state=active]:bg-gradient-gold data-[state=active]:text-primary-foreground data-[state=active]:shadow-button"
            >
              <ChefHat className="w-5 h-5" />
              <span>Recetas/Combos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="sales" 
              className="flex items-center space-x-2 text-sm font-medium data-[state=active]:bg-gradient-gold data-[state=active]:text-primary-foreground data-[state=active]:shadow-button"
            >
              <DollarSign className="w-5 h-5" />
              <span>Registrar Venta</span>
            </TabsTrigger>
            <TabsTrigger 
              value="reports" 
              className="flex items-center space-x-2 text-sm font-medium data-[state=active]:bg-gradient-gold data-[state=active]:text-primary-foreground data-[state=active]:shadow-button"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Reportes</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="stock" className="space-y-6">
              <StockSection />
            </TabsContent>

            <TabsContent value="recipes" className="space-y-6">
              <RecipesSection />
            </TabsContent>

            <TabsContent value="sales" className="space-y-6">
              <SalesSection addToCart={addToCart} />
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <ReportsSection />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Floating Cart */}
      {cartItems.length > 0 && (
        <Cart 
          items={cartItems}
          total={total}
          updateQuantity={updateCartQuantity}
          onClear={clearCart}
        />
      )}
    </div>
  );
};