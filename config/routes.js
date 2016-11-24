var express = require('express');
var router = express.Router();


//********* Controller *************//

var macLipstickController = require("../controllers/macLipstickController");
var usersController = require("../controllers/usersController");
var authenticationsController = require("../controllers/authenticationsController");


//******* Routes ***********//

router.route('/login').post(authenticationsController.login);
router.route('/register').post(authenticationsController.register);
router.route('/mac').get(macLipstickController.lipsticks);
router.route('/users').get(usersController.index);
router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update);


module.exports = router;
