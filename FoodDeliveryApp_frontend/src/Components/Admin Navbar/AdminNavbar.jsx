import React, { useEffect, useState } from "react";
import "./AdminNavbar.css";
import { adminAssets } from "../../assets/adminAssets";
import { useNavigate } from "react-router-dom";
import { Dropdown, Image } from "react-bootstrap";
import { assets } from "../../assets/assets";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("Existinguser");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data from session storage", error);
      }
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("Existinguser");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    navigate("/");
  };

  const defaultImage = assets.profileicon;

  return (
    <div
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "7px",
      }}
    >
      {/* <img className="logo" src={adminAssets.logo} alt="" /> */}
      {/* <img className='profile' src={adminAssets.profile_image} alt="" /> */}
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
      {userData ? (
        <Dropdown className="me-5 mt-1">
          <Dropdown.Toggle
            variant="link"
            id="dropdown-basic"
            className="d-flex align-items-center text-decoration-none"
          >
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
                src={userData.image || defaultImage}
                alt="User Avatar"
                height="15px"
                width="15px"
                roundedCircle
                className="mx-auto mt-2 mb-1"
              />
            </Dropdown.Item>
            <Dropdown.Item> {userData.username} </Dropdown.Item>
            <Dropdown.Item>{userData.email}</Dropdown.Item>
            <Dropdown.Item>{userData.phone}</Dropdown.Item>
            <Dropdown.Item onClick={logout} style={{ color: "#FE0C00" }}>
              <i class="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : null}
    </div>
  );
};

export default AdminNavbar;