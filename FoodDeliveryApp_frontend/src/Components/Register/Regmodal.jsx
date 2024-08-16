import React, { useState } from 'react';
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap';
import { emailgenerateOtpApi, registerApi } from '../../Services/allApi';
import { useNavigate } from 'react-router-dom';
import "./Regmodal.css"
import toast from 'react-hot-toast';


const Regmodal = ({ show, handleClose }) => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        phone: '',
        password: ''
    });

    const navigate = useNavigate();

    const setInputs = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleProfile = async (e) => {
        e.preventDefault();

        const { username, email, phone, password } = userData;
        if (!username || !email || !phone || !password) {
            toast.error('Please fill all fields', { position: "top-center" });
            return;
        }

        console.log('Sending user data to API:', userData); // Log user data
        if (password.length < 6) {
            toast.error('Please enter a strong password with atleast 6 characters', { position: 'top-center' })
        }
        if (!email.includes('.')) {
            toast.error('Please enter a valid email', { position: "top-center" });

        }

        // try {
        //     const result = await registerApi(userData);
        //     if (result.status === 200) {
        //         toast.success(`${username}, Your Profile Registered Successfully`, { position: "top-right" });
        //         handleClose()
        //         await generateOtp(email); 
        //         setUserData({ username: '', email: '', phone: '', password: '' });
        //         navigate('/emailverification');
        //         sessionStorage.setItem("email", JSON.stringify(email));
        //         sessionStorage.setItem("phone", JSON.stringify(phone));
                
        //     }

        // } catch (error) {
        //     if(error.result.status===406){
        //         alert("User already exist")
        //     }
        //     console.error('Error response from API:', error.response);
        //     toast.error(error.response?.data?.message || 'An error occurred while Registering the profile. Please try again.', { position: 'top-center' });
        // }

        try {
            const result = await registerApi(userData);
            if (result.status === 200) {
              toast.success(`${username}, Your Profile Registered Successfully`, { position: "top-right" });
              handleClose();
              await generateOtp(email); 
              setUserData({ username: '', email: '', phone: '', password: '' });
              navigate('/emailverification');
              sessionStorage.setItem("email", JSON.stringify(email));
              sessionStorage.setItem("phone", JSON.stringify(phone));
            }
          } catch (error) {
            if (error.response) {
              // Check for specific status codes
              if (error.response.status === 406) {
                alert("User already exists");
              } else {
                toast.error(error.response.data?.message || 'An error occurred while registering the profile. Please try again.', { position: 'top-center' });
              }
              console.error('Error response from API:', error.response);
            } else {
              // Handle unexpected errors
              console.error('Error:', error.message);
              toast.error('An unexpected error occurred. Please try again later.', { position: 'top-center' });
            }
          }
          
    };

    const generateOtp = async (email) => {
        try {
          const result = await emailgenerateOtpApi({ email });
          if (result.status === 200) {
            toast.success('OTP Generated Successfully',{position:"top-center"});
          }
        } catch (error) {
          console.log(error);
        }
      };




    return (

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton style={{ backgroundColor: '#FE0C00' }}>
                <Modal.Title className='text-white'>REGISTER</Modal.Title>
            </Modal.Header>
            <div style={{ textAlign: 'center' }} className="p-3">
                <Form onSubmit={handleProfile}>
                    <Modal.Body>
                        <FloatingLabel controlId="username" label="Your Name"className="mb-3" >
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="username"
                                value={userData.username}
                                onChange={setInputs}
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="email" label="Email address" className="mb-3">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={userData.email}
                                onChange={setInputs}
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="phone" label="Phone Number" className="mb-3">
                            <Form.Control
                                type="number"
                                name="phone"
                                placeholder="phoneNumber"
                                value={userData.phone}
                                onChange={setInputs}
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="password" label="Password" className="mb-3">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={userData.password}
                                onChange={setInputs}
                            />
                        </FloatingLabel>

                        <Button
                            variant="primary"
                            type="submit"
                            style={{ background: '#FE0C00', border: 'none' }}
                           
                        >
                            Sign Up
                        </Button>

                        <div className='login-popup-condition'>
                            <input type="checkbox" required /> <p>By continuing, I agree to the terms of use & privacy policy</p>
                        </div>

                    </Modal.Body>
                </Form>
            </div>
        </Modal>
    );
};

export default Regmodal;


