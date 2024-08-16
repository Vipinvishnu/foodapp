import React, { useContext } from 'react'
import './Cart.css'
import Header from '../../Components/Navbar/Navbar'
import { StoreContext } from '../../Context/StoreContext'
import { Navigate, useNavigate } from 'react-router-dom'




const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();
  return (

    <div >

      <Header></Header>
      <div className='cart'>
        <div className="cart-items">
          <div className="cart-items-title" >
            <p style={{textAlign:"left",fontWeight:"bold"}}>Items</p>
            <p style={{fontWeight:"bold"}}>Title</p>
            <p style={{fontWeight:"bold"}}>Price</p>
            <p style={{fontWeight:"bold"}}>Quantity</p>
            <p style={{fontWeight:"bold"}}>Total</p>
            <p style={{fontWeight:"bold"}}>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
  
                <div >
                  <div className='cart-items-title cart-items-item'>
                    <img src={url+"/images/"+item.image} alt="" />
                    <p style={{fontWeight:"400"}}>{item.name}</p>
                    <p style={{fontWeight:"400"}}>${item.price}</p>
                    <p style={{fontWeight:"400"}}>{cartItems[item._id]}</p>
                    <p style={{fontWeight:"400"}}>${item.price * cartItems[item._id]}</p>
                    <p onClick={()=>removeFromCart(item._id)} className='cross'style={{fontWeight:"400"}}>X</p>
                  </div>
                  <hr />
                </div>
  
              )
            }
  
          })}
  
        </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${getTotalCartAmount()===0?0:5}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+5}</b>
                </div>
                
              </div>
              <button onClick={()=>navigate('/order')}>Proceed To Checkout</button>
            </div>
            <div className="cart-promocode">
              <div>
                <p>If You Have A Promocode, Enter It Here</p>
                <div className='cart-promocode-input'>
                  <input type="text" placeholder='promocode' />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
      </div>

    </div>
  )
}

export default Cart