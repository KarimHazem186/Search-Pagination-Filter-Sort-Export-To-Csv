const express = require('express');
const router = new express.Router();
const controllers = require('../Controllers/usersControllers')
const upload = require('../multerconfig/storageConfig')
// routes
router.post("/user/register",upload.single("user_profile"),controllers.register)
// router.post("/user/register",(req,res)=>{

// })

router.get("/user/details",controllers.getAllUsers)

router.get("/user/:id",controllers.getSingleUser)

router.put("/user/edit/:id",upload.single("user_profile"),controllers.useredit)

router.delete("/user/delete/:id",controllers.userdelete)

router.put("/user/status/:id",controllers.userstatus);

router.get("/userexport",controllers.userExport)

module.exports = router