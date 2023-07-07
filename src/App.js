import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Shop from './components/shop';
import Cart from './components/cart';
import Checkout from './components/checkout';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  //localStorage.setItem('traininglocaldataCartGuestNew', {});
  let x = localStorage.getItem("traininglocaldataCartGuestNew");
  if (x == null) {
    x = { cart: 0 }
  }
  else {
    x = JSON.parse(x);
  }
  
  const [cart, setCart] = useState(x);
  const cartcallback = (productID) => {
    let c = cart;

    if (c[productID] == undefined) {
      let m = {};
      m = { [productID]: 1 };
      setCart(products => ({
        ...products,
        ...m
      }));


    }
    else {


      let m = {};
      m = { [productID]: parseInt(c[productID]) + 1 };
      setCart(products => ({
        ...products,
        ...m
      }));

    }
    let ct = {};
    ct = { cart: parseInt(cart.cart) + 1 };
    setCart(products => ({
      ...products,
      ...ct
    }));

  }

  const cartMinusCallback=(productID) =>{
    let c = cart;

    if (c[productID] == 1) {
      // let m = {};
      // m = { [productID]: 1 };
      // setCart(products => ({
      //   ...products,
      //   ...m
      // }));
      setCart(products => {
        // 👇️ remove the salary key from an object
        const copy = {...products};
        delete copy[productID];
        return copy;
      });
    }
    else {
      let m = {};
      m = { [productID]: parseInt(c[productID]) - 1 };
      setCart(products => ({
        ...products,
        ...m
      }));

    }
    let ct = {};
    ct = { cart: parseInt(cart.cart) - 1 };
    setCart(products => ({
      ...products,
      ...ct
    }));
  }

  const emptyCartCallback=()=>{
    setCart({cart:0});
  }
  useEffect(() => {

    localStorage.setItem('traininglocaldataCartGuestNew', JSON.stringify(cart));

  }, [cart]);

  return (
    <>

      <Header cartcallback={cartcallback} cart={cart} />
      <div className='container'>
      <Routes>
        <Route exact path='' element={<Shop cartcallback={cartcallback} />} />
        <Route exact path='cart' element={<Cart cartcallback={cartcallback} cart={cart} cartMinusCallback={cartMinusCallback} />} />
        <Route exact path='checkout' element={<Checkout cart={cart} emptyCartCallback={emptyCartCallback}/>} />
      </Routes>
      </div>
      
      <Footer />
    </>
  );
}

export default App;
