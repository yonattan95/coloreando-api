const express = require('express');
const { colorsRouter } = require('./features/colors/colors.controller');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use('/api/v1', colorsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen('3001', () => {
  console.log('running on port 3001');
})

