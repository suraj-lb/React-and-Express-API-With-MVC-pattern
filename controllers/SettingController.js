const SettingModel = require('../models/SettingModel');
var config = require('../config/config');

module.exports = {
  create: (req, res) => {
    let setting = new SettingModel({
      privacy_policy: '',
      terms_and_condition: '',
      about_us: '',
    })
    setting.save()
    .then( result => {
      res.status(200).json({ "status": true, "message": "Setting created successfully" });
    })
    .catch(err =>{
      res.status(500).json({"status": false, "messgae": err});
    })
  },
  fetchSettings: (req, res) => {
    SettingModel.findById('5ec652bae364d407f45e4e0b', function(err, setting){
        if (err) return res.status(400).send({ success: false, message: 'Something went wrong' });
        return res.status(200).send({ success: true, setting: setting, message: 'setting fetch successfully.' });
    })
  },
  saveSettting: (req, res) => {
    var token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });

    config.jwt.verify(token, config.secretToken, function (err, decoded) {
        if (err) return res.status(400).send({ success: false, message: 'token expired please login again' });
        var filter = { _id: '5ec652bae364d407f45e4e0b' };
        var update = { };
        if (req.body.privacy_policy) update.privacy_policy = req.body.privacy_policy;
        if (req.body.terms_and_condition) update.terms_and_condition = req.body.terms_and_condition;
        if (req.body.about_us) update.about_us = req.body.about_us;
        SettingModel.findByIdAndUpdate('5ec652bae364d407f45e4e0b', update, function (err, setting) {
            if (err) return res.status(400).send({ success: false, message: 'Something went wrong' });
            return res.status(200).send({ success: true, message: 'setting updated successfully.' });
        });
    });
  }
}
