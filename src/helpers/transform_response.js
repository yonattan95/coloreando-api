const objToXml = require('object-to-xml');
const { logger } = require("./logger");

function transformObjectToResponse(res, data, format = "json") {
  if (format === "json") {
    res.status(200).json(data);
  } else if (format === "xml") {
    res.type('application/xml');
    res.status(200).send(objToXml({
      '?xml version=\"1.0\" encoding=\"utf-8\"?': null,
      ...data,
    }));
  } else {
    logger.error(data);
    logger.error(format);
    res.status(500);
  }
}

module.exports.transformObjectToResponse = transformObjectToResponse;