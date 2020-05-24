const BlogModel = require('../models/BlogModel');
const config = require('../config')

module.exports = {
    getBlogs: (req, res) => {
        var token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });

        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) return res.status(400).send({ success: false, message: 'token expired please login again' });
            BlogModel.find(function (err, blogs) {
                if (err) return res.status(400).send({ success: false, message: 'Something went wrong' });
                return res.status(200).send({ success: true, blog: blogs, message: 'setting fetch successfully.' });
            })
        })
    },
    create: (req, res) => {
        var token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });

        config.jwt.verify(token, config.secretToken, function (err, decoded) {
        let blog = new BlogModel({
            title: req.body.title,
            description: req.body.description,
        })
        blog.save()
            .then(result => {
                res.status(200).json({ "status": true, "message": "Blog saved successfully" });
            })
            .catch(err => {
                res.status(500).json({ "status": false, "messgae": err });
            })
        })
    },
    getBlogsById: (req, res) => {
        var token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });

        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            let id = req.params.blogId;
            BlogModel.findById(id, function(err, blog){
                if (err) return res.status(400).send({ success: false, message: 'Something went wrong' });
                return res.status(200).send({ success: true, blog: blog, message: 'Blog fetch successfully.' });
            })
        })
    },
    updateBlog: (req, res) => {
        var token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });
        var update = { };
        var id = req.params.blogId
        if (req.body.title) update.title = req.body.title;
        if (req.body.description) update.description = req.body.description;
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            let id = req.params.blogId;
            BlogModel.findByIdAndUpdate(id, update, function(err, blog){
                if (err) return res.status(400).send({ success: false, message: 'Something went wrong' });
                return res.status(200).send({ success: true, message: 'Blog updated successfully.' });
            })
        })
    },
    deleteBlog: (req, res) => {
        var token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });
        var id = req.params.blogId
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            let id = req.params.blogId;
            BlogModel.findByIdAndDelete(id, function(err, blog){
                if (err) return res.status(400).send({ success: false, message: 'Something went wrong' });
                return res.status(200).send({ success: true, message: 'Blog deleted successfully.' });
            })
        })
    }
}