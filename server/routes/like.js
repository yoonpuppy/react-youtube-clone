
const express = require('express');
const router = express.Router();

const { auth } = require("../middleware/auth");


const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");


//=================================
//             Like
//=================================



// #19 9:00
router.post('/getLikes', (req, res) => {
    
    let variable = {}

    if(req.body.videoId_) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId}
    }

    Like.find(variable)
        .exec((err, likes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, likes })
        })
});




module.exports = router;