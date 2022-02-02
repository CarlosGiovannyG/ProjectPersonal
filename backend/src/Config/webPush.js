const webpush = require('web-push');
const keys = require('../keys')

webpush.setVapidDetails(
  'mailto:cgiog82@gmail.com',
  keys.PUPLIC_KEY,
  keys.PRIVATE_KEY
);

module.exports = webpush;
 