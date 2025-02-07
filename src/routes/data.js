const { Router } = require('express');
const { SupabaseController } = require('../controllers/data');
const { SupabaseModel } = require('../models/SupabaseModel');

const createDataRouter = () => {
  const dataRouter = Router();
  const model = new SupabaseModel();
  const controller = new SupabaseController(model);

  dataRouter.get('/', controller.getTable);
  dataRouter.get('/optional', controller.getOptionalTable)
  dataRouter.get('/search', controller.searchData)
  dataRouter.post('/', controller.sendData);
  dataRouter.patch('/:id', controller.update);
  dataRouter.delete('/:tableName/:id', controller.delete);

  return dataRouter;
};

module.exports = { createDataRouter };