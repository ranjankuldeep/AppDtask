import {createContext, useState} from 'react/cjs/react.production.min';
import React from 'react';
export const ProductsContext = createContext({
  products: [],
  products2: [],
  setproducts: item => {},
  setproducts2: item => {},
  id: [],
  updateid: id => {},
});

function ProductsContextProvider({children}) {
  const [productlist, setproductlist] = React.useState([]);
  const [productlist2, setproductlist2] = React.useState([]);
  const [ids, setids] = React.useState([]);
  function PressHandler(item) {
    setproductlist(prev => [...prev, item]);
  }
  function PressHandler2(item) {
    setproductlist2(prev => [...prev, item]);
  }
  function updateids(id) {
    setids(prev => [...prev, id]);
  }
  const value = {
    products: productlist,
    products2: productlist2,
    setproducts: PressHandler,
    setproducts2: PressHandler2,
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
