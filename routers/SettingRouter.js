const express = require('express');
const router = express.Router();

const SettingController  = require('../controllers/SettingController')

// Fetch Settings
router.get('/', SettingController.fetchSettings)

//create Setting
router.get('/create', SettingController.create)

//save setting
router.post('/save-setting', SettingController.saveSettting)
module.exports = router;
