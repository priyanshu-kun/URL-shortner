const express = require("express");
const URL = require("../DB/model/url");
const router = express.Router();
router.use(express.urlencoded({ extended: false }))




/*
    @route GET /url/:code
    @desc redirect the user to the original url
*/


router.get("/:code",async (req,res) => {
    try {
        const mainUrl = await URL.findOne({ urlCode: req.params.code })
        if(mainUrl) {
           return  res.redirect(mainUrl.longUrl);
        }
        else {
           return res.status(404).send("Url not found");
        }
    }
    catch(e) {
        res.status(500).send("Internal server Error");
    }

})



module.exports = router;