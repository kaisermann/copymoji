const { version, domain } = require('./package.json');
const BASE_URL = process.env.NODE_ENV === 'production' ? `//${domain}` : '';

const CACHE_BUST_ID = `${version}${Math.random() * 10000}`;

module.exports = {
  self: true,
  ...require('./app.json'),
  emojis: require('./emojis.json'),
  base_url: BASE_URL,
  asset(assetPath) {
    return `${BASE_URL}/${assetPath}?c=${CACHE_BUST_ID}`;
  },
};
