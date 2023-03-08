const express = require('express');
const router = express.Router()
const {find} = require("./test1.js");

router.use('/test',find)


module.exports = router;