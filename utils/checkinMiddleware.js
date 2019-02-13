const qs = require('qs');
const dateUtils = require('./date.js');
const api = require('./api.js');
const jira = require('./jira.js');
const REQUIRED_JIRA_ENV_VARS = ['JIRA_USER_EMAIL', 'JIRA_TOKEN', 'JIRA_DOMAIN'];
const { serverRuntimeConfig } = require('../next.config');

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const getAttachments = (username, yesterday, today, isBlocked, jiraIssues) => {
  const currentDate = new Date();
  const humanDate =
    currentDate.getDate() + ' ' + MONTH_NAMES[currentDate.getMonth()];

  const attachments = [
    {
      fallback: `Check in by ${username} @ ${humanDate}`,
      color: '#915CB6',
      fields: [
        {
          title: dateUtils.isYesterdayASunday(currentDate)
            ? 'Friday'
            : 'Yesterday',
          value: yesterday || '_Nothing_',
          short: false
        },
        {
          title: 'Today',
          value: today || '_Nothing_',
          short: false
        }
      ],
      mrkdwn_in: ['fields'],
      footer: "<https://slackcheck.in|Stan's IT Checkiner 3000>"
    }
  ];

  if (jiraIssues.length > 0) {
    attachments[0].fields.push({
      title: 'Mentioned JIRA Issues',
      value: jiraIssues
        .map(issue => `<${issue.url}|${issue.key}> — ${issue.summary}`)
        .join('\n'),
      short: false
    });
  }

  attachments[0].fields.push({
    value: isBlocked ? '🚨 Blocked' : '✅ No blockers',
    short: false
  });

  return attachments;
};

const sendSlackRequest = (req, res, jiraIssues = []) => {
  const { username, yesterday, today, isBlocked } = req.body;
  const data = qs.stringify({
    channel: process.env.SLACK_APP_CHANNEL,
    token: req.body.token,
    as_user: true,
    attachments: JSON.stringify(
      getAttachments(username, yesterday, today, isBlocked, jiraIssues)
    )
  });

  const url = `https://slack.com/api/chat.postMessage?${data}`;

  return fetch(url, {
    method: 'POST'
  })
    .then(api.checkResponse)
    .then(api.parseJson)
    .then(json => {
      if (json.ok) {
        return res.sendStatus(201);
      } else {
        return res.status(500).send(json);
      }
    })
    .catch(ex => {
      return res.status(500).send(ex.stack);
    });
};

const checkinMiddleware = (req, res) => {
  const jiraEnvsSet = REQUIRED_JIRA_ENV_VARS.reduce((acc, item) => {
    return acc && serverRuntimeConfig[item] !== undefined;
  }, true);

  const jiraIssues = jiraEnvsSet
    ? jira.matchJiraIssues(`${req.body.yesterday}\n${req.body.today}`)
    : [];

  if (jiraIssues.length > 0) {
    jira
      .fetchIssuesData(jiraIssues)
      .then(jira.parseIssues)
      .then(issues => sendSlackRequest(req, res, issues))
      .catch(ex => {
        return res.status(500).send(ex.stack);
      });
  } else {
    sendSlackRequest(req, res);
  }
};

module.exports = checkinMiddleware;
