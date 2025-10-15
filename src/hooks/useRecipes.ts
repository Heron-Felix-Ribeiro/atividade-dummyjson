import { Recipe } from "../interfaces/Recipe";
import { RecipesResponse } from "../interfaces/RecipeResponse";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export function useRecipes() {

  const findAll = async (): Promise<RecipesResponse> => {
    const response = await fetch(`${API_URL}/recipes`);
    const dados: RecipesResponse = await response.json();
    if (!response.ok) {
      throw new Error("Erro ao buscar receitas");
    }
    return dados;
  }

  const findById = async (id: number): Promise<Recipe> => {
    const response = await fetch(`${API_URL}/recipes/${id}`);
    const dados: Recipe = await response.json();
    if (!response.ok) {
      throw new Error("Erro ao buscar receita");
    }
    return dados;
  }

  const create = async (recipe: Omit<Recipe, 'id'>): Promise<void> => {
    const response = await fetch(`${API_URL}/recipes/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });
    const dados: Recipe = await response.json();
    if (!response.ok) {
      throw new Error("Erro ao criar receita");
    }
  }

  const update = async (id: number, recipe: Recipe) => {
    const response = await fetch(`${API_URL}/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error("Erro ao atualizar receita");
    }
  }

  const remove = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/recipes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error("Erro ao remover receita");
    }
  }

  return { findAll, findById, create, update, remove };
}