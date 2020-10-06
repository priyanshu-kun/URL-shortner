const express = require("express");
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require("shortid");
const config = require("config");
const URL = require("../DB/model/url");

router.use(express.urlencoded({ extended: false }))

/*
    @route PORT /api/url/shorten
    @desc Create short URL
*/

router.post('/shorten',async (req,res) => {
    const {longUrl} = req.body;

    const baseUrl = config.get("baseURL");


    // check base url mean page url
    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json("Invalid base URL");
    }

    // create url code aka user submitted url
    const urlCode = shortId.generate();

    // check long url
    if(!validUrl.isUri(longUrl)) {
        return res.status(401).json("Invalid long URL");
    }

    try {
        let url = await URL.findOne({ longUrl })

        if(url) {
            return res.json(url);
        }
        else {
            
            const shortUrl = baseUrl + '/' + urlCode;

            url = new URL({
                longUrl,
                shortUrl,
                urlCode,
                date: new Date()
            });

            url.save();

            res.json(url)
        }


    }
    catch(e) {
        console.error(e)
        res.status(500).json("Server error");
    }


})


module.exports = router;