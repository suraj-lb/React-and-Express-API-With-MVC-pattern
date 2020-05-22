var express = require('express');
var router = express.Router();
var multer = require('multer')
const DIR = './uploads/users';
var path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, DIR);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Schema
const UserController = require('../controllers/UserController')

// Home page route.
router.get('/create',UserController.create);

// authenticate API.
router.post('/authenticate', UserController.authenticate)

// User Profile
router.get('/user-profile', UserController.profile)

// User Profile update
router.post('/profile-update', UserController.update)

// Change Password
router.post('/change-password', UserController.changePassword)

// profile pic upload
router.post('/upload-profile', upload.single('profile_pic'), UserController.uploadProfile)

//Token verify
router.get('/verify-token', UserController.tokenVerification)

// Logout API
router.post('/logout', function (req, res) {
    return res.status(200).json({ success: true, token: null, message: 'You have logout successfully.' });
})

module.exports = router;
