const { register, login, setAvatar, getalluser } = require("../controllers/usercontroller")

const router =require("express").Router()

router.post("/register",register)
router.post("/login",login)
router.post("/avatar/:id", setAvatar);
router.get("/allusers/:id",getalluser)
module.exports = router