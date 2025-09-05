import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CartItem } from './BurgerApp';
import { useToast } from '@/hooks/use-toast';

interface CartProps {
  items: CartItem[];
  total: number;
  updateQuantity: (id: string, quantity: number) => void;
  onClear: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, total, updateQuantity, onClear }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleConfirmSale = async () => {
    setIsProcessing(true);
    
    // Simular procesamiento de venta
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "¡Venta registrada exitosamente!",
      description: `Total: $${total.toFixed(2)} - ${totalItems} productos vendidos`,
      duration: 3000,
    });
    
    onClear();
    setIsProcessing(false);
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`transition-all duration-300 ease-in-out shadow-elegant border-border ${
        isExpanded ? 'w-80' : 'w-16'
      }`}>
        {/* Cart Toggle Button */}
        <div 
          className="cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-foreground" />
                  {totalItems > 0 && (
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-primary text-primary-foreground p-0 flex items-center justify-center"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </div>
                {isExpanded && (
                  <div>
                    <CardTitle className="text-lg font-medium text-card-foreground">
                      Carrito
                    </CardTitle>
                  </div>
                )}
              </div>
              {isExpanded && totalItems > 0 && (
                <Badge className="bg-gradient-gold text-primary-foreground font-semibold">
                  ${total.toFixed(2)}
                </Badge>
              )}
            </div>
          </CardHeader>
        </div>

        {/* Cart Content */}
        {isExpanded && (
          <CardContent className="p-4 pt-0 max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                Carrito vacío
              </p>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg border border-border">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} c/u</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-6 h-6 p-0 border-border"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      
                      <span className="w-8 text-center text-sm font-medium text-foreground">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-6 h-6 p-0 border-border"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-6 h-6 p-0 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => updateQuantity(item.id, 0)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Total and Actions */}
                <div className="pt-3 border-t border-border space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total:</span>
                    <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-border hover:bg-muted"
                      onClick={onClear}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Limpiar
                    </Button>
                    
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-gold hover:bg-brand-gold-dark text-primary-foreground shadow-button"
                      onClick={handleConfirmSale}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <div className="flex items-center">
                          <div className="animate-spin w-3 h-3 border-2 border-primary-foreground border-t-transparent rounded-full mr-1" />
                          Procesando...
                        </div>
                      ) : (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Confirmar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};