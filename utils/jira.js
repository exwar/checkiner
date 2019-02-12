const qs = require('qs');
const _ = require('lodash');
const getConfig = require('next/config');
const reverseString = require('reverse-string');
const api = require('./api.js');

const {JIRA_USER_EMAIL, JIRA_TOKEN, JIRA_DOMAIN} = require('../next.config').serverRuntimeConfig;

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

const getBasicAuthHeader = (userEmail, token) => {
  return `Basic ${btoa(`${userEmail}:${token}`)}`;
};

const matchJiraIssues = text => {
  const reversedText = reverseString(text);
  const matches = reversedText.match(JIRA_ISSUE_REGEX);

  return matches !== null && matches.length > 0
    ? _.uniq(_.reverse(matches.map(issue => reverseString(issue).trim())))
    : [];
};

const fetchIssuesData = (issues = []) => {
  if (issues.length < 1) throw 'At least one JIRA issue should be passed';

  const jql = `issuetype in (standardIssueTypes(), subTaskIssueTypes()) AND issuekey IN (${issues.join(') OR issuekey IN (')})`;
  const jqlQuery = qs.stringify({
    validateQuery: false,
    jql,
  });

  const url = `${JIRA_DOMAIN}/rest/api/3/search?${jqlQuery}`;
  const options = {
    headers: {
      Authorization: getBasicAuthHeader(JIRA_USER_EMAIL, JIRA_TOKEN),
      'Content-Type': 'application/json',
    },
  };

  return fetch(url, options).then(api.parseJSON).catch(ex => {
    throw ex;
  });
};

const parseIssues = json => {
  if (!json.total || json.total < 1 || !json.issues.length) return [];

  return _.reverse(json.issues).reduce((issues, issue) => {
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
