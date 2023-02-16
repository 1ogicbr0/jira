import React, { useEffect, useState } from "react";
import { invoke, view, router } from "@forge/bridge";
import { useLocation } from "react-router-dom";

function App() {
  const [projectKey, setKey] = useState("");
  const [projectId, setId] = useState("");
  view.getContext().then((data) => {
    const { key, id } = data.extension.project;
    setKey(key);
    setId(id);
  });

  const [issues, setIssues] = useState([]);
  useEffect(() => {
    if (projectKey) {
      invoke("getIssues", {
        projectId: projectId,
        projectKey: projectKey,
      }).then(setIssues);
    }
  }, [projectKey, projectId]);

  return (
    <div>
      <h2>Open Issues - MY PROJECT </h2>
      {issues.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Issue Key</th>
              <th>Test Shehry Key</th>
              <th>Summary</th>
              <th>Reporter</th>
              <th>Assignee</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.key}>
                <td>{issue.key}</td>
                <td>{issue.summary}</td>
                <td>{issue.reporter}</td>
                <td>{issue.assignee}</td>
                <td>{issue.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
