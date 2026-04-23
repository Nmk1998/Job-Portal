  import { useState, useEffect } from "react";
  import CompanyLogo from "../../utils/CompanyLogo.jsx";
  import { useNavigate } from "react-router-dom";


    const HARDCODED_JOBS = [
      { id: 1, title: "Senior React Developer", company: "Stripe", location: "Remote", jobType: "Full-time", salary: "$140K–$180K", hot: true },
      { id: 2, title: "Node.js Backend Engineer", company: "Shopify", location: "Toronto, CA", jobType: "Full-time", salary: "$120K–$155K", hot: false },
      { id: 3, title: "ML Engineer – LLMs", company: "OpenAI", location: "San Francisco", jobType: "Full-time", salary: "$180K–$240K", hot: true },
      { id: 4, title: "DevOps / Platform Engineer", company: "Atlassian", location: "Remote", jobType: "Contract", salary: "$90–$110/hr", hot: false },
      { id: 5, title: "iOS Developer (Swift)", company: "Spotify", location: "Stockholm / Remote", jobType: "Full-time", salary: "$110K–$145K", hot: false },
      { id: 6, title: "Full-Stack Engineer", company: "Figma", location: "New York", jobType: "Full-time", salary: "$130K–$170K", hot: true },
    ];

    


  function JobCard({ j }) {
    const navigate = useNavigate();
    return (
      <div className="job-card">
        <div className="job-header">
          <CompanyLogo company={j.company} />
          {j.hot && <span className="hot-badge">🔥 Hot</span>}
        </div>
        <h3 className="job-title">{j.title}</h3>
        <p className="job-company">{j.company}</p>
        <div className="job-meta">
          <span>📍 {j.location}</span>
          <span>💼 {j.jobType}</span>
        </div>
        <div className="job-footer">
          <span className="job-salary">{j.salary}</span>
          <button className="btn btn-primary btn-sm" onClick={()=> navigate(`/jobs/${j.id}`,{ state: { job: j } })}>Apply Now</button>
        </div>
      </div>
    );
  }

  export default function JobsList() {
    
    const [allJobs, setAllJobs] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [jobs, setJobs] = useState([]);


    // const fetchJobs = async () => {
    // try {
    //   const res = await fetch("/api/jobs/jobs-list-from-db");
    //   const data = await res.json();
    //   setJobs(data); // ✅ store jobs
    // } catch (err) {
    //    console.error("Failed to fetch jobs", err);
    // }
    // };

       

    const fetchAllJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/jobs/search?title=&location=`);
        const data = await res.json();
        setAllJobs(data);
        setShowAll(true);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };

    const displayedJobs = showAll ? allJobs : HARDCODED_JOBS;
    

    return (
      <div className="jobs-wrap">
        <div className="inner">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Jobs</h2>
              <p className="section-sub">
                {showAll ? `${allJobs.length} jobs from database` : "Handpicked roles from top companies"}
              </p>
            </div>
            {!showAll ? (
              <button className="btn btn-ghost" onClick={fetchAllJobs} disabled={loading}>
                {loading ? "Loading..." : "View All Jobs →"}
              </button>
            ) : (
              <button className="btn btn-ghost" onClick={() => setShowAll(false)}>
                Show Featured →
              </button>
            )}
          </div>

          <div className="jobs-grid">
            {displayedJobs.map(j => (
              <JobCard key={j.id || j.title} j={j} />
            ))}
          </div>

        </div>
      </div>
    );
  }