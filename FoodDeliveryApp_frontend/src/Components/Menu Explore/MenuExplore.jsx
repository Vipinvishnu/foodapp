import React from 'react'
import { menu_list } from '../../assets/assets'
import "./menuexplore.css"

const MenuExplore = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <div className=' mt-5 ms-5 me-5'>
                <h1>Explore Our Menu</h1>
                <p className='explore-menu-text' >Choose from a diverse menu featuring a delectable array of dishes .Our mission is to satisfy your cravings and elevate your dining experience,onedelicious meal at a time</p>
                <div className='explore-menu-list' >
                    {menu_list.map((item, index) => {
                        return (
                            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
                                <img className={category === item.menu_name ? "active" : ""} src={item.menu_image}
                                    style={{ cursor: 'pointer', width: "7.5vw", minWidth: "80px", transition: "0.2s", borderRadius: "50%" }} alt="" />
                                <p style={{ cursor: 'pointer', fontWeight: "500", marginTop: "20px", color: "#707070,", fontSize: "max(1.4vw,16px)" }}>
                                    {item.menu_name}
                                </p>
                            </div>
                        )
                    })}

                </div>

               
            </div>

        </div>
    )
}

export default MenuExplore