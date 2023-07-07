import React, { useState, useEffect } from "react";
import { CartDiv } from "./style";
import axios from "axios";
import { Link } from "react-router-dom";
import plus from './images/plus.png'
import minus from './images/minus.png'
import cancel from './images/cancel.png'


const Cart = ({ cartcallback, cart ,cartMinusCallback}) => {
    

    const [products, setProducts] = useState(null)
    const [cartTotal,setCartTotal] =useState(0)
   

    function cartClick(productID)
    {
        cartcallback(productID);
        //console.log(productID);
    }
    function cartClickMinus(productID)
    {
        cartMinusCallback(productID)

    }
    function calculateSum(amt)
    {
        let sum=cartTotal;
        sum=sum+amt;
        setCartTotal(sum)
    }
    let productListArr = Object.keys(cart);
    let index = productListArr.indexOf('cart');
    if (index > -1) { // only splice array when item is found
        productListArr.splice(index, 1); // 2nd parameter means remove one item only
    }

    let consumer_key = 'ck_05103e9fc9c96c9d2855862f2f07b27e21d07126';
    let consumer_secret = 'cs_126d6787aa440ee462e1419a81c4a9dffc16a052';
    let url = 'https://yourcloudnetwork.net/projects/training/wp-json/wc/v3/products?consumer_key=' + consumer_key + '&consumer_secret=' + consumer_secret;
    useEffect(
        () => {
            
            
            if (productListArr.length > 0) {
                for (let i = 0; i < productListArr.length; i++) {
                    url = url + '&include[]=' + productListArr[i]
                }
                

                axios.get(url)
                    .then(function (d) {
                        let data=d.data
                        let sum=0
                        setProducts(data)
                        {data.map((dt, i) => {
                            sum=sum+(parseFloat(dt.price)*cart[dt.id])
                        })}
                        setCartTotal(sum)

                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .finally(function () {

                    });
             }




        },
        [cart]
    )
    if (cart.cart == 0) return (
        <CartDiv>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-12">
                        <h2>Your cart is empty !</h2>
                    </div>
                </div>
            </div>
        </CartDiv>
    )
    if (!products) return (
        <CartDiv>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-12">
                        <h2>Loading...</h2>
                    </div>
                </div>
            </div>
        </CartDiv>
    )
    return (
        <CartDiv>
            <section className="h-100 h-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="col-md-8">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="mb-0">Cart - {cart.cart} items</h5>
                                    </div>
                                    <div className="card-body">
                                        {products.map((dt, i) => {
                                            const img = dt.images.length > 0 ? dt.images[0].src : '';
                                            const regex = /(<([^>]+)>)/ig;
                                            const desc = dt.short_description.replace(regex, '');
                                            //calculateSum(dt.price);
                                            return (
                                                <div className="row" key={dt.slug}>
                                                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                        <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                            <img src={img}
                                                                className="w-100" alt={dt.slug} />
                                                            <a href="#!">
                                                                <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                        <p><strong>{dt.id} {dt.name}</strong></p>
                                                        <p>{desc}</p>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                        <div className="input-group">
                                                            <span className="input-group-prepend">
                                                                <button type="button" className="btn btn-outline-secondary btn-number" onClick={() => { cartClick(dt.id) }} >
                                                                <img src={plus} className="action-btn" />
                                                                </button>
                                                            </span>
                                                            <input type="text" name="quant[1]" className="form-control input-number"  value={cart[dt.id]} onChange={()=>{return true;}}/>
                                                            <span className="input-group-append">
                                                                <button type="button" className="btn btn-outline-secondary btn-number">
                                                                <img src={minus} className="action-btn" onClick={() => { cartClickMinus(dt.id) }}/>
                                                                </button>
                                                            </span>
                                                        </div>
                                                        <p className="text-start text-md-center">
                                                            <strong>${dt.price}</strong>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <hr />
                                                    </div>
                                                </div>
                                            )
                                        })}





                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="mb-0">Summary</h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Products
                                                <span className="cart-sumr-label">${cartTotal}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                Shipping
                                                <span className="cart-sumr-label">Gratis</span>
                                            </li>
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                
                                                    <strong>Total amount</strong>
                                                    
                                                
                                                <span className="cart-sumr-label"><strong>${cartTotal}</strong></span>
                                            </li>
                                        </ul>
                                        <Link to="/checkout" className="btn btn-primary btn-lg btn-block">Proceed to checkout</Link>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </CartDiv>
    )
}

export default Cart