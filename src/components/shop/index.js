import React from "react";
import ProductListing from "../productListing";

const Shop = ({cartcallback}) =>{
    return (
        <>
        <ProductListing cartcallback={cartcallback} />
        </>
    )
}

export default Shop