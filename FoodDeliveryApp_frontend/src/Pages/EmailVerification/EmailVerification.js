// import React, { useState } from 'react'
// import { Container } from "react-bootstrap";
// import { assets } from "../../assets/assets";
// import "./EmailVerification.css"
// import {  emailgenerateOtpApi, emailVerificationOtpApi, phonegenerateOtpApi } from '../../Services/allApi';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';





// const EmailVerification = () => {

//     const [otp, setOtp] = useState("");
//     const navigate = useNavigate();
//     const [userEmail] = useState(() =>
//       JSON.parse(sessionStorage.getItem("email"))
//     );
//     console.log(userEmail);
//     const[otpGenerated,setOtpGenerated]=useState(false);
//     const handleOtpSubmit = async (e) => {  
//      e.preventDefault();

//     // Check if OTP is valid
//     if (otp.length !== 6) {
//       return toast.error("Invalid OTP. OTP should be 6 digits long.",{position:"top-right"});
//     }
//     try {
//       const userData = {
//         email: userEmail,
//         otp,
//       };
//       const result = await emailVerificationOtpApi(userData);

//       if (result.status === 200) {
//         toast.success("Email Verification Successful",{position:"top-center"});
//         sessionStorage.getItem("phone", JSON.stringify(phone))
//         await generateOtp(phone);
//         navigate("/phoneVerification");
//         ;
//       } else {
//         console.log(result);
//         toast.error("Verification Failed! Try Again",{position:"top-right"});
//       }
//     } catch (error) {
//       console.error("Error during verification:", error);
//       toast.error("An error occurred during verification. Please try again later.",{position:"top-right"});
//     }
//   };


//   const handleEmail = async () => {
//     if (!userEmail) {
//       toast.error("User email is not available.",{position:"top-right"});
//       toast.error("YOU NEED TO REGISTER FIRST",{position:"top-right"})
//      navigate("/")
//       return;
//     }

    
//     if (otpGenerated) {
//       toast.error("OTP has already been generated.",{position:"top-right"});
//       return;

//     }
     

//     try {
//       const result = await emailgenerateOtpApi({email:userEmail});
      
//       if (result.status === 200) {
//         toast.success( "OTP Successfully Generated",{position:"top-center"});
//         setOtpGenerated(true);
//       }
//     } catch (err) {
//       console.error("OTP generation failed", err);
//       toast.error("An error occurred during OTP generation. Please try again later.",{position:"top-right"});
// }
// };



// const generateOtp = async (phone) => {
//   try {
//     const result = await phonegenerateOtpApi({ phone });
//     if (result.status === 200) {
//       toast.success('OTP Generated Successfully',{position:"top-center"});
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };




//     return (
//         <div>

//             <>
//                 <Container>
//                     <div className="p-5 m-5 text-center">
//                         {" "}
//                         <img src={assets.foodreg} height={300} alt="" />
//                         <h2 className="mb-2 emq">Verify Your Email Address</h2>
//                         <p className="emv">
//                             We have sent a verification link to your email. <br />
//                             Please enter OTP to complete verification
//                         </p>
//                         <input
//                             id="otpInput"
//                             type=""
//                             placeholder="Enter The OTP Here"
//                             style={{borderRadius:"5px"}}
//                             onChange={(e) => {
//                                 setOtp(e.target.value);}}
//                         />
//                         <br />
//                         <button className="btn btn-primary " id="embtn"  onClick={handleOtpSubmit} >
//                             Submit OTP
//                         </button>

//                         {
//                             <button className="btn btn-outline-dark mt-3 " id="rsndbtn" style={{ marginLeft: "5px" }}  onClick={handleEmail}>
//                                 Resend OTP
//                             </button>
//                         }









//                     </div>
//                 </Container>
//             </>

//         </div>
//     )
// }

// export default EmailVerification




import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { assets } from '../../assets/assets';
import './EmailVerification.css';
import { emailgenerateOtpApi, emailVerificationOtpApi, phonegenerateOtpApi } from '../../Services/allApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EmailVerification = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const [userEmail] = useState(() => JSON.parse(sessionStorage.getItem('email')));
  const [otpGenerated, setOtpGenerated] = useState(false);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // Check if OTP is valid
    if (otp.length !== 6) {
      return toast.error('Invalid OTP. OTP should be 6 digits long.', { position: 'top-right' });
    }
    try {
      const userData = {
        email: userEmail,
        otp,
      };
      const result = await emailVerificationOtpApi(userData);

      if (result.status === 200) {
        toast.success('Email Verification Successful', { position: 'top-center' });
        const phone = JSON.parse(sessionStorage.getItem('phone')); // Retrieve phone from session storage
        await generateOtp(phone);
        navigate('/phoneVerification');
      } else {
        console.log(result);
        toast.error('Verification Failed! Try Again', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error during verification:', error);
      toast.error('An error occurred during verification. Please try again later.', { position: 'top-right' });
    }
  };

  const handleEmail = async () => {
    if (!userEmail) {
      toast.error('User email is not available.', { position: 'top-right' });
      toast.error('YOU NEED TO REGISTER FIRST', { position: 'top-right' });
      navigate('/');
      return;
    }

    if (otpGenerated) {
      toast.error('OTP has already been generated.', { position: 'top-right' });
      return;
    }

    try {
      const result = await emailgenerateOtpApi({ email: userEmail });

      if (result.status === 200) {
        toast.success('OTP Successfully Generated', { position: 'top-center' });
        setOtpGenerated(true);
      }
    } catch (err) {
      console.error('OTP generation failed', err);
      toast.error('An error occurred during OTP generation. Please try again later.', { position: 'top-right' });
    }
  };

  const generateOtp = async (phone) => {
    try {
      const result = await phonegenerateOtpApi({ phone });
      if (result.status === 200) {
        toast.success('OTP Generated Successfully', { position: 'top-center' });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during phone OTP generation. Please try again later.', { position: 'top-right' });
    }
  };

  return (
    <div>
      <Container>
        <div className="p-5 m-5 text-center">
          <img src={assets.foodreg} height={300} alt="" />
          <h2 className="mb-2 emq">Verify Your Email Address</h2>
          <p className="emv">
            We have sent a verification link to your email. <br />
            Please enter OTP to complete verification
          </p>
          <input
            id="otpInput"
            type="text"
            placeholder="Enter The OTP Here"
            style={{ borderRadius: '5px' }}
            onChange={(e) => setOtp(e.target.value)}
          />
          <br />
          <button className="btn btn-primary" id="embtn" onClick={handleOtpSubmit}>
            Submit OTP
          </button>
          <button className="btn btn-outline-dark mt-3" id="rsndbtn" style={{ marginLeft: '5px' }} onClick={handleEmail}>
            Resend OTP
          </button>
        </div>
      </Container>
    </div>
  );
};

export default EmailVerification;
