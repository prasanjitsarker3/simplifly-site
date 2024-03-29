import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    // const totalPrice  = cart.reduce((total,prd) => total + prd.price, 0); 
    let total =0;
    for (let i = 0; i< cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
        
    }
    let shipping = 0;
    if(total >35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(shipping > 0){
        shipping = 12.99
    }
    const tax =(total / 10).toFixed(2);
    const grandTotal =(total + shipping + Number(tax)).toFixed(2); 

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision)
    }
     
    return (
        <div>
            <h3>Oder Summary</h3>
             <h4>Items Ordered:{cart.length}</h4>
             <p>Product Price: {formatNumber(total)}</p>
             <p><small>Shipping Cost:{shipping}</small></p>
              <p>Tax + Vat: {tax}</p>
             <p>Total Price:{grandTotal}</p>
             <br />
             {
                 props.children
             }
        </div>
    );
};

export default Cart;