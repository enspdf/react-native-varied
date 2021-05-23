import { useState, useEffect } from 'react';
import {} from 'react';
import cafeApi from '../api/cafeApi';
import { Categoria, CategoriesResponse } from '../interfaces/appInterfaces';

export const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Categoria[]>([]);

  const getCategories = async () => {
    const response = await cafeApi.get<CategoriesResponse>('/categorias');
    setCategories(response.data.categorias);
    setIsLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    categories,
    isLoading,
  };
};
