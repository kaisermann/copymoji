const { domain } = require('./package.json');
const BASE_URL = process.env.NODE_ENV === 'production' ? `//${domain}` : '';

module.exports = {
  self: true,
  ...require('./app.json'),
  emojis: require('./emojis.json'),
  base_url: BASE_URL,
  asset(assetPath) {
    return `${BASE_URL}/${assetPath}?c=${Math.random() * 10000}`;
  },
};
