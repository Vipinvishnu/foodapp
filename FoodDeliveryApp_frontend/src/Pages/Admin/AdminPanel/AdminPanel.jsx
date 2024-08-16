import React from 'react'
import AdminNavbar from '../../../Components/Admin Navbar/AdminNavbar'
import Sidebar from '../../../Components/Admin Sidebar/Sidebar'



const AdminPanel = () => {
  return (
    <div>
      <AdminNavbar></AdminNavbar>
      <hr />
      <div className='app-content'>
        <Sidebar></Sidebar>
      </div>
    </div>
  )
}

export default AdminPanel