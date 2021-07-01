import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    console.log(props);
    const {img,name,seller,price,stock} = props.product;
   
    return (
        <div className="product">
            <div>
                <img src={img} alt="" srcset="" />
            </div>
            <div>
                <h1 className="product-name">{name}</h1>
                <br />
                <p>BY:{seller}</p>
                <p>${price}</p>
                <p>Only{stock}left in stock-Order soon</p>
                <button className="main-btn" onClick={()=>props.handleAddProduct(props.product)}>
                    
                    
                    <FontAwesomeIcon icon={faShoppingCart}/>add to cart</button>

            </div>
        </div>
    );
};

export default Product;