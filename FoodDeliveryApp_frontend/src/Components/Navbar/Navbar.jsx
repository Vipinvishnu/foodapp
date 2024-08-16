import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import { Container, Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import { assets } from '../../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';



const Header = () => {


  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('Existinguser');
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data from session storage', error);
      }
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem('Existinguser');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('phone');
    navigate('/');
  };

  const defaultImage = assets.profileicon

  const { getTotalCartAmount } = useContext(StoreContext)

  return (
    <div>
      <Navbar expand="lg">
        <Container fluid className='mt-1'>
          <Navbar.Brand as={NavLink} to={'/home'} className="ms-3">
            {/* <img src={assets.logo} alt="Logo" style={{ height: '75px' }} /> */}
            <h2>
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
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto ">
              <Nav.Link as={NavLink} to={'/home'} className="text-black me-5 ms-2 hover fw-bold ">Home</Nav.Link>
              <Nav.Link href="#explore-menu" className="text-black me-5 ms-2 hover fw-bold">Menu</Nav.Link>
              <Nav.Link href="#footer" className="text-black me-5 ms-2 hover fw-bold">Contact Us</Nav.Link>
              <Nav.Link as={NavLink} to={'/myorders'} className="text-black me-5 ms-2 hover fw-bold">Orders</Nav.Link>
              <div className='navcart '>

                <Nav.Link as={NavLink} to={'/cart'} className="me-5 hover1 ms-2 ">
                  <img src={assets.carticon} alt="" height="20px" width="20px" />
                </Nav.Link>


                <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
              </div>
              {userData ? (
                <Dropdown className="me-5 mt-1">
                  <Dropdown.Toggle variant="link" id="dropdown-basic" className="d-flex align-items-center text-decoration-none">
                    <Image
                      src={userData.image || defaultImage}
                      alt="User Avatar"
                      height="15px"
                      width="15px"
                      roundedCircle
                      className="me-3"
                    />

                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.Item>
                      <Image
                        src={userData.image || defaultImage} alt="User Avatar" height="15px" width="15px" roundedCircle className="mx-auto mt-2 mb-1" />
                    </Dropdown.Item>
                    <Dropdown.Item> {userData.username} </Dropdown.Item>
                    <Dropdown.Item >{userData.email}</Dropdown.Item>
                    <Dropdown.Item >{userData.phone}</Dropdown.Item>
                    <Dropdown.Item onClick={logout} style={{ color: "#FE0C00" }}><i class="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header