const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/HomeController')


const app = express()



router.get('/', HomeController.index)



module.exports = router