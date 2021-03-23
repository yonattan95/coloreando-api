const { Router } = require("express");
const objToXml = require('object-to-xml');
const { getColors, getColorById, saveColor } = require("./colors.service");

const router = Router();

router.get('/colores', async (req, res) => {
  const { page, rowsPerPage, xml } = req.query;
  if (isNaN(page) || isNaN(rowsPerPage)) {
    res.status(400).json({
      message: 'Parametros incorrectos'
    });
    return;
  }
  const colors = await getColors(page, rowsPerPage);
  if (colors instanceof Error) {
    //para enviar errores
    console.log(colors);
    res.status(500).json({
      message: 'Ocurrio un error'
    });
    return;
  }
  if (xml === "true") {
    res.type('application/xml');
    res.status(200).send(objToXml({
      '?xml version=\"1.0\" encoding=\"utf-8\"?': null,
      colors: { color: colors },
      page,
      rowsPerPage,
      total: colors.length
    }));
  } else {
    res.status(200).json({
      colors,
      page,
      rowsPerPage,
      total: colors.length
    });
  }
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
    console.log(color);
    res.status(500).json({
      message: 'Ocurrio un error'
    });
    return;
  }
  if (color === null) {
    res.status(204).json({ message: 'No se encontro el color' });
  } else {
    if (xml === "true") {
      res.type('application/xml');
      res.status(200).send(objToXml({
        '?xml version=\"1.0\" encoding=\"utf-8\"?': null,
        color,
      }));
    } else {
      res.status(200).json({ color });
    }
  }
});


router.post('/color', async (req, res) => {
  const colorRaw = req.body;
  const { xml } = req.query;
  console.log(colorRaw);
  const newColor = await saveColor(colorRaw);
  if (newColor instanceof Error) {
    //para enviar errores
    console.log(newColor);
    res.status(500).json({
      message: 'Ocurrio un error'
    });
    return;
  }
  if (newColor === null) {
    res.status(204).json({ message: 'No se pudo guardar el color' });
  } else {
    if (xml === "true") {
      res.type('application/xml');
      res.status(200).send(objToXml({
        '?xml version=\"1.0\" encoding=\"utf-8\"?': null,
        color: newColor,
      }));
    } else {
      res.status(201).json({ color: newColor });
    }
  }
});

module.exports.colorsRouter = router;