import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";


// Google Login 
export const googleLoginApi = async (body) => {
  return await commonApi('POST', `${BASE_URL}/api/googleLogin`, body, "")
}

// Login 
export const loginApi = async (body) => {
  return await commonApi('POST', `${BASE_URL}/user/login`, body, "")
}

// Register 
export const registerApi = async (body) => {
  return await commonApi('POST', `${BASE_URL}/user/register`, body, "")
}

//  Generate and verify email otp 
export const emailgenerateOtpApi = async (body) => {
  return await commonApi("POST", `${BASE_URL}/emailOtp`, body, "");
};

export const emailVerificationOtpApi = async (body) => {
  return await commonApi("POST", `${BASE_URL}/emailverification`, body, "");
};


// Generate and verify phone otp 
export const phonegenerateOtpApi = async (body) => {
  return await commonApi("POST", `${BASE_URL}/phoneOtp`, body, "");
}

export const phoneverificationOtpApi = async (body) => {
  return await commonApi("POST", `${BASE_URL}/phoneotpverify`, body, "");
}

// Admin Panel 

// Admin Add
export const AllFoodAddApi = async (formData) => {
  return await commonApi("POST", `${BASE_URL}/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

// Admin list 

export const allFoodList = async () => {
  return await commonApi("GET", `${BASE_URL}/foodlist`, "")
}

// Admin list - remove 
export const removeFoodApi = async (body) => {
  return await commonApi("POST", `${BASE_URL}/remove`, body, "")
}




