const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

//Use common error handler for catching any kind of exceptions, if we are using async and await
const { catchErrors } = require('../handlers/errorHandlers');
// Do work here
//router.get('/', storeController.middleWare ,storeController.homePage);
router.get('/', storeController.getStores);
router.get('/stores', catchErrors(storeController.getStores));

//Shows a form to save store data
router.get('/add', catchErrors(storeController.addStore));

router.post('/add', catchErrors(storeController.createStore));

router.post('/add/:id', catchErrors(storeController.updateStore));

router.get('/store/:id/edit', storeController.editStore);

module.exports = router;
