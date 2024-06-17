import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../models/recipe.model';
import { map, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private apiUrl =
    'https://angular-shopping-app-60a74-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.apiUrl).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return { ...recipe, ingredients: recipe.ingredients || [] };
        });
      }),
      tap((recipes) => this.recipeService.setRecipes(recipes))
    );
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.apiUrl, recipes).subscribe((res) => console.log(res));
  }
}
