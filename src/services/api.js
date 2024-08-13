import axios from "axios";

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: "http://localhost:8000/api/", // Base URL for API requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login API
export const login = (credentials) => {
  return api.post("login", credentials);
};

const getAuthToken = () => localStorage.getItem("token");

const BASE_URL = "http://localhost:8000/api/";

const token = getAuthToken();

export const fetchEmployees = async (page = 1, perPage = 10, name = "") => {
  try {
    // console.log(token);
    const response = await axios.get(`${BASE_URL}employees`, {
      params: {
        page,
        per_page: perPage,
        name,
      },
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching employees");
  }
};

// Function to fetch a single employee by ID
export const getEmployeeById = async (id) => {

  try {
    const response = await axios.get(`${BASE_URL}employees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Bearer token in the header
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching employee by ID:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// Create Employee
export const createEmployee = (data) => {
  return api.post("employees", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update Employee
export const updateEmployee = async (id, formData) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const response = await api.post(`update-employees/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Ensure the content type is set to multipart/form-data
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Function to get divisions
export const getDivisions = async () => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const response = await api.get("divisions?paginate=false", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete Employee
export const deleteEmployee = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`employees/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Logout API
export const logout = () => {
  localStorage.removeItem("token");
  return Promise.resolve();
};

export const fetchAdmin = async () => {
  const response = await axios.get("http://localhost:8000/api/admin", {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updateAdmin = async (adminData, id) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/admin/${id}`,
      adminData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("API error:", error.response.data); // Log API error
    throw error;
  }
};
