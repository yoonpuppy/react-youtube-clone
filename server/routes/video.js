const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require('multer');

// #5 9:00
// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
            cb(null, true)
        }
    }
});

const upload = multer({ storage: storage }).single("file");


//=================================
//             Video
//=================================

// #5 6:00
// req 보낸 게 index.js 로 감 -> 다시 video 로 보냄
// req : client 로 보낸 파일, 가져옴
router.post('/uploadfiles', (req, res) => {
    // client 에서 받은 비디오를 저장
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })
})


module.exports = router;
