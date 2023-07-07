import React, { useState, useEffect } from "react";
import { CheckoutDiv } from "./style";
import axios from "axios";
import { Link } from "react-router-dom";
import { decode as base64_decode, encode as base64_encode } from 'base-64';

const Checkout = ({ cart, emptyCartCallback }) => {

    const [products, setProducts] = useState(null)
    let consumer_key = 'ck_05103e9fc9c96c9d2855862f2f07b27e21d07126';
    let consumer_secret = 'cs_126d6787aa440ee462e1419a81c4a9dffc16a052';
    let url = 'https://yourcloudnetwork.net/projects/training/wp-json/wc/v3/products?consumer_key=' + consumer_key + '&consumer_secret=' + consumer_secret;

    let productListArr = Object.keys(cart);
    let index = productListArr.indexOf('cart');
    if (index > -1) { // only splice array when item is found
        productListArr.splice(index, 1); // 2nd parameter means remove one item only
    }

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [errors, setErrors] = useState({});
    const [countrylist, setCountrylist] = useState(["Choose...", "United States of America", "India"])
    const [cartTotal, setCartTotal] = useState(0)
    const [loader, setLoader] = useState(false)

    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    useEffect(
        () => {
            if (productListArr.length > 0) {
                for (let i = 0; i < productListArr.length; i++) {
                    url = url + '&include[]=' + productListArr[i]
                }
                axios.get(url)
                    .then(function (d) {
                        let data = d.data
                        let sum = 0
                        setProducts(data)
                        {
                            data.map((dt, i) => {
                                sum = sum + (parseFloat(dt.price) * cart[dt.id])
                            })
                        }
                        setCartTotal(sum)

                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .finally(function () {

                    });
            }
        },
        []
    )
    function submitForm() {
        let el = { fname: fname, lname: lname, email: email, address: address, country: country, state: state, city: city, zipcode: zipcode }
        let count = 0;
        setLoader(true);
        const tifOptions = Object.keys(el).map(key => {

            let m = {};
            let msg = '';
            switch (key) {
                case 'fname':
                    if (el[key].length < 5) {
                        msg = 'Full Name must be at least 5 characters long!'
                        count = parseInt(count) + 1
                    }
                    m = { "fname": msg };
                    setErrors(errors => ({
                        ...errors,
                        ...m
                    }));
                    break;
                case 'lname':
                    if (el[key].length < 1) {
                        msg = 'Last Name should not be empty!'
                        count = parseInt(count) + 1
                    }
                    m = { "lname": msg };
                    setErrors(errors => ({
                        ...errors,
                        ...m
                    }));
                    break;
                case 'email':
                    if (!validEmailRegex.test(el[key])) {
                        msg = 'Email is not valid!';
                        count = parseInt(count) + 1
                    }
                    m = { "email": msg };
                    setErrors(errors => ({
                        ...errors,
                        ...m
                    }));
                    break;
                case 'address':
                    if (el[key].length < 1) {
                        msg = 'Address should not be empty!'
                        count = parseInt(count) + 1
                    }
                    m = { "address": msg };
                    setErrors(errors => ({
                        ...errors,
                        ...m
                    }));
                    break;
                case 'country':
                    if (el[key].length < 1) {
                        msg = 'Country should not be empty!'
                        count = parseInt(count) + 1
                    }
                    m = { "country": msg };
                    setErrors(errors => ({
                        ...errors,
                        ...m
                    }));
                    break;
                case 'state':
                    if (el[key].length < 1) {
                        msg = 'State should not be empty!'
                        count = parseInt(count) + 1
                    }
                    m = { "state": msg };
                    setErrors(errors => ({
                        ...errors,
                        ...m
                    }));
                    break;
                case 'city':
                    if (el[key].length < 1) {
                        msg = 'City should not be empty!'
                        count = parseInt(count) + 1
                    }
                    m = { "city": msg };
                    setErrors(errors => ({
                        ...errors,
                        ...m
                    }));
                    break;
                case 'zipcode':
                    if (el[key].length < 1) {
                        msg = 'Zipcode should not be empty!'
                        count = parseInt(count) + 1
                    }
                    m = { "zipcode": msg };

                    setErrors(errors => ({
                        ...errors,
                        ...m
                    }));
                    break;
                default:
                    break;
            }

        }

        )
        if (count == 0) {
            let checkoutouturl = 'https://yourcloudnetwork.net/projects/training/wp-json/wc/v3/orders'
            let finalCart = []


            for (let i = 0; i < productListArr.length; i++) {
                let m = { product_id: productListArr[i], quantity: cart[productListArr[i]] };
                finalCart.push(m)
            }

            const data = {
                payment_method: "cod",
                payment_method_title: "Cash on Delivery",
                set_paid: false,
                billing: {
                    first_name: fname,
                    last_name: lname,
                    address_1: address,
                    address_2: "",
                    city: city,
                    state: state,
                    postcode: zipcode,
                    country: country,
                    email: email,
                },
                shipping: {
                    first_name: fname,
                    last_name: lname,
                    address_1: address,
                    address_2: "",
                    city: city,
                    state: state,
                    postcode: zipcode,
                    country: country,
                    email: email,
                },
                line_items: finalCart
            };

            axios.post(checkoutouturl, data, {
                headers: {
                    'Authorization': 'Basic ' + base64_encode(consumer_key + ':' + consumer_secret),
                }
            })
                .then(function (response) {
                    let m = { "success": 'Order has been placed successfully<br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s' };
                    setErrors(errors => ({
                        ...errors,
                        ...m
                    }));
                    emptyCartCallback();
                    setLoader(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    if (errors.success) return (
        <CheckoutDiv>
            <div className="container" style={{ minHeight: '500px' }}>
                <div className="py-5 text-center">
                    <h2>Checkout form</h2>
                </div>
                <div className="row">
                    <div className="col-md-12 order-md-1">
                        <h4 className="success-msg"><div
                            dangerouslySetInnerHTML={{ __html: errors.success }}
                        /></h4>
                    </div>
                </div>
            </div>
        </CheckoutDiv>
    )

    return (
        <CheckoutDiv>
            {loader ? (
                <div className="preloader">

                    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-ripple" style={{ background: '0 0' }}><circle cx="50" cy="50" r="4.719" fill="none" stroke="#1d3f72" stroke-width="2"><animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="3" keySplines="0 0.2 0.8 1" begin="-1.5s" repeatCount="indefinite" /><animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="3" keySplines="0.2 0 0.8 1" begin="-1.5s" repeatCount="indefinite" /></circle><circle cx="50" cy="50" r="27.591" fill="none" stroke="#5699d2" stroke-width="2"><animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="3" keySplines="0 0.2 0.8 1" begin="0s" repeatCount="indefinite" /><animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="3" keySplines="0.2 0 0.8 1" begin="0s" repeatCount="indefinite" /></circle></svg>

                </div>
            ) : null}

            <div className="py-5 text-center">
                <h2>Checkout form</h2>
            </div>
            <div className="row">

                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Billing address</h4>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label >First name</label>
                            <input type="text" className="form-control" id="firstName" placeholder="" value={fname} onChange={({ target: { value } }) => { setFname(value) }} />
                            <div className="invalid-feedback text-muted">
                                {errors.fname}
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label >Last name</label>
                            <input type="text" className="form-control" id="lastName" placeholder="" value={lname} onChange={({ target: { value } }) => { setLname(value) }} />
                            <div className="invalid-feedback text-muted">
                                {errors.lname}
                            </div>
                        </div>
                    </div>
                    <hr className="mb-4" />

                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label >Email </label>
                            <input type="email" className="form-control" id="email" placeholder="you@example.com" value={email} onChange={({ target: { value } }) => { setEmail(value) }} />
                            <div className="invalid-feedback text-muted">
                                {errors.email}
                            </div>
                        </div>
                    </div>
                    <hr className="mb-4" />
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label>Address</label>
                            <input type="text" className="form-control" id="address" placeholder="1234 Main St" value={address} onChange={({ target: { value } }) => { setAddress(value) }} />
                            <div className="invalid-feedback text-muted">
                                {errors.address}
                            </div>
                        </div>
                    </div>
                    <hr className="mb-4" />
                    <div className="row">
                        <div className="col-md-5 mb-3">
                            <label>Country {country}</label>
                            < select
                                onChange={({ target: { value } }) => { setCountry(value) }}
                                className="custom-select d-block w-100 form-control" id="country">
                                {
                                    countrylist.map((ctry, i) => <option key={i} value={ctry}>{ctry}
                                    </option>)
                                }
                            </select >
                            <div className="invalid-feedback text-muted">
                                {errors.country}
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label >State</label>
                            <input type="text" className="form-control" id="state" placeholder="" value={state} onChange={({ target: { value } }) => { setState(value) }} />
                            <div className="invalid-feedback text-muted">
                                {errors.state}
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label>City</label>
                            <input type="text" className="form-control" id="city" placeholder="" value={city} onChange={({ target: { value } }) => { setCity(value) }} />
                            <div className="invalid-feedback text-muted">
                                {errors.city}
                            </div>
                        </div>

                        <div className="col-md-3 mb-3" style={{ paddingTop: '25px' }}>
                            <label>Zip</label>
                            <input type="text" className="form-control" id="zip" placeholder="" value={zipcode} onChange={({ target: { value } }) => { setZipcode(value) }} />
                            <div className="invalid-feedback text-muted">
                                {errors.zipcode}
                            </div>
                        </div>
                    </div>



                    <hr className="mb-4" />
                    <h4 className="mb-3">Payment</h4>

                    <div className="d-block my-3">
                        <div className="custom-control custom-radio">
                            <label className="custom-control-label" >Cash on Delivery</label>
                        </div>

                    </div>
                    <hr className="mb-4" />
                    <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={() => { submitForm() }}>Place Order</button>

                </div>
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Your cart</span>
                        <span className="badge badge-secondary badge-pill" style={{ marginLeft: '10px' }}>{cart.cart}</span>
                    </h4>
                    <ul className="list-group mb-3">
                        {products != null ? (
                            <>
                                {products.map((dt, i) => {
                                    const img = dt.images.length > 0 ? dt.images[0].src : '';
                                    const regex = /(<([^>]+)>)/ig;
                                    const desc = dt.short_description.replace(regex, '');
                                    return (
                                        <li key={dt.slug} className="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 className="my-0">{dt.name} ({cart[dt.id]})</h6>
                                                <small className="text-muted">{desc}</small>
                                            </div>
                                            <span className="text-muted checkout-pr-label">${dt.price}</span>
                                        </li>
                                    )
                                })}
                            </>
                        ) : (
                            <li className="list-group-item d-flex justify-content-between lh-condensed">Loading...</li>
                        )}




                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong style={{ float: 'right' }}>${cartTotal}</strong>
                        </li>
                    </ul>
                </div>
            </div>
        </CheckoutDiv>
    )
}
export default Checkout
