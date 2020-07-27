
const express = require('express');
const router = express.Router();

const { auth } = require("../middleware/auth");


const { Comment } = require("../models/Comment");


//=================================
//             Comment
//=================================



// #15 comment api
router.post('/saveComment', (req, res) => {
    
    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })
        
        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
});

// #16 13:00 /api/comment/getComments
router.post('/getComments', (req, res) => {
    
    Comment.find({"postId": req.body.videoId })
        .populate('writer')
        .exec((err, comments) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, comments })
        })



});
 



module.exports = router;
