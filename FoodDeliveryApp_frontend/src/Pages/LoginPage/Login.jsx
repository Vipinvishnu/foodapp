import React, { useContext, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { assets } from '../../assets/assets';
import "./Login.css";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Regmodal from '../../Components/Register/Regmodal';
import { loginApi, googleLoginApi } from '../../Services/allApi';
import toast from 'react-hot-toast';
import { StoreContext } from '../../Context/StoreContext';




const Login = () => {
  const {url,setToken}=useContext(StoreContext)
  const [showModal, setShowModal] = useState(false);
  const [userlogin, setUserlogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const setInputs = (e) => {
    const { name, value } = e.target;
    setUserlogin({ ...userlogin, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userlogin;
    if (!email || !password) {
      toast.error("Please fill all fields", { position: "top-right" });
      return;
    }

    try {
      const result = await loginApi(userlogin);
      if (result.status == 200) {
        setToken(result.data.token)
        localStorage.setItem("token", result.data.token)
      }
      console.log("API response:", result);

      if (result.status === 200) {
        sessionStorage.setItem("Existinguser", JSON.stringify(result.data.user));
        sessionStorage.setItem("token", result.data.token);
        const token = result.data.token;
        const username = result.data.user.username || "User";

        toast.success(`${username}, you have logged in successfully`, { position: 'top-center' });
        setUserlogin({ email: "", password: "" });
        navigate("/admin/add");
      } else {
        toast.error(result.response.data, { position: 'top-right' });
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const handleGoogleLogin = async (response) => {
    if (response.error) {
      console.error("Google Login Error:", response.error);
      alert("An error occurred during Google Login. Please try again.");
      return;
    }

    try {
      const googleToken = response.code; // Assuming response from Google contains a 'code'
      const result = await googleLoginApi(googleToken); // Send the token to your backend API

      console.log("Google Login API response:", result);

      if (result.status === 200) { // Handle successful Google login response
        sessionStorage.setItem("Existinguser", JSON.stringify(result.data.user));
        sessionStorage.setItem("token", result.data.token);
        const username = result.data.user.username || "User";

        toast.success(`${username}, you have logged in successfully with Google`, { position: 'top-center' });
        navigate("/home"); // Redirect to home page after successful login
      } else {
        alert(result.response.data); // Handle potential errors from backend
      }
    } catch (error) {
      console.error("Error during Google Login backend:", error);
      toast.error("An error occurred during Google Login. Please try again.", { position: 'top-right' });
    }
  };


  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
    <div>

      <div className='logo-container'>
        {/* <img src={assets.logo} className='logo' alt="" /> */}
        <h2 className='mt-3'>
              <div className="d-flex justify-content-center gap-1">
                <i
                  class="fa-solid fa-burger fa-xs fs-1 mt-3"
                  style={{ color: "#FE0C00" }}
                ></i>
                <div>
                <span style={{ color: "#FE0C00" }}> <b>B</b>ite</span><span className="text-gray-700 " style={{fontWeight:'500'}}>Box</span>
                </div>
              </div>
            </h2>
      </div>
      <div className='maindiv'>
        <Container className='maincontainer'>
          <Row>
            <Col lg={6} >
              <div >
                <h1 className="fw-bold ms-3 heading">Sign in to</h1>
                <h3 className="ms-3">Lorem ipsum is simply</h3>
                <p className="mt-3 ms-3 fs-5">
                  If you don't have an account, you can{' '}
                  <button
                    onClick={handleModalShow}
                    style={{
                      textDecoration: 'none',
                      color: '#FE0C00',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                    }}
                  >
                    register here!
                  </button>
                </p>
                <div className='content-right'>
                  <img src={assets.foodreg} alt="" />
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className='shadow-lg text-center p-3 mt-5 logindiv'>
                <FloatingLabel controlId="floatingInputEmail" label="Email address" className="mb-3 mt-5 ms-5 me-5">
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={userlogin.email}
                    onChange={(e) => setInputs(e)}
                    name='email'

                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className='mb-3 ms-5 me-5'>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={userlogin.password}
                    onChange={(e) => setInputs(e)}
                    name='password'
                  />
                </FloatingLabel>
                <div className='text-center'>
                  <Button className='logbtn mb-3' style={{ background: '#FE0C00', border: 'none' }} onClick={handleLogin}>
                    Login
                  </Button>
                </div>
                <p className='text-center mt-3 mx-auto'>or continue with</p>

                <div className="d-flex justify-content-center">
                  <GoogleLogin
                    clientId="903446393348-qc31vvbaqdmkoncujocvo72qhurupeos.apps.googleusercontent.com" // Replace with your actual client ID
                    onSuccess={handleGoogleLogin}
                    onError={console.error} // Handle potential errors during Google Login flow
                  />
                </div>

              </div>
            </Col>
          </Row>
        </Container>
        <Regmodal show={showModal} handleClose={handleModalClose} />
      </div>
    </div>
  );
};

export default Login;
