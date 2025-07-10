import './App.css'
import MyCart from "./components/MyCart.tsx";
import type {Product} from "./type.ts";
import products from '../data.json';
import {ProductProvider} from "./Contexts/ProductContext.tsx";
import {CartProvider} from "./Contexts/CartContext.tsx";
import ProductList from "./components/ProductList.tsx";

function App() {

  const productItems: Product[] = products;

  return (
    <ProductProvider products={productItems}>
      <CartProvider>
        <main className="container px-6 md:mx-auto">
          <div className="grid grid-rows-1 md:grid-cols-3 gap-6 py-10 md:py-20">
            <div className="md:col-span-2">
              <h1 className="font-bold text-3xl text-amber-950">Desserts</h1>
              <ProductList/>
            </div>
            <div>
              <MyCart/>
            </div>
          </div>
        </main>
        <div className="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
          Coded by <a href="https://github.com/oziriz31">Yvan Akoo</a>.
        </div>
      </CartProvider>
    </ProductProvider>
  )
}

export default App
