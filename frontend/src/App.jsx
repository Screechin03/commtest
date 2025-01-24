
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import CreateServicePage from "./pages/CreateServicePage";
import ContactUs from "./pages/ContactUs";
import Details from "./pages/Details";

// import AdminPage from "./pages/AdminPage";

const App = () => {
  const { theme } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div >
      <div data-theme={theme}></div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/services" element={authUser ? <ServicesPage /> : <Navigate to="/login" />} />
        <Route path="/services/create" element={authUser ? <CreateServicePage /> : <Navigate to="/login" />} />
        <Route path="/services/:id" element={authUser ? <Details /> : <Navigate to="/login" />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* <Route
          path="/admin"
          element={authUser && isAdmin ? <AdminPage /> : <Navigate to="/" />}
        /> */}
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
