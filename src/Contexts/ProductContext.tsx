// contexts/ProductContext.tsx
import React, {createContext, useContext} from 'react';
import type {Product} from '../type';

interface ProductContextType {
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{
  products: Product[];
  children: React.ReactNode;
}> = ({products, children}) => {
  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProductById,
        getProductsByCategory
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
