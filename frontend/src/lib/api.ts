import type { Ingredient } from '@/types/ingredient';

const API_URL = import.meta.env.VITE_API_URL;
const RESOURCE_PATH = '/ingredients';

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    throw new Error(errorData?.error || 'Erro de comunicação com o servidor');
  }
  return res.json();
};

export const api = {
  getIngredients: async (): Promise<Ingredient[]> => {
    const res = await fetch(`${API_URL}${RESOURCE_PATH}`);
    return handleResponse(res);
  },

  createIngredient: async (
    data: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Ingredient> => {
    const payload = { ...data, price: Number(data.price) };
    const res = await fetch(`${API_URL}${RESOURCE_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  updateIngredient: async (id: number, data: Partial<Ingredient>): Promise<Ingredient> => {
    const payload = { ...data, price: data.price ? Number(data.price) : undefined };
    const res = await fetch(`${API_URL}${RESOURCE_PATH}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  deleteIngredient: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}${RESOURCE_PATH}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.error || 'Erro ao deletar ingrediente');
    }
  },
};
