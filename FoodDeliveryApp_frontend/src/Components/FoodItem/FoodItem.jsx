import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";
import { StoreContext } from "../../Context/StoreContext";


export const FoodItem = ({ id, name, price, description, image }) => {
 
  const{cartItems,addToCart,removeFromCart,url}=useContext(StoreContext)
  
  return (
    <>

<Container xs={6} sm={6} md={4}  className="">
      <Row className="">
        <Col   className="mb-4 d-flex ">
          <Card className="shadow-sm" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={url+"/images/"+image} />
            {/* {itemCount === 0 && ( // Use && for conditional rendering
              <img src={assets.add_icon} alt="Add Icon" />
            )} */}
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <img src={assets.ratings} alt="" />
              <Card.Text>
                <p className="fw-bold">{description}</p>
               <div className="d-flex justify-content-between align-items-center">
                  <p className="fs-5 fw-bold"  >${price}</p>
                  {
                !cartItems[id]
                ?<p><img onClick={()=>addToCart(id)} className="bg-light shadow-lg" src={assets.add_green} alt="Add Icon" /></p>
                :<div className="food-item-counter d-flex align-items-center mt-1 my-2  ">
                  <img onClick={()=>removeFromCart(id)} src={assets.remove_food} alt="" />
                  <p className="mb-0  ms-2 me-2 fw-bold">{cartItems[id]}</p>
                  <img onClick={()=>addToCart(id)}  src={assets.add_green} alt="" />
                </div>
              }
  
               </div>
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
 </>
);
};