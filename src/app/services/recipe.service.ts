import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
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

  constructor(private slService: ShoppingListService) {}

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}