# Slack check in bot

**Web-service created to simplify and improve quality of daily
check-ins in Slack.**

![Slack Checkiner](https://s.exwar.space/2021/07/checkiner.gif)

## Required setup

1. Create a new Slack App: `https://api.slack.com/apps`
1. Obtain `Client ID` and `Client Secret` for newly created Slack App
   ![Slack Credentials](https://exwar.space/api/public/dl/LGxsgrUx/slack-creds.png?inline=true)
1. Duplicate `example.env` file as `.env` and update env vars with your slack credentials and target channel. You can use either channel id or channel name.
1. If you'd like to enable automatic link generation for mentioned JIRA tickets, [generate JIRA API token](https://confluence.atlassian.com/cloud/api-tokens-938839638.html)
1. Put your gathered JIRA token in previously created `.env` file along with your Atlassian email and JIRA domain.
1. In case if you don't want to include JIRA links in your check-in message, simply remove all `JIRA_*` envs from `.env` file.

## Docker deployment

1. Make sure your `.env` file is created and updated with according credentials as mentioned before.
1. Build an image with `docker run` or use `docker compose up -d --build`
1. By default application runs on port `3010`

## Next.js telemetry

By default Next.js collects anonymous telemetry about general usage.

See [https://nextjs.org/telemetry](https://nextjs.org/telemetry) for more info.
