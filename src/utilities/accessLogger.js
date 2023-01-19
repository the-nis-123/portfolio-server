const rfs = require('rotating-file-stream');
const path = require('path');

const absolutePath = path.resolve('./');

module.exports = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(absolutePath, 'logs/access')
});