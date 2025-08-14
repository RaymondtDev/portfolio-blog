import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { BlogPostsProvider } from "./contexts/BlogPostsContext";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/Home/LandingPage";
import Blog from "./pages/Blog/Blog";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardMain from "./pages/Dashboard/DashboardMain";
import Messages from "./pages/Dashboard/Messages";
import BlogPostPage from "./pages/Blog/BlogPostPage";
import EditBlogPostForm from "./pages/Dashboard/EditBlogPostForm";
import ProjectPage from "./pages/Home/ProjectPage";

function App() {
  return (
    <AuthProvider>
      <BlogPostsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/blog" element={<Blog />}/>
              <Route path="/blog/:slug" element={<BlogPostPage />}/>
              <Route path="/project/:slug" element={<ProjectPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<DashboardMain />} />
                <Route path="/dashboard/messages" element={<Messages />} />
                <Route path="/dashboard/:slug/edit-post" element={<EditBlogPostForm />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </BlogPostsProvider>
    </AuthProvider>
  );
}

export default App;
