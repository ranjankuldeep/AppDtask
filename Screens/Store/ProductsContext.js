import {createContext, useState} from 'react/cjs/react.production.min';
import React from 'react';
export const ProductsContext = createContext({
  products: [],
  setproducts: item => {},
  id: [],
  updateid: id => {},
});

function ProductsContextProvider({children}) {
  const [productlist, setproductlist] = React.useState([]);
  const [ids, setids] = React.useState([]);
  function PressHandler(item) {
    setproductlist(prev => [...prev, item]);
  }
  function updateids(id) {
    setids(prev => [...prev, id]);
  }
  const value = {
    products: productlist,
    setproducts: PressHandler,
    id: ids,
    updateid: updateids,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
export default ProductsContextProvider;
