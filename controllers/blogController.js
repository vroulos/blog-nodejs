const Blog = require('../models/blog');

const blog_index = (req, res) => {
        Blog.find()
        .then((result) => {
            res.render('blogs/index', { title: 'All blogs', blogs: result});
        })
        .catch((err) => {
            console.log(err);
        })
}

const blog_index_post = (req,res) => {
    console.log(req.body);
    const blog = new Blog(req.body);

    blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_create = (req, res) => {
  res.render('blogs/create', {title:'create blog'});
}

const blog_details = (req, res) => {
  const id = req.params.id;

  Blog.findById(id).
  then(result => {
      res.render('blogs/details', { blog: result, title: 'Blog Details' } );
  }).catch((err) => {
      res.status(404).render('404', {title: 'the blog does not exist'});
  });
  console.log(id);
}

const delete_blog = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
      .then(result => {
          res.json({ redirect: '/blogs'});
      })
      .catch(err => {
          console.log(err);
      }); 
}

module.exports = {
    blog_index,
    blog_index_post,
    blog_create,
    blog_details,
    delete_blog
}