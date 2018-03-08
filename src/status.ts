import * as octokit from "@octokit/rest";
import { STATUS_REPO_OWNER, STATUS_REPO_NAME, STATUS_GITHUB_TOKEN } from "./vars";
import { resolve } from "dns";

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



export default function createFork() {
  const options = {
    owner: STATUS_REPO_OWNER,
    repo: STATUS_REPO_NAME,
    organization: "Test-org-for-Vivi"
  }

  return new Promise((resolve, reject) => {
    octo.repos.fork(options).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    });
  });
}


function getForks() {
  return new Promise ((resolve, reject) => {
    const options = {
      owner: STATUS_REPO_OWNER,
      repo: STATUS_REPO_NAME,
      organization: "Test-org-for-Vivi"
    }
    octo.repos.getForks(options).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    }) ;
  });
}