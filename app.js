const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); 

const { result } = require('lodash');
const { urlencoded } = require('express');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

//var env = process.env.NODE_ENV || 'development';
var config = require('./config');

const app = express();
const dbName = config.database.name;
const dbPasword = config.database.password;
//connect to MongoDB
const dbURI = 'mongodb+srv://aigeas:test123@nodetuts.8p0s2.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useUnifiedTopology: true, useNewUrlParser: true})
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log('a big error ¨:'+err));

//register view engine
app.set('view engine', 'ejs');

//listen for request
app.listen(3000);

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded( {extended: true}));
app.use(morgan('dev')); 

const laptop = 'The 15.6-inch display has narrow bezels on three sides, though the one on the bottom is still quite thick, with “Omen” spelled out in white. The keyboard and deck are also gray. The deck is made of aluminum, with “015” and “Designed and engineered by HP” printed on the bottom right. (The number seems to ape Alienware, which has been doing similar things on its lids. The latter statement is much like what Apple prints in tiny fonts on its products.) The aluminum deck and keyboard frame make it feel solid where you need it most.';

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog for the war',
        snippet: 'HP Omen 15',
        body: laptop
    });

    blog.save()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
    Blog.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('5f63e35b50043a4b3420e4d4')
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
    // var blogs = [
    //     {titleb: 'first blog', snippet: 'first snippet'},
    //     {titleb: 'second blog', snippet: 'second snippet'},
    //     {titleb: 'third blog', snippet: 'third snippet'}
    // ];
    // //res.send('<p>home page</p>');
    // //res.sendFile('./views/index.html', {root: __dirname});
    // res.render('index', {title: 'home', blogs});
});

app.get('/about', (req, res) => {
    //res.send('<p>home page</p>');
    //res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', {title: 'about'});
});

app.use('/blogs', blogRoutes);


app.use((req, res) => {
   // res.status(404).sendFile('./views/404.html', {root: __dirname});
   res.status(404).render('404');
});
