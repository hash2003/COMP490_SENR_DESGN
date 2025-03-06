import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import KanbanBoard from "./components/KanbanBoard";
import DocumentsPage from "./components/DocumentsPage";
import ProfilePage from "./components/ProfilePage";

const App: React.FC = () => {
  return (
    <Router>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/MatadorBoard.jpg')" }}
      >
        {/* Overlay to enhance text readability */}
        <div className="bg-black bg-opacity-60 min-h-screen">
          {/* Navbar */}
          <Navbar />

          {/* Main Content & Routes */}
          <div className="container mx-auto mt-6 px-4 text-center">
            <Routes>
              {/* Home Page (Kanban as Default View) */}
              <Route
                path="/"
                element={
                  <>
                    <h1 className="text-5xl font-bold text-red-600 drop-shadow-lg">
                      Welcome to Matador Board
                    </h1>
                    <p className="text-gray-200 mt-2 text-lg drop-shadow-md">
                      A streamlined document approval and workflow system for CSUN
                      staff and faculty.
                    </p>

                    {/* Render Kanban Board */}
                    <div className="mt-6 bg-white bg-opacity-25 p-4 rounded-lg shadow-lg">
                      <KanbanBoard />
                    </div>
                  </>
                }
              />

              {/* Kanban Board Page */}
              <Route path="/kanban" element={<KanbanBoard />} />

              {/* Documents Page (Upload & Approval System) */}
              <Route path="/documents" element={<DocumentsPage />} />

              {/* Profile Page */}
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
