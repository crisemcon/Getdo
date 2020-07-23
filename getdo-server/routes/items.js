const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/authMiddle');
const {check} = require('express-validator');
//Create items
// api/items
router.post('/',
	auth,
	itemController.createItem
)

router.get('/',
	auth,
	itemController.getItems
)

router.put('/:id',
	auth,
	itemController.editItem
)

router.delete('/:id',
	auth,
	itemController.deleteItem
)



module.exports = router;