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
function prepareUpdate(update: Update): Promise<any> {
  /*
  Prepare a title and content for a status update
  */
  return new Promise((resolve, reject) => {
    // YAML front matter for post
    const frontMatter = yaml.safeDump({
      category: update.category,
      date: update.date.format("YYYY-MM-DD HH:mm:ss ZZ"),
      layout: "update",
      tags: update.status,
      title: update.title,
    });

    // Post content
    const content = `---\n${frontMatter}---\n\n${update.message}\n`;

    let counter = 0;
    const nextTitle = function () {
      /*
      Prepare the file's title, ensuring that it is unique by
      tacking a -1, -2, -3, etc onto the end of the filename.
      */
      let title = `${update.date.format("YYYY-MM-DD")}-${slug(update.title)}`;
      if (counter > 0) {
        title = `${title}-${counter}`;
      }
      counter += 1;
      return `${title}.md`;
    };

    const options = {
      owner: STATUS_REPO_OWNER,
      path: "_posts",
      ref: "master",
      repo: STATUS_REPO_NAME,
    };

    console.log(octo.repos.getContent(options))

    octo.repos.getContent(options).then((result: octokit.AnyResponse) => {
      // Retrieve the file names from `_posts/`
      const names = result.data.map((x: any) => x.name);

      // Generate titles until we have a unique one.
      let title = nextTitle();
      while (names.indexOf(title) > 0) {
        title = nextTitle();
      }
      // Add our created data to the update object
      update.file = {
        base64: new Buffer(content).toString("base64"),
        content: content,
        name: title,
      };
      return resolve(update);
    }).catch((err: any) => {
      return reject("Why");
    });
  });
}

const submitUpdate = function(update: Update): Promise<any> {
  /*
  Submit a status update to GitHub
  */
  return new Promise((resolve, reject) => {
    const options = {
      branch: "master",
      content: update.file.base64,
      message: `Update status of ${update.category} to ${update.status}`,
      owner: STATUS_REPO_OWNER,
      path: `_posts/${update.file.name}`,
      repo: STATUS_REPO_NAME,
    };

    return octo.repos.createFile(options).then((data: octokit.AnyResponse) => {
      return resolve(data);
    }).catch((err: any) => {
      return reject(err.message);
    });
  });
};

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
      return reject("GitHub API Token isn't present or is blank. Please provide a token in your .env file.");
    }

    // TODO: Make the bot name (Vivi) a constant, not hardcoded
    const update: Update = {
      author: "Vivi",
      category: category,
      date: moment(),
      message: message,
      status: status,
      title: title,
    };

    prepareUpdate(update).then((preppedUpdate) => {
      submitUpdate(preppedUpdate).then((data) => {
        return resolve(data);
      }).catch((err) => {
        return reject(err.message);
      });
    }).catch((err) => {
      return reject(err.message);
    });
  });
}
