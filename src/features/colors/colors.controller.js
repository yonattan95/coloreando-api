const { Router } = require("express");
const { logger } = require("../../helpers/logger");
const { transformObjectToResponse } = require("../../helpers/transform_response");
const { getColors, getColorById, saveColor } = require("./colors.service");

const router = Router();

router.get('/colores', async (req, res) => {
  let { page, rowsPerPage, xml } = req.query;
  page = page !== undefined ? page : 1;
  rowsPerPage = rowsPerPage !== undefined ? rowsPerPage : 6;
  if (isNaN(page) || isNaN(rowsPerPage)) {
    res.status(400).json({
      message: 'Parametros incorrectos'
    });
    return;
  }
  const data = await getColors(page, rowsPerPage);
  if (data instanceof Error) {
    //para enviar errores
    logger.error(data);
    res.status(500).json({
      message: 'Ocurrio un error'
    });
    return;
  }
  const dataToSend = {
    colors: xml === "true" ? { color: data.colors } : data.colors,
    page: parseInt(page),
    rowsPerPage: parseInt(rowsPerPage),
    total: data.total
  };
  const format = xml === "true" ? "xml" : "json";
  transformObjectToResponse(
    res,
    dataToSend,
    format
  );
  // if (xml === "true") {
  //   res.type('application/xml');
  //   res.status(200).send(objToXml({
  //     '?xml version=\"1.0\" encoding=\"utf-8\"?': null,
  //     colors: { color: colors },
  //     page,
  //     rowsPerPage,
  //     total: colors.length
  //   }));
  // } else {
  //   res.status(200).json({
  //     colors,
  //     page,
  //     rowsPerPage,
  //     total: colors.length
  //   });
  // }
});

router.get('/color/:id', async (req, res) => {
  const { id } = req.params;
  const { xml } = req.query;
  if (isNaN(id)) {
    res.status(400).json({
      message: 'Parametros incorrectos'
    });
    return;
  }
  const color = await getColorById(id);
  if (color instanceof Error) {
    //para enviar errores
    logger.error(color);
    res.status(500).json({
      message: 'Ocurrio un error'
    });
    return;
  }
  if (color === null) {
    res.status(204).json({ message: 'No se encontro el color' });
  } else {
    const dataToSend = { color };
    const format = xml === "true" ? "xml" : "json";
    transformObjectToResponse(
      res,
      dataToSend,
      format
    );
  }
});


router.post('/color', async (req, res) => {
  const colorRaw = req.body;
  const { xml } = req.query;
  logger.debug(colorRaw);
  const newColor = await saveColor(colorRaw);
  if (newColor instanceof Error) {
    //para enviar errores
    logger.error(newColor);
    res.status(500).json({
      message: 'Ocurrio un error'
    });
    return;
  }
  if (newColor === null) {
    res.status(204).json({ message: 'No se pudo guardar el color' });
  } else {
    const dataToSend = { color: newColor };
    const format = xml === "true" ? "xml" : "json"
    transformObjectToResponse(
      res,
      dataToSend,
      format
    );
  }
});

module.exports.colorsRouter = router;