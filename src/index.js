import Resolver from '@forge/resolver';
import api, {route,router} from "@forge/api";

const resolver = new Resolver();
console.log("WORKING")
resolver.define('getText', (req) => {
    console.log(req);

    return 'Hello, world!';
});

resolver.define('getIssues', async ({payload}) => {
    const { projectId , projectKey } = payload
    console.log(payload)
    const jql = `project = ${projectId ? projectId : projectKey}`
    //key & id
    const response = await api
        .asUser()
        .requestJira(route`/rest/api/3/search?jql=${jql}&fields=key,summary,assignee,reporter,status`, {
            headers: {
                'Accept': 'application/json'
            }
        });
    console.log(`Response: ${response.status} ${response.statusText}`);
    const json = await response.json();
    console.log(json);

    return json.issues.map(issue => ({
        key: issue.key,
        summary: issue.fields.summary,
        reporter: issue.fields.reporter.displayName,
        assignee: issue.fields.assignee ? issue.fields.assignee.displayName : 'Unassigned',
        status: "To Do"
    }));
});

export const runAdminPage = resolver.getDefinitions();

export const handler = resolver.getDefinitions();

