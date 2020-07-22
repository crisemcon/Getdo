const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const auth = require('../middleware/authMiddle');
const {check} = require('express-validator');
//Create tags
// api/tags
router.post('/',
	auth,
	tagController.createTag
)

router.get('/',
	auth,
	tagController.getTags
)

router.put('/:id',
	auth,
	tagController.updateTag
)

router.delete('/:id',
	auth,
	tagController.deleteTag
)



module.exports = router;