import React,{useState} from "react";
import { ProductSearchDiv } from "./elements";
import axios from "axios";
const ProductSearch = ({callbackSearch}) => {
    const [search,setSearch]=useState("");
    function handleSearch(event)
    {
        setSearch(event.target.value);
        let consumer_key='ck_05103e9fc9c96c9d2855862f2f07b27e21d07126';
        let consumer_secret='cs_126d6787aa440ee462e1419a81c4a9dffc16a052';
        let url='https://yourcloudnetwork.net/projects/training/wp-json/wc/v3/products?consumer_key='+consumer_key+'&consumer_secret='+consumer_secret+'&search='+search;
        axios.get(url)
                .then(function (d) {
                    callbackSearch(d.data)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                   
                });
    }
    return (
        <ProductSearchDiv>
            <div className="row justify-content-center h-100 d-flex align-items-center justify-content-center">
                <div className="col-12 col-md-10 col-lg-12">

                    <div className="card-body row no-gutters align-items-center">
                        <input className="form-control form-control-lg form-control-borderless" type="search" placeholder="Search topics or keywords" onChange={handleSearch}/>


                    </div>

                </div>
            </div>
        </ProductSearchDiv>
    )
}

export default ProductSearch