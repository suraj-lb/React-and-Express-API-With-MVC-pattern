const UserModel = require('../models/UserModel');
var config = require('../config/config');

module.exports = {
    create: (req, res) => {
        let user = new UserModel({
            "first_name": "Admin",
            "last_name": "Panel",
            "email": "admin@gmail.com",
            "address": "",
            "phone": "9534033101",
            "password": config.md5("123456"),
            "profile_pic": "",
            "role": "Admin"
        });

        user.save()
            .then(result => {
                res.status(200).json({ "status": true, "message": "Admin created successfully" });
            })
            .catch(err => {
                res.status(500).json({ "status": false, "messgae": err });
            })
    },
    authenticate: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let role = req.body.role;
        if (!req.body.email) {
            return res.status(400).json({ "success": false, "message": "Email field can not blank." })
        }
        if (!req.body.password) {
            return res.status(400).json({ "success": false, "message": "Password field can not blank." })
        }
        if (!req.body.role) {
            return res.status(400).json({ "success": false, "message": "Role field can not blank." })
        }
        UserModel.findOne({ "email": email, "role": role }, function (error, user) {
            if (user) {
                var encrypt_pass = config.md5(password);
                if (encrypt_pass === user.password) {
                    var token = config.jwt.sign({
                        'id': user.id,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                    }, config.secretToken, { expiresIn: '2h' });
                    return res.status(200).json({ "success": true, "accessToken": token, "message": "user logged in successfully." });
                }
                else {
                    return res.status(400).json({ "success": false, "message": "Password is not correct" })
                }
            }
            else {
                return res.status(401).json({ "success": false, "message": "Unauthorised admin." })
            }
        })
    },
    profile: (req, res) => {
        var token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });

        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) return res.status(400).send({ success: false, message: 'token expired please login again' });
            UserModel.findById(decoded.id, function (err, result) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!result) return res.status(404).send({ success: false, message: "No user found." });
                return res.status(200).send({ success: true, users: result, message: 'Profile fetch successfully.' }); //Comment this out!
            });
        });
    },
    update: (req, res) => {
        var token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });

        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) return res.status(400).send({ success: false, message: 'token expired please login again' });
            UserModel.findByIdAndUpdate(decoded.id, req.body, function (err, post) {
                if (err) return res.status(400).send({ success: false, message: 'Something went wrong.' });
                return res.status(200).send({ success: true, users: req.body, message: 'Profile updated successfully.' });
            });
        });
    },
    changePassword: (req, res) => {
        var token = req.headers.authorization.split(' ')[1];
        let new_password = req.body.new_password;
        let confirm_password = req.body.confirm_password;

        if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });

        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) return res.status(400).send({ success: false, message: 'token expired please login again' });
            else if (new_password !== confirm_password) {
                return res.status(400).send({ success: false, message: 'New and Confirm password is not matched.' });
            }
            else {
                UserModel.findByIdAndUpdate(decoded.id, { password: config.md5(new_password) }, function (err, post) {
                    if (err) return res.status(400).send({ success: false, message: 'Something went wrong.' });
                    return res.status(200).send({ success: true, message: 'Password updated successfully.' });
                });
            }
        });
    },
    uploadProfile: (req, res, file) => {
        var token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });
        var img = {
            profile_pic: req.file.path
        }
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) return res.status(400).send({ success: false, message: 'token expired please login again' });
            UserModel.findByIdAndUpdate(decoded.id, img, function (err, result) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!result) return res.status(404).send({ success: false, message: "No user found." });
                res.status(200).send({ success: true, message: 'Profile pic updated successfully.' }); //Comment this out!
            });
        });
    },
    tokenVerification: (req, res) => {
        var token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) return res.status(400).send({ success: false, message: 'token expired please login again' });
            return res.status(200).send({ success: true, users: decoded, message: 'Token verified successfully.' });
        })
    }

}
