import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../features/hero/Hero.jsx";
import AuthModal from "../features/login/AuthModal.jsx";
import RecruiterLogin from "../features/recruiter/RecruiterLogin.jsx";
import PostJobModal from "../features/recruiter/PostJobModal.jsx";
import Categories from "../features/categories/Categories.jsx";
import JobsList from "../features/jobs/JobsList.jsx";
import CTABanner from "../features/cta/CTABanner.jsx";

export default function Home({ user, setUser, recruiter, setRecruiter, showAuth, setShowAuth, showRec, setShowRec, showPostJob, setShowPostJob, onLogout }) {
  const [job, setJob] = useState("");
  const [loc, setLoc] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  

  return (
    <div className="app">
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={(userData) => { setUser(userData); setShowAuth(false); }}
        />
      )}
      {showRec && (
        <RecruiterLogin
          onClose={() => setShowRec(false)}
          onSuccess={(recruiterData) => { setRecruiter(recruiterData); setShowRec(false); }}
        />
      )}
      {showPostJob && (
        <PostJobModal
          onClose={() => setShowPostJob(false)}
          onSuccess={() => {
            setShowPostJob(false);
            setRefreshKey(k => k + 1);
          }}
        />
      )}
      <Navbar
        user={user}
        recruiter={recruiter}
        onAuthClick={() => setShowAuth(true)}
        onRecruiterClick={() => setShowRec(true)}
        onLogout={onLogout}
        onPostJob={() => setShowPostJob(true)}
      />
      <Hero job={job} setJob={setJob} loc={loc} setLoc={setLoc} />
      <Categories refreshKey={refreshKey} />
      <JobsList />
      <CTABanner onPostClick={() => setShowPostJob(true)} />
      <Footer />
    </div>
  );
}