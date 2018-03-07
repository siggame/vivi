import * as octokit from "@octokit/rest";
import * as yaml from "js-yaml";
import * as moment from "moment";
import * as slug from "slug";

import {STATUS_GITHUB_TOKEN, STATUS_REPO_NAME, STATUS_REPO_OWNER} from "./vars";

export type Category = "webserver" | "arena" | "food" | "gameserver" | "visulizer" | "git";
export type Status = "OK" | "Warning" | "Down";

// TODO: Change date type to moment's type
type Update = {
  author: string,
  category: Category,
  date: any,
  file?: any,
  message: string,
  status: Status,
  title: string,
};

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

// Helper functions (should only be called from inside of updateStatus)
function submitUpdate(update: Update): Promise<any> {
  /*
  Prepare a title and content for a status update
  */
  return new Promise((resolve, reject) => {
    // YAML front matter for post
    const frontMatter = yaml.safeDump({
      layout: "update",
      title: update.title,
      category: update.category,
      tags: update.status,
      date: update.date.format("YYYY-MM-DD HH:mm:ss ZZ"),     
    });

    // Post content
    const content = `---\n${frontMatter}---\n\n${update.message}\n`;
    
    const options = {
      owner: STATUS_REPO_OWNER,
      path: `_posts/${update.date.format("YYYY-MM-DD")}-${update.date.format("HH:mm:ss")}-${slug(update.title)}.md`,
      message: `Update status of ${update.category} to ${update.status}`,
      ref: "master",
      repo: STATUS_REPO_NAME,
      content: new Buffer(content).toString("base64"),
    };

    octo.repos.createFile(options).then((data) => {
      resolve(data)
    }).catch((err: any) => {
      reject(err);
    });
  });
}


/**
 * updateStatus - updates a status on SIG-Game's Status Website
 * Requires the following env vars to function properly:
 *   STATUS_REPO_NAME - the name of the repo to use
 *   STATUS_REPO_OWNER - the username of the owner of the repo
 *   STATUS_GITHUB_TOKEN - token for a user auth'd to commit to the repo
 *
 * @param {Category} category
 * @param {Status} status
 * @param {String} title
 * @param {String} message
 * @returns {Promise<any>}
 */
export default function updateStatus(category: Category, status: Status, title: string, message: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // Check and make sure the token exists, and try and authenticate
    if(!STATUS_GITHUB_TOKEN) {
      reject("GitHub API Token isn't present or is blank. Please provide a token in your .env file.");
    }
    else {
      const update: Update = {
        author: "Vivi",
        category: category,
        date: moment(),
        message: message,
        status: status,
        title: title,
      };

      submitUpdate(update).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err.message);
      });
    }
  });
}
