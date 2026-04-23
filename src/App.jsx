import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import "./App.css";
import ApplyCard from "./features/apply/ApplyCard.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import MyApplications from "./pages/MyApplications.jsx";




export default function App() {
  const [user, setUser] = useState(null);
  const [recruiter, setRecruiter] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showRec, setShowRec] = useState(false);
  const [showPostJob, setShowPostJob] = useState(false);

  const handleLogout = (type) => {
    if (type === "user") setUser(null);
    if (type === "recruiter") setRecruiter(null);
  };

  return (
    <Routes>
      <Route path="/" element={
        <Home
          user={user} setUser={setUser}
          recruiter={recruiter} setRecruiter={setRecruiter}
          showAuth={showAuth} setShowAuth={setShowAuth}
          showRec={showRec} setShowRec={setShowRec}
          showPostJob={showPostJob} setShowPostJob={setShowPostJob}
          onLogout={handleLogout}
        />}
      />
      <Route path="/search" element={
        <SearchResults
          user={user} recruiter={recruiter}
          onAuthClick={() => setShowAuth(true)}
          onRecruiterClick={() => setShowRec(true)}
          onLogout={handleLogout}
          onPostJob={() => setShowPostJob(true)}
        />}
      />
      <Route path="/jobs/:id" element={<ApplyCard user={user} setUser={setUser} onAuthClick={() => setShowAuth(true)}/>}/>
        <Route path="/profile" element={<UserProfile user={user} onLogout={handleLogout} onAuthClick={() => setShowAuth(true)} onRecruiterClick={() => setShowRec(true)} />} />
        <Route path="/my-applications" element={<MyApplications user={user} onLogout={handleLogout} onAuthClick={() => setShowAuth(true)} onRecruiterClick={() => setShowRec(true)} />} />
    </Routes>
  );
}