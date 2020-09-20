const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { blog_index_post } = require('../controllers/blogController');


router.get('/', blogController.blog_index);
router.post('/', blogController.blog_index_post);
router.get('/create', blogController.blog_create);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.delete_blog);

module.exports = router;