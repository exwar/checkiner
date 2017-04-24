const qs = require('qs');
const _ = require('lodash');
const reverseString = require('reverse-string');
const api = require('./api.js');

// const JIRA_USER = process.env.JIRA_USER;
// const JIRA_PASSWORD = process.env.JIRA_PASSWORD;
const JIRA_USER = 'Stanislav.Nekrasov';
const JIRA_PASSWORD = 'M3poz7!';
const JIRA_DOMAIN = 'https://aussiefarmers.atlassian.net';
const JIRA_ISSUE_REGEX = /\d+-[A-Z]+(?!-?[a-zA-Z]{1,10})/gm;

const btoa = str => {
  var buffer;

  if (str instanceof Buffer) {
    buffer = str;
  } else {
    buffer = new Buffer(str.toString(), 'binary');
  }

  return buffer.toString('base64');
};

const getBasicAuthHeader = (user, password) => {
  return `Basic ${btoa(`${user}:${password}`)}`;
};

const matchJiraIssues = text => {
  const reversedText = reverseString(text);
  const matches = reversedText.match(JIRA_ISSUE_REGEX);

  return matches !== null && matches.length > 0
    ? _.reverse(_.uniq(matches.map(issue => reverseString(issue).trim())))
    : [];
};

const fetchIssuesData = (issues = []) => {
  if (issues.length < 1) throw 'At least one JIRA issue should be passed';

  const jql = `issuetype in (standardIssueTypes(), subTaskIssueTypes()) AND issuekey in (${issues.join(', ')})`;
  const jqlQuery = qs.stringify({
    jql,
  });

  const url = `${JIRA_DOMAIN}/rest/api/2/search?${jqlQuery}`;
  const options = {
    headers: {
      Authorization: getBasicAuthHeader(JIRA_USER, JIRA_PASSWORD),
      'Content-Type': 'application/json',
    },
  };

  return fetch(url, options).then(api.checkStatus).then(api.parseJSON).catch(ex => {
    throw ex;
  });
};

const parseIssues = json => {
  if (!json.total || json.total < 1 || !json.issues.length) return [];

  return json.issues.reduce((issues, issue) => {
    return [
      ...issues,
      {
        key: issue.key,
        summary: issue.fields.summary,
        url: `${JIRA_DOMAIN}/browse/${issue.key}`,
      },
    ];
  }, []);
};

module.exports = {
  fetchIssuesData,
  parseIssues,
  matchJiraIssues,
};
