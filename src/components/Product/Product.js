import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    const {img,name,seller,price,stock,key} = props.product;
   
    return (
        <div className="product">
            <div>
                <img src={img} alt="" srcset="" />
            </div>
            <div>
                <h1 className="product-name"><Link to={"/product/"+key}>{name}</Link></h1>
                <br />
                <p>BY:{seller}</p>
                <p>${price}</p>
                <p>Only{stock}left in stock-Order soon</p>
                {props.showAddToCart === true &&<button 
                    className="main-btn" 
                    onClick={()=>props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart}/>add to cart</button>}

            </div>
        </div>
    );
};

export default Product;