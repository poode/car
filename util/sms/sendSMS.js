const { WebClient } = require('@slack/client');
const { logger } = require('../../config/logger');


async function sms(text) {
  const token = process.env.SLACK_TOKEN;
  const web = new WebClient(token);
  const conversationId = process.env.CHANNEL_ID;
  const result = {
    sent: '',
    error: '',
  };
  const res = await web.chat.postMessage({ channel: conversationId, text });
  if (res.data) {
    const error = JSON.stringify(res.data);
    result.error = { message: error, status: 406 };
    return result;
  }
  result.sent = res.ts;
  return result;
}

module.exports = {
  sms,
};
