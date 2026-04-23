import { useState } from "react";

const COMPANY_DOMAINS = {
  "Stripe": "stripe.com",
  "Shopify": "shopify.com",
  "OpenAI": "openai.com",
  "Atlassian": "atlassian.com",
  "Spotify": "spotify.com",
  "Figma": "figma.com",
  "Google": "google.com",
  "Apple": "apple.com",
  "Microsoft": "microsoft.com",
  "Amazon": "amazon.com",
  "Meta": "meta.com",
  "Netflix": "netflix.com",
  "Uber": "uber.com",
  "Airbnb": "airbnb.com",
  "Salesforce": "salesforce.com",
  "intel": "intel.com",
  "IBM": "ibm.com",
  "Oracle": "oracle.com",
  "Adobe": "adobe.com",
  "Twitter": "twitter.com",
  "Infosys": "infosys.com",
  "TCS": "tcs.com",
  "Accenture": "accenture.com",
  "Capgemini": "capgemini.com",
  "Cognizant": "cognizant.com",
  "Deloitte": "deloitte.com",
  "EY": "ey.com",
  "KPMG": "kpmg.com",
  "PwC": "pwc.com",
};

export default function CompanyLogo({ company }) {
  const domain = COMPANY_DOMAINS[company];
  const [imgError, setImgError] = useState(false);
  const initial = company ? company.charAt(0).toUpperCase() : "?";

  if (!domain || imgError) {
    return (
      <div style={{
        width: "48px", height: "48px", borderRadius: "12px",
        background: "#f05a22", display: "flex", alignItems: "center",
        justifyContent: "center", color: "white",
        fontWeight: "800", fontSize: "20px"
      }}>
        {initial}
      </div>
    );
  }

  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt={company}
      onError={() => setImgError(true)}
      style={{
        width: "48px", height: "48px",
        borderRadius: "12px",
        objectFit: "contain",
        background: "#f4f5f7",
        padding: "6px",
        border: "1.5px solid #eef0f4"
      }}
    />
  );
}