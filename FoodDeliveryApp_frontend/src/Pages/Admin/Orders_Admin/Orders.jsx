import React, { useContext, useEffect, useState } from 'react'
import './Orders.css'
import AdminNavbar from '../../../Components/Admin Navbar/AdminNavbar'
import Sidebar from '../../../Components/Admin Sidebar/Sidebar'
import axios from 'axios'
import toast from 'react-hot-toast'
import { StoreContext } from '../../../Context/StoreContext'
import { assets } from '../../../assets/assets'



const Orders = () => {

  const [orderData, setOrderData] = useState([]);
  const { url } = useContext(StoreContext);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/order/userorderslist")
    if (response.data.success) {
      setOrderData(response.data.data)
      console.log(response.data.data)
    }
    else {
      toast.error("ERROR")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/order/orderstatus", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])
  return (
    <div className="orders-container">
      <AdminNavbar />
      <hr />
      <div className="main">
        <Sidebar />
        <div className="main-content">

          <div className='order add'>
            <h3>Order Page</h3>
            <div className='order-list'>
              {orderData.map((order, index) => (
                <div key={index} className="border border-gray-300 rounded-lg bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <img src={assets.parcel_icon} alt="" className="w-12 h-12 mr-4" />
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {order.items.map((item, index) => (
                          index === order.items.length - 1 ? item.name + " X " + item.quantity : item.name + " X " + item.quantity + ", "
                        ))}
                      </p>
                      <p className='order-item-name'>
                        {order.address.firstName + " " + order.address.lastName}
                      </p>
                      <div className='order-item-address'>
                        <p>{order.address.street + ","}</p>
                        <p> {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                      </div>
                      <p className='order-item-phone'>{order.address.phone}</p>
                      <p>Items: {order.items.length}</p>
                      <p>${order.amount}</p>
                      <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                        <option value="Food Processing">Food Processing</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>







        </div>
      </div>
    </div>
  )
}

export default Orders