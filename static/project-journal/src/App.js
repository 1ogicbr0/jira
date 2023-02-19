import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

function App() {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        invoke('getIssues', { projectId: 10001, key:"JOUR", }).then(setIssues);
    }, []);

    return (
        <div>
            <h2>Open Issues</h2>
            {issues ? (
                <table>
                    <thead>
                    <tr>
                        <th>The Issue Key</th>
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