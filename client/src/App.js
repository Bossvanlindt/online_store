import { useState, useEffect } from "react";
import React from "react";
import productHandler from "./services/products";
import NavigationBar from "./components/NavigationBar";
import Products from "./components/Products";
import Cart from "./components/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Get products right after rendering the page (via useEffect)
  const getProducts = async () => {
    const res = await productHandler.getAll();
    setProducts(res);
  };
  useEffect(() => {
    getProducts();
  }, []);

  // Cart logic
  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  const removeFromCart = (product) => {
    const updatedCart = cart.filter((p) => p !== product);
    setCart(updatedCart);
  };
  const completePurchase = async () => {
    // Purchase all items & pull new data for up-to-date info
    setCart([]);
    await productHandler.purchaseAll(cart);
    await getProducts();
  };

  return (
    <div>
      <NavigationBar cart={cart} setCartOpen={setCartOpen} />
      <Products products={products} addToCart={addToCart} />
      <Cart
        cart={cart}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        removeFromCart={removeFromCart}
        completePurchase={completePurchase}
      />
    </div>
  );
}

export default App;
