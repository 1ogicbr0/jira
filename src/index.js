import Resolver from "@forge/resolver";
import api, { route, router, storage } from "@forge/api";

const resolver = new Resolver();
console.log("WORKING");
resolver.define("getText", (req) => {
  console.log(req);
  return "Hello, world!";
});

resolver.define("getIssues", async ({ payload }) => {
  const { projectId, projectKey } = payload;
  console.log(payload);
  const jql = `project = ${projectId ? projectId : projectKey}`;
  //key & id
  const response = await api
    .asUser()
    .requestJira(
      route`/rest/api/3/search?jql=${jql}&fields=key,summary,assignee,reporter,status`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
  console.log(`Response: ${response.status} ${response.statusText}`);
  //write a function to get the status

  const json = await response.json();
  console.log(json);
  return json.issues.map((issue) => ({
    key: issue.key,
    summary: issue.fields.summary,
    reporter: issue.fields.reporter.displayName,
    assignee: issue.fields.assignee
      ? issue.fields.assignee.displayName
      : "Unassigned",
    status: "To Do",
  }));
});

resolver.define(
  "getStorage",
  async ({ payload }) => await storage.get(payload.key && payload.key)
);

resolver.define(
  "setStorage",
  async ({ payload }) => await storage.set(payload.key, [...payload.data])
);

resolver.define(
    "deleteStorage",
    async ({ payload }) => await storage.delete(payload.key)
    );

export const handler = resolver.getDefinitions();
