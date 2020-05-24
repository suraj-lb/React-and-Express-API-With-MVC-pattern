const express = require('express')
const router = express.Router();

const BlogController  = require('../controllers/BlogController')

// Fetch Blogs
router.get('/', BlogController.getBlogs)

//create Blog
router.post('/save-blog', BlogController.create)

//Get Blog By ID 
router.get('/:blogId', BlogController.getBlogsById)

//Get Blog By ID 
router.post('/update-blog/:blogId', BlogController.updateBlog)

//Delete Blog
router.delete('/delete-blog/:blogId', BlogController.deleteBlog)

module.exports = router;
