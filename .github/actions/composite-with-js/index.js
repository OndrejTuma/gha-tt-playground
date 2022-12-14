const github = require("@actions/github");
const core = require("@actions/core");

const main = async () => {
  const octokit = new github.getOctokit(core.getInput('token'));

  const {
    pull_request: { number: issue_number },
    repository: {
      owner: { login: owner },
      name: repo,
    },
  } = github.context.payload

  console.log('CORE:', core)

  const body = 'Hello from Octokit with input'

  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number,
    body,
  })
};

main();
