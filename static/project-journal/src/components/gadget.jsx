import React, { useState, useEffect } from 'react';

function RecentIssuesGadget(props) {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function fetchIssues() {
      const response = await fetch(`${props.baseUrl}/rest/api/3/search?jql=${encodeURIComponent(props.jql)}`);
      const data = await response.json();
      setIssues(data.issues);
    }
    fetchIssues();
  }, [props.baseUrl, props.jql]);

  return (
    <div>
      <h2>{props.title}</h2>
      <ul>
        {issues.map(issue => (
          <li key={issue.key}>
            <a href={`${props.baseUrl}/browse/${issue.key}`}>{issue.fields.summary}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentIssuesGadget;