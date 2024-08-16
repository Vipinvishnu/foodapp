import './App.css';
import { Navigate, Route, Router, Routes, useNavigate } from 'react-router-dom';
import Login from './Pages/LoginPage/Login';
import Home from './Pages/Home/Home';
import EmailVerification from './Pages/EmailVerification/EmailVerification';
import PhoneVerification from './Pages/PhoneVerification/PhoneVerification';
import Cart from './Pages/Cart/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import AdminPanel from './Pages/Admin/AdminPanel/AdminPanel';
import Add from './Pages/Admin/Add_Admin/Add';
import List from './Pages/Admin/List_Admin/List';
import Orders from './Pages/Admin/Orders_Admin/Orders';
import { useEffect } from 'react';
import MyOrders from './Pages/MyOrders/MyOrders';
import Verify from './Pages/Verify/Verify';

const ProtectedRoute = ({ element, roles }) => {
  const user = JSON.parse(sessionStorage.getItem("Existinguser"));

  if (!user) {
    return <Navigate to="/" />;
  }

  if (roles && !roles.includes(user.role)) {
    if (user.role == "user") {
      return <Navigate to="/home" />;
    }

  }

  return element;
};
function App() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const user = JSON.parse(sessionStorage.getItem("Existinguser"));
  //   if (user) {
  //     if (user.role === "admin") {
  //       navigate("/admin");
  //     }
  //     else {
  //       navigate("/home");
  //     }
  //   }
  // }, []);

  return (
    <div className="App">
      

      <Routes>

        <Route path='/' element={<Login></Login>} />
        <Route path='/home' element={<Home></Home>} />
        <Route path='/emailverification' element={<EmailVerification></EmailVerification>} />
        <Route path='/phoneverification' element={<PhoneVerification></PhoneVerification>} />
        <Route path='/cart' element={<Cart></Cart>} />
        <Route path='/order' element={<PlaceOrder></PlaceOrder>} />
        <Route path='/verify' element={<Verify></Verify>}/>
        <Route path='/myorders' element={<MyOrders></MyOrders>} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} roles={["admin"]} />} />
        <Route path="/admin/add" element={<ProtectedRoute element={<Add  />} roles={["admin"]} />} />
        <Route path="/admin/list" element={<ProtectedRoute element={<List />} roles={["admin"]} />} />
        <Route path="/admin/orders" element={<ProtectedRoute element={<Orders />} roles={["admin"]} />} />
      </Routes>





    </div >
  );
}

export default App;


