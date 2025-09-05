import React from 'react';
import { Plus, Edit, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const recipesData = [
  {
    id: 1,
    name: 'Hamburguesa Clásica',
    description: 'Carne, queso, lechuga, tomate, salsa especial',
    price: 8.50,
    ingredients: ['Carne', 'Pan', 'Queso', 'Lechuga', 'Tomate', 'Salsa'],
    category: 'Hamburguesas',
    image: '🍔'
  },
  {
    id: 2,
    name: 'Hamburguesa Deluxe',
    description: 'Doble carne, doble queso, tocino, cebolla caramelizada',
    price: 12.90,
    ingredients: ['Doble Carne', 'Pan', 'Doble Queso', 'Tocino', 'Cebolla', 'Salsa'],
    category: 'Hamburguesas',
    image: '🍔'
  },
  {
    id: 3,
    name: 'Combo Clásico',
    description: 'Hamburguesa clásica + papas + bebida',
    price: 11.50,
    ingredients: ['Hamburguesa Clásica', 'Papas Fritas', 'Bebida'],
    category: 'Combos',
    image: '🍟'
  },
  {
    id: 4,
    name: 'Combo Deluxe',
    description: 'Hamburguesa deluxe + papas grandes + bebida',
    price: 16.90,
    ingredients: ['Hamburguesa Deluxe', 'Papas Grandes', 'Bebida Grande'],
    category: 'Combos',
    image: '🍟'
  },
  {
    id: 5,
    name: 'Papas Fritas',
    description: 'Papas doradas y crujientes',
    price: 3.50,
    ingredients: ['Papas', 'Sal'],
    category: 'Acompañamientos',
    image: '🍟'
  },
  {
    id: 6,
    name: 'Bebida',
    description: 'Refrescos variados',
    price: 2.50,
    ingredients: ['Refresco'],
    category: 'Bebidas',
    image: '🥤'
  },
];

export const RecipesSection = () => {
  const categories = [...new Set(recipesData.map(recipe => recipe.category))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-foreground">Recetas y Combos</h2>
          <p className="text-muted-foreground mt-1">Gestiona los productos del menú</p>
        </div>
        <Button className="bg-gradient-gold hover:bg-brand-gold-dark text-primary-foreground shadow-button">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Receta
        </Button>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
            {category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipesData
              .filter(recipe => recipe.category === category)
              .map((recipe) => (
                <Card key={recipe.id} className="hover:shadow-elegant transition-all duration-200 border-border group">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{recipe.image}</span>
                        <div>
                          <CardTitle className="text-lg font-medium text-card-foreground">
                            {recipe.name}
                          </CardTitle>
                          <CardDescription className="text-sm text-muted-foreground">
                            {recipe.description}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">
                        <DollarSign className="w-3 h-3 mr-1" />
                        ${recipe.price.toFixed(2)}
                      </Badge>
                      <Badge variant="outline" className="border-border">
                        {recipe.category}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Ingredientes:</p>
                      <div className="flex flex-wrap gap-1">
                        {recipe.ingredients.map((ingredient, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="text-xs bg-muted text-muted-foreground"
                          >
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-border hover:bg-muted"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
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