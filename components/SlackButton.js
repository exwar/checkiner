import qs from 'qs';

class SlackButton extends React.Component {
  render() {
    const params = qs.stringify({ action: 'signin' });
    const url = `/slack?${params}`;

    return (
      <a href={url} onClick={this.props.onClick}>
        <img
          alt="Sign in with Slack"
          height="40"
          width="172"
          src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
          srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
        />
        <style jsx>{`
          a {
            display: inline-block;
            transition: all 0.2s ease-in-out;
            border-radius: 6px;
          }
          img {
            vertical-align: top;
          }
          a:hover {
            box-shadow: 0 0 25px 10px rgba(145, 92, 182, 0.7);
          }
        `}</style>
      </a>
    );
  }
}

export default SlackButton;
