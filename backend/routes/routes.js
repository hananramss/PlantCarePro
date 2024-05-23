const express = require('express');
const router = express.Router();

const moistureController = require('../controller/moistureController');
const relayController = require('../controller/relayController');
const reminderController = require('../controller/reminderController');
const signUpController = require('../controller/signUpController');


router.get('/getAllMoistureLevel', moistureController.getAllMoistureLevel);
router.post('/saveMoisture', moistureController.saveMoisture);

router.get('/getAllControlRelay', relayController.getAllControlRelay);
router.post('/saveControlRelay', relayController.saveControlRelay);

router.get('/getAllReminder', reminderController.getAllReminder);
router.post('/saveReminder', reminderController.saveReminder);

//register
router.get('/getAllAdmin', signUpController.getAllAdmin);
router.post('/registerAdmin', signUpController.registerAdmin);

//login
router.post('/loginAdmin', signUpController.loginAdmin)

//logout
router.get('/logoutAdmin', signUpController.logoutAdmin)

module.exports = router;