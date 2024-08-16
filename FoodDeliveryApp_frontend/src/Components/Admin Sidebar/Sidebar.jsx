import React from 'react'
import './Sidebar.css'
import { adminAssets } from '../../assets/adminAssets'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
    return (

        <div className='sidebar'>
            <div className='sidebar-options'>

                <NavLink to='/admin/add' className='sidebar-option'>
                    <img src={adminAssets.add_icon} alt="" />
                    <p>Add Items</p>
                </NavLink>

                <NavLink to='/admin/list' className='sidebar-option'>
                    <img src={adminAssets.order_icon} alt="" />
                    <p>List Items</p>
                </NavLink>

                <NavLink to='/admin/orders' className='sidebar-option'>
                    <img src={adminAssets.order_icon} alt="" />
                    <p>Orders</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar
