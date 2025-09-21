
import axios from "../../utils/Axios";

import {
  isLoginRequest,
  isUserFail,
  isRequest,
  isUserSuccess,
  logoutUser,
  clearUser,
  setUserMessage,
} from "../reducers/usersReducer";
export { clearUserError, clearUserMessage } from "../reducers/usersReducer";
import {toast} from "react-toastify";

// Student login action following your syntax
export const studentLogin = (info, navigate, toast) => async (dispatch) => {
  dispatch(isLoginRequest());
  try {
    const { data } = await axios.post("/api/v1/student/login", info);
    if (data?.SuccessResponse?.success) {
      const token = data?.SuccessResponse?.data?.accessToken;
      localStorage.setItem("userToken", token);
      dispatch(isUserSuccess(data.SuccessResponse.data.user));
      toast && toast.success("Student login successful");
      navigate && navigate("/subject-dashboard");
    } else {
      const errorMessage = data?.ErrorResponse?.message || "Login error";
      dispatch(isUserFail(errorMessage));
      toast && toast.error(errorMessage);
      navigate && navigate("/student-login");
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.ErrorResponse?.message ||
      error.message ||
      "Login error";
    dispatch(isUserFail(errorMessage));
    toast && toast.error(errorMessage);
    navigate && navigate("/student-login");
  }
};

export const userLogin = (info, navigate, toast) => async (dispatch) => {
  dispatch(isLoginRequest());
  try {
    const { data } = await axios.post("/api/v1/teacher-admin/login", info);
    if (data?.SuccessResponse?.success) {
      const token = data?.SuccessResponse?.data?.accessToken;
      localStorage.setItem("userToken", token);
      dispatch(isUserSuccess(data.SuccessResponse.data.user));
      toast.success("Login successful");
      navigate("/admin/dashboard");
    } else {
      const errorMessage = data?.ErrorResponse?.message || "Login error";
      dispatch(isUserFail(errorMessage));
      navigate("/auth");
    }
  } catch (error) {
    const errorMessage =
      error?.ErrorResponse?.message ||
      error.response.data.ErrorResponse.message ||
      error.message ||
      "Login error";
    dispatch(isUserFail(errorMessage));
    navigate("/auth");
  }
};

export const userCreate = (info, navigate, toast,onSuccess) => async (dispatch) => {
  dispatch(isRequest());
  try {
    const { data } = await axios.post("/api/v1/teacher-admin/create", info);
    if (data?.SuccessResponse?.success) {
      dispatch(isUserSuccess(data.SuccessResponse.data.user));
      onSuccess();
      toast.success("Registration successful");
    } else {
      const errorMessage =
        data?.ErrorResponse?.message || "Registration error";
      dispatch(isUserFail(errorMessage));
    }
  } catch (error) {
    console.log("error", error);
    const errorMessage =
      error?.ErrorResponse?.message ||
      error.response.data.ErrorResponse.message ||
      error.message ||
      "Registration error";
      toast.error(errorMessage);
    dispatch(isUserFail(errorMessage));
  }
};

export const userUpdate = (info,id,toast) => async (dispatch) => {
  dispatch(isRequest());
  try {
    const { data } = await axios.post(`/api/v1/teacher-admin/update-user/${id}`, info,{'Content-Type': 'multipart/form-data'});

    if (data?.SuccessResponse?.success) {
      dispatch(isUserSuccess(data.SuccessResponse.data));
      toast.success("Updated successfully");
    } else {
      const errorMessage = data?.ErrorResponse?.message || "Update error";
      dispatch(isUserFail(errorMessage));
    }
  } catch (error) {
    const errorMessage =
      error?.ErrorResponse?.message ||
      error.response.data.ErrorResponse.message ||
      error.message ||
      "Update error";
    dispatch(isUserFail(errorMessage));
  }
};

export const userResetPass = (info,id,toast,navigate) => async (dispatch) => {
  dispatch(isRequest());
  try {
    const { data } = await axios.post(`/api/v1/teacher-admin/reset-password/${id}`, info);

    if (data?.SuccessResponse?.success) {
      // await dispatch(fetchUserProfile(navigate));
      // await dispatch(userLogout());
      toast.success("Password updated successfully");

    } else {
      const errorMessage = data?.ErrorResponse?.message || "Update error";
      dispatch(isUserFail(errorMessage));

    }
  } catch (error) {
    const errorMessage =
      error?.ErrorResponse?.message ||
      error.response.data.ErrorResponse.message ||
      error.message ||
      "Update error";
      toast.error(errorMessage);
    // dispatch(isUserFail(errorMessage));
  }
};

export const fetchUserProfile = (navigate) => async (dispatch) => {
  dispatch(isLoginRequest());
  try {
    const token = localStorage.getItem("userToken");

    if (!token) {
      dispatch(isUserFail("Please login to continue"));
      return;
    }
    const { data } = await axios.get("/api/v1/teacher-admin/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.SuccessResponse?.success) {
      dispatch(isUserSuccess(data.SuccessResponse.data));
    } else {
      const errorMessage =
        data?.ErrorResponse?.message || "Internal server error";
      dispatch(isUserFail(errorMessage));
    }
  } catch (error) {
    const errorMessage =
      error?.ErrorResponse?.message ||
      error.response.data.ErrorResponse.message ||
      error.message;
      dispatch(isUserFail(errorMessage));
    if (
      errorMessage == "Your session expired. Please login again to continue."
      
    ) {
      await localStorage.removeItem("userToken");
      navigate("/auth");
    }
    
  }
};
export const fetchstudentProfile = (navigate) => async (dispatch) => {
  dispatch(isLoginRequest());
  try {
    const token = localStorage.getItem("userToken");

    if (!token) {
      dispatch(isUserFail("Please login to continue"));
      return;
    }
    const { data } = await axios.get("/api/v1/student/getstudent", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.SuccessResponse?.success) {
      dispatch(isUserSuccess(data.SuccessResponse.data));
    } else {
      const errorMessage =
        data?.ErrorResponse?.message || "Internal server error";
      dispatch(isUserFail(errorMessage));
    }
  } catch (error) {
    const errorMessage =
      error?.ErrorResponse?.message ||
      error.response.data.ErrorResponse.message ||
      error.message;
      dispatch(isUserFail(errorMessage));
    if (
      errorMessage == "Your session expired. Please login again to continue."
      
    ) {
      await localStorage.removeItem("userToken");
      navigate("/auth");
    }
    
  }
};
export const googleLogin = (credential, navigate, toast) => async (dispatch) => {
    dispatch(isLoginRequest());
    try {
      const { data } = await axios.post("/api/v1/teacher-admin/google-login", {
        credential,
      });

      if (data?.SuccessResponse?.success) {
        const token = data?.SuccessResponse?.data?.accessToken;
        localStorage.setItem("userToken", token);
        dispatch(isUserSuccess(data.SuccessResponse.data.user));
        toast.success("Google login successful");
        navigate("/");
      } else {
        const errorMessage =
          data?.ErrorResponse?.message || "Google login error";
        dispatch(isUserFail(errorMessage));
      }
    } catch (error) {
      const errorMessage =
        error?.ErrorResponse?.message ||
        error.response.data.ErrorResponse.message ||
        error.message ||
        "Google login error";
      dispatch(isUserFail(errorMessage));
    }
  };

export const deleteUserProfile = (id, toast) => async (dispatch) => {
  dispatch(isRequest());
  try {
    const token = localStorage.getItem("userToken");

    if (!token) {
      dispatch(isUserFail("Please login to continue"));
      return;
    }
    const { data } = await axios.get(`/api/v1/teacher-admin/delete-user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.SuccessResponse?.success) {
      dispatch(userLogout());
      dispatch(clearUser());
      toast.success("User deleted successfully");
    } else {
      const errorMessage =
        data?.ErrorResponse?.message || "Internal server error";
      dispatch(isUserFail(errorMessage));
    }
  } catch (error) {
    const errorMessage =
      error?.ErrorResponse?.message ||
      error.response.data.ErrorResponse.message ||
      error.message;
    await dispatch(isUserFail(errorMessage));
    toast.error(errorMessage);
  }
};



export const userLogout = () => (dispatch) => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("guestId");
  dispatch(logoutUser());
};
export const submitContactForm = (contactInfo, toast,setSuccess) => async (dispatch) => {
  dispatch(isRequest());
  try {
    const { data } = await axios.post("/api/v1/teacher-admin/create-contact", contactInfo);
    if (data?.SuccessResponse?.success) {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setSuccess();
    } else {
      const errorMessage = data?.ErrorResponse?.message || "Error sending message";
      toast.error(errorMessage);
      dispatch(isUserFail(errorMessage));
    }
  } catch (error) {
    const errorMessage =
      error?.ErrorResponse?.message ||
      error.response?.data?.ErrorResponse?.message ||
      error.message ||
      "Error sending message";
    toast.error(errorMessage);
    dispatch(isUserFail(errorMessage));
  }
};

//admin
export const getAllUsers = (params = {}) => async (dispatch) => {

  dispatch(isRequest()); // Replace with your actual loading action if needed
  try {
    const { data } = await axios.get("/api/v1/teacher-admin/allusers", { params });
    if (data?.SuccessResponse?.data) {
      // Expecting: { users, total, page, totalPages }
      dispatch({
        type: 'User/getAllUsersSuccess', // Replace with your actual reducer action
        payload: data.SuccessResponse.data
      });
      console.log("Fetched users successfully:", data.SuccessResponse.data);

    } else {
      const errorMessage = data?.ErrorResponse?.message || "Error fetching users";
      toast.error(errorMessage);
      dispatch(isUserFail && isUserFail(errorMessage)); // Replace with your actual error action
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.ErrorResponse?.message || error.message || "Error fetching users";
    toast.error(errorMessage);
    dispatch(isUserFail && isUserFail(errorMessage)); // Replace with your actual error action
  }
};

export const AdminDeleteUser = (id, toast) => async (dispatch) => {
  
  dispatch(isRequest());
  try {
    const token = localStorage.getItem("userToken");
    if (!token) {
      dispatch(isUserFail("Please login to continue"));
      return;
    }
    const { data } = await axios.get(`/api/v1/teacher-admin/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.SuccessResponse?.success) {
      toast.success("User deleted successfully");
      await dispatch(getAllUsers());
    } else {
      const errorMessage =
        data?.ErrorResponse?.message || "Internal server error";
      dispatch(isUserFail(errorMessage));
    }
  } catch (error) {
    const errorMessage =
      error?.ErrorResponse?.message ||
      error.response.data.ErrorResponse.message ||
      error.message;
    await dispatch(isUserFail(errorMessage));
    toast.error(errorMessage);
  }
};