import React from 'react'
import "./Appdownload.css"
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p> For Better Experience Download <br /> Our App</p>
        <div className="app-download-platforms">
            <img src={assets.playstore} alt="" />
            <img src={assets.appstore} alt="" />
        </div>

    </div>
  )
}

export default AppDownload