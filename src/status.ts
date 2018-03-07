import * as octokit from "@octokit/rest";
import { STATUS_REPO_OWNER, STATUS_REPO_NAME, STATUS_GITHUB_TOKEN } from "./vars";

// Setup the GitHub API helper
const octo = new octokit({
  timeout: 5000,
  headers: {
    "user-agent": "SIG-Game-Hubot-Gerty",
  },
  protocol: "https"
});

octo.authenticate({
  token: STATUS_GITHUB_TOKEN,
  type: "token",
});

function createFork() {
  return new Promise((resolve, reject) => {
    const options = {
      owner: STATUS_REPO_OWNER,
      repo: STATUS_REPO_NAME,
      organization: "Test-org-for-Vivi"
    }

    octo.repos.fork(options).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err)
    }) ;
  });
}