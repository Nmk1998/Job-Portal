export default function CTABanner({onPostClick}) {
  console.log("onPostClick:", onPostClick);

  return (
    <div className="cta-banner">
      <h2>Are you hiring?</h2>
      <p>Post a job and reach thousands of qualified developers today.</p>
      <button className="btn-white" onClick={onPostClick}>Post a Job — It's Free</button>
    </div>
  );
}