import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000/api" });

// Admin API routes
export const getAdmin = () => API.get("/admin", { withCredentials: true })
export const login = (usernameOrEmail, password) => API.post("/admin/login", {
  usernameOrEmail,
  password
}, { withCredentials: true });
export const logout = () => API.post("/admin/logout", { withCredentials: true });

// Blog posts API routes
export const getBlogPosts = (tag = "") => API.get("/blog", { params: { tag } });
export const createBlogPost = (data) => API.post("/blog", data, { 
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  }
});
export const deletePost = (id) => API.delete(`/blog/${id}`, { withCredentials: true });
export const getPostBySlug = (slug) => API.get(`/blog/${slug}`);
export const updatePost = (id, data) => {
  let headers = {};
  if (data instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  } else {
    headers["Content-Type"] = "application/json";
  }
  return API.put(`/blog/${id}`, data, { 
    withCredentials: true,
    headers
  });
};

// Editor image upload API route
export const uploadImage = (file) => API.post("/upload", file, { 
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  }
});

// Message API routes
export const getMessages = () => API.get("/messages", { withCredentials: true });
export const getMessageById = (id) => API.get(`/messages/${id}`, { withCredentials: true });
export const deleteMessage = (id) => API.delete(`/messages/${id}`, { withCredentials: true });
export const sendMessage = (data) => API.post("/messages/sendMessage", data);

// Task API routes
export const getTasks = (status = "", priority = "") => API.get("/tasks", { 
  params: { status, priority },
  withCredentials: true 
});
export const createTask = (data) => API.post("/tasks", data, { withCredentials: true });
export const updateTaskStatus = (id, status) => API.patch(`/tasks/${id}`, status, { withCredentials: true });
export const deleteTask = (id) => API.delete(`/tasks/${id}`, { withCredentials: true });