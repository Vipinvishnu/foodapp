import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Components/Navbar/Navbar'

import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    // const name=event.target.name
    // const value=event.target.value;
    const { name, value } = event.target
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo);
      }
    })
    // console.log(orderItems);
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,

    }
    let response = await axios.post(url + "/order/placeOrder", orderData, { headers: { token } })
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url)

    }
    else {
      alert("Error")
    }
  }

  // useEffect(()=>{
  // console.log(data);

  // },[data])

  return (
    <div className='order'>
      <Header />
      <div className='grid md:grid-cols-2 gap-10 ml-8 mr-8 mt-4'>
        <div className="border-gray-900/10 pb-12">
          <h3 className='mt-3 text-center'>Delivery Information</h3>
          <form onSubmit={placeOrder}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input required
                    id="first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    className="p-2 block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={onChangeHandler}
                    value={data.firstName}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input required
                    id="last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    className="p-2 block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-4 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={onChangeHandler}
                    value={data.lastName}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input required
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="p-2 block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={onChangeHandler}
                    value={data.email}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={onChangeHandler}
                    value={data.country}
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                  Street address
                </label>
                <div className="mt-2">
                  <input required
                    id="street-address"
                    name="street"
                    type="text"
                    autoComplete="street-address"
                    className="p-2 block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={onChangeHandler}
                    value={data.street}
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  City
                </label>
                <div className="mt-2">
                  <input required
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    className="p-2 block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={onChangeHandler}
                    value={data.city}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                  State / Province
                </label>
                <div className="mt-2">
                  <input required
                    id="region"
                    name="state"
                    type="text"
                    autoComplete="address-level1"
                    className="p-2 block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={onChangeHandler}
                    value={data.state}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input required
                    id="postal-code"
                    name="zipcode"
                    type="text"
                    autoComplete="postal-code"
                    className="p-2 w-full rounded-md border-2 focus:outline-none py-1.5 text-gray-900 shadow-sm"
                    onChange={onChangeHandler}
                    value={data.zipcode}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="Phone" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone
                </label>
                <div className="mt-2">
                  <input required
                    id="Phone"
                    name="phone"
                    type="Phone"
                    autoComplete="Phone"
                    className="p-2 block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={onChangeHandler}
                    value={data.phone}
                  />
                </div>
              </div>
            </div>
            <button type='submit' className='mt-4 p-2 bg-red-600 text-white rounded w-full sm:w-auto'>Proceed To Payment</button>
          </form>
        </div>

        <div className='order-right'>
          <div className="cart-total ms-5 me-5">
            <h3 className='text-center'>Cart Total</h3>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default PlaceOrder