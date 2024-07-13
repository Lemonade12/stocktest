import express from 'express';
const stockController = require('../controllers/stockController');
const searchController = require('../controllers/searchController');

const router = express.Router();

router.get('/stock/token', stockController.getTokenController); // access_token 발급
router.get('/stock/KR/:id', stockController.readKRCurrentPriceController); // 해당 종목 현재가(국내)
router.get('/stock/US/:id', stockController.readUSCurrentPriceController); // 해당 종목 현재가(미국)
router.get('/stock/search', searchController.getSearchListController);

module.exports = router;
