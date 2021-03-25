const logger = require('pino')({
  prettyPrint: true,
  enabled: false
});
module.exports.logger = logger;