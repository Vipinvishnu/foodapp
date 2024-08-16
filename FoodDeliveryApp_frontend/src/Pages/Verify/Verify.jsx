import React, { useContext, useEffect } from "react";
import "./Verify.css";
import Header from "../../Components/Navbar/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const paymentVerification = async () => {
        try {
            const response = await axios.post(url + "/order/verify", { success, orderId });

            console.log("Full Response:", response);

            console.log("Response Data:", response.data);

            if (response.data.success) {
                navigate('/myOrders');
            }
            else {
                navigate('/home');
            }
        } catch (error) {
            console.error("Payment verification failed:", error);
        }
    };

    useEffect(() => {
        paymentVerification();
    }, []); // Empty array to run once on mount

    return (
        <div>
            <Header />
            <div className="verify">
                <div className="spinner"></div>
            </div>
        </div>
    );
};

export default Verify;