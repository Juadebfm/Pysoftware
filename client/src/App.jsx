import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { MenuProvider } from "./context/MenuContext";
import DashboardContent from "./pages/DashboardContent";
import StudentsContent from "./pages/StudentsContent";
import LoginContent from "./pages/LoginContent";
import TutorContent from "./pages/TutorContent";
import PriceContent from "./pages/PriceContent";
import SignUpContent from "./pages/SignUpContent";
import ContactContent from "./pages/ContactContent";
import HelpContent from "./pages/HelpContent";
import AboutContent from "./pages/AboutContent";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <MenuProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <DashboardContent />
              </Layout>
            }
          />
          <Route
            path="/students"
            element={
              <Layout>
                <StudentsContent />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <LoginContent />
              </Layout>
            }
          />
          <Route
            path="/price_list"
            element={
              <Layout>
                <PriceContent />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout>
                <SignUpContent />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <ContactContent />
              </Layout>
            }
          />
          <Route
            path="/help"
            element={
              <Layout>
                <HelpContent />
              </Layout>
            }
          />
          <Route
            path="/tutor"
            element={
              <Layout>
                <TutorContent />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <AboutContent />
              </Layout>
            }
          />
        </Routes>
      </MenuProvider>
    </Router>
  );
};

export default App;
