const { register } = require("../controllers/usercontroller")

const router =require("express").Router()

router.post("/register",register)

module.exports = router