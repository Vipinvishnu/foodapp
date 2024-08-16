// import React from 'react'
// import './List.css'
// import AdminNavbar from '../../../Components/Admin Navbar/AdminNavbar'
// import Sidebar from '../../../Components/Admin Sidebar/Sidebar'

// const List = () => {
//   return (
//     <div>
//       <div>
//         <AdminNavbar></AdminNavbar>
//         <hr />
//         <div>
//           <Sidebar></Sidebar>
//           </div>
       
//       </div>
//       {/* --------------------------------------------------------- */}


      
//     </div>
//   )
// }

// export default List



import React, { useEffect, useState } from "react";
import "./List.css"; // Custom styles for additional control
import AdminNavbar from "../../../Components/Admin Navbar/AdminNavbar";
import Sidebar from "../../../Components/Admin Sidebar/Sidebar";
import toast from "react-hot-toast";
import { allFoodList, removeFoodApi } from "../../../Services/allApi";

const List = () => {
  const [list, setList] = useState([]);
  const url = "http://localhost:5002";

  const fetchlist = async () => {
    try {
      const response = await allFoodList();
      // console.log(response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data"); 
      }
    } catch (error) {
      console.error("Failed to fetch food list", error);
      toast.error("An error occurred");
    }
  };

    const removeFood=async(foodId)=>{
  // console.log(foodId);
  const response=await removeFoodApi({id:foodId})
  fetchlist();
  if(response.data.success){
    toast.success("Food Removed")
  }
  else{
    toast.error("Error")
  }
    }

  useEffect(() => {
    fetchlist();
  }, []);

  return (
    <div className="list-container  min-h-screen flex flex-col">
      <AdminNavbar />
      <hr />
      <div className="main flex flex-grow">
        <Sidebar />
        <div className="main-content ms-3 flex-grow me-3">
          <div className="list-header flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-700">All Food List</h1>
          </div>
          <div className="list-table-container overflow-y-auto max-h-[calc(100vh-200px)] bg-white shadow rounded p-4">
            <div className="table-header text-center hidden md:grid grid-cols-5 gap-4 py-2 border-b font-semibold text-gray-600">
              <span>Image</span>
              <span>Name</span>
              <span>Category</span>
              <span>Price</span>
              <span>Action</span>
            </div>
            {list.length > 0 ? (
              list.map((item, index) => (
                <div
                  key={index}
                  className="table-row text-center grid grid-cols-2 md:grid-cols-5 gap-4 py-2 border-b items-center text-gray-700"
                >
                  <div className="col-span-1 md:col-span-1 flex items-center justify-center">
                    <img
                      className="w-22 h-16 object-cover rounded border-2 border-current"
                      src={`${url}/images/${item.image}`}
                      alt={item.name}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500 md:hidden">{item.category}</p>
                  </div>
                  <p className="col-span-1 hidden md:block">{item.category}</p>
                  <p className="col-span-1">${item.price.toFixed(2)}</p>
                  <button className="col-span-1 btn btn-danger btn-sm" onClick={()=>removeFood(item._id)}>Delete</button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No items available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;