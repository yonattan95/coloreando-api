const { db } = require('../../services/db/postgres');
const { ColorDetailResponse } = require('./models/color_detail_reponse');
const ColorResponse = require('./models/color_response');

//por defecto se encuentra en la pagina 1 con 6 registros por consulta
module.exports.getColors = async function (page = 1, rowsPerPage = 6) {
  try {
    const offset = rowsPerPage * (page - 1);
    const res = await db.query("SELECT * FROM colors LIMIT $1 OFFSET $2", [rowsPerPage, offset]);
    const colorsRaw = res.rows;
    const colors = colorsRaw.map(color => new ColorResponse(
      color.id,
      color.name,
      color.color
    ));
    return colors;
  } catch (error) {
    console.log(error);
    return new Error(error.message);
  }
};

module.exports.getColorById = async function (colorId) {
  try {
    const res = await db.query("SELECT * FROM colors WHERE id=$1", [colorId]);
    const colorRaw = res.rows[0];
    if (colorRaw === undefined) {
      return null;
    }
    const color = new ColorDetailResponse(
      colorRaw.id,
      colorRaw.name,
      colorRaw.year,
      colorRaw.color,
      colorRaw.pantone_value
    );
    return color;
  } catch (error) {
    console.log(error);
    return new Error(error.message);
  }
};

module.exports.saveColor = async function (color) {
  try {
    const res = await db.query("INSERT INTO colors(name,year,color,pantone_value) VALUES ($1,$2,$3,$4) RETURNING *", [color.name, color.year, color.color, color.pantone_value]);
    if (res.rowCount === 0) {
      return null;
    }
    return res.rows[0];
  } catch (error) {
    console.log(error);
    return new Error(error.message);
  }
};