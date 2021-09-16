import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';


const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);
    const history = useHistory()

    const handleProceedCheckout = () =>{
         history.push('/shipment')
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
    }
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        //card
        const saveCard = getDatabaseCart();
        const productKeys = Object.keys(saveCard)
        const cartProducts = productKeys.map(key => {
              const product = fakeData.find(pd => pd.key === key);
              product.quantity = saveCard[key];
              return product;
        });
        setCart(cartProducts);
    }, []);

    let thankyou ;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt="" />
    }
    return (
        <div className="twin-container">
            
            <div className="product-container">
               { 
                    cart.map(pd => <ReviewItem 
                        key={pd.key}
                        removeProduct={removeProduct}
                        product={pd}></ReviewItem>)
                       
               }
                {thankyou }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button  onClick={handleProceedCheckout}className="main-button">Place Checkout</button>
                </Cart>
            </div>

        </div>
    );
};

export default Review;