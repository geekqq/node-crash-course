const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')
// express app
const app = express();
// connect to mongodb
const dbURI = 'mongodb+srv://anhjwdn:afwJzqRPqCQQQi2o@nodetuts.em4gchv.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI).then(() => {
    console.log('Connected to DB');
    app.listen(3000);

}).catch((err) => {
    console.log(err)
});

//register view engine
app.set('view engine', 'ejs');

// listen for request only if connected to DB
// app.listen(3000);
// middleware & static files;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));


// mongoose and mongo sandbox routes

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new 2',
//         body: 'more about my new blog 2'
//     });
//     blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });

app.get('/single-blog', (req, res) => {
    Blog.findById('65d18cbf09cc16192cd257d2')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

// app.use((req, res, next) => {
//     console.log('New request made:');
//     console.log('Host: ', req.hostname);
//     console.log('Path: ', req.path);
//     console.log('Method: ', req.method);
//     next();
// });
// app.use((req, res, next) => {
//     console.log('in the next middleware:');
//     next();
// });
app.get('/', (req, res) => {
    //res.send('<p>home page</p>');
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    // ];
    // res.render('index', { title: 'Home', blogs });
    res.redirect('blogs');
});
app.get('/about', (req, res) => {
    //res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
// app.get('/about-us', (res, req) => {
//     res.redirect('/about', { title: 'Home' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page has to come to last!
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});