import React,{useState,useEffect} from "react";
import { ProductDiv, ProductCard } from "./elements";
import ProductSearch from "../productSearch";
import axios from "axios";
const ProductListing = ({cartcallback}) => {
    const [products,setProducts]=useState(null)
    let consumer_key='ck_05103e9fc9c96c9d2855862f2f07b27e21d07126';
    let consumer_secret='cs_126d6787aa440ee462e1419a81c4a9dffc16a052';
    let url='https://yourcloudnetwork.net/projects/training/wp-json/wc/v3/products?consumer_key='+consumer_key+'&consumer_secret='+consumer_secret;
    
    function cartClick(productID)
    {
        cartcallback(productID);
        //console.log(productID);
    }
    
    useEffect(
        ()=>{
            
            axios.get(url)
                .then(function (d) {
                    setProducts(d.data)
                    
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                   
                });

            
        },
        []
    )

    const callbackSearch = (s) =>{
        setProducts(s);
    }
    

    if(!products) return ( 
        <ProductDiv>
            <div className="container">
            <div className="row">
            <div className="col-12 col-sm-8 col-md-6 col-lg-12">
                <h2>Loading...</h2>
                </div>
            </div>
            </div>
        </ProductDiv>
     )
    return (
        
        <ProductDiv>
           
            <div className="container">
            <ProductSearch callbackSearch={callbackSearch}/>
                <div className="row">
                    <div className="col-md-12">

                    
                {products.map((dt,i)=>{
                    const img=dt.images.length>0?dt.images[0].src:'';
                    const regex = /(<([^>]+)>)/ig;
                    const desc = dt.short_description.replace(regex, '');
                    return (
                        <div className="col-12 col-sm-8 col-md-6 col-lg-4" key={dt.slug}>
                        <ProductCard>
                            <div className="card">
                                <img className="card-img" src={img} alt={dt.slug} />
                                
                                <div className="card-body">
                                    <h4 className="card-title">{dt.id} {dt.name}</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">Style: VA{dt.sku}</h6>
                                    <p className="card-text">{desc}</p>

                                    <div className="buy d-flex justify-content-between align-items-center">
                                        <div className="price text-success"><h5 className="mt-4">${dt.price}</h5></div>
                                        <button className="btn btn-danger mt-3" onClick={() => { cartClick(dt.id) }}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </ProductCard>
                    </div>
                    )
                })}
                    
                    


                    </div>
                </div>
            </div>

        </ProductDiv>
    )
}

export default ProductListing