import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Schnitzel',
      'Tasty Schnitzel',
      'https://images.immediate.co.uk/production/volatile/sites/2/2021/10/WienerSchnitzel_015-d281ef4.jpg?quality=90&crop=13px,4395px,5656px,2433px&resize=556,505',
      [new Ingredient('Meat', 1), new Ingredient('Fires', 20)]
    ),
    new Recipe(
      'Burger',
      'A Juicy Burger',
      'https://mrbrownbakery.com/image/images/rEyMLsj21Ooxk5mfhdeh7bSevaLGzUtczWXVDj4u.jpeg?p=full',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
        new Ingredient('Cheese', 2),
      ]
    ),
  ];

  onRecipeSelect = new EventEmitter<Recipe>();

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
