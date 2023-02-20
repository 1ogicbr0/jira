import Resolver from '@forge/resolver';
<<<<<<< HEAD
import api, {route,router} from "@forge/api";

=======
import api, {route} from "@forge/api";
>>>>>>> 44e9792200886cf7f81ec6e2bedc4e2e3da69896
const resolver = new Resolver();
console.log("WORKING")
resolver.define('getText', (req) => {
    console.log(req);
    return 'Hello, world!';
});
<<<<<<< HEAD

resolver.define('getIssues', async ({payload}) => {
    const { projectId , projectKey } = payload
    console.log(payload)
    const jql = `project = ${projectId ? projectId : projectKey}`
=======
resolver.define('getIssues', async (req) => {
    console.log("REQ", req)
    const jql = `project = ${req.payload.projectId}`
>>>>>>> 44e9792200886cf7f81ec6e2bedc4e2e3da69896
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
<<<<<<< HEAD

export const runAdminPage = resolver.getDefinitions();

export const handler = resolver.getDefinitions();

=======
export const handler = resolver.getDefinitions();
>>>>>>> 44e9792200886cf7f81ec6e2bedc4e2e3da69896
