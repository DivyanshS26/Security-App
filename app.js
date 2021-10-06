if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const seedDb = require('./seed');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.Api_key);
const flash = require('connect-flash');
const session = require('express-session');


mongoose.connect(process.env.Mongo_Url)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'security assets',
    resave: false,
    saveUninitialized: true
}))

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

const securityRoutes = require('./routes/securityRoute');

// seedDb();


app.get('/', (req, res) => {
    res.render('home');
})

app.get('/error', (req, res) => {
    res.render('error');
})

app.use(securityRoutes);

app.listen(process.env.PORT || 2323, () => {
    console.log("Server started at 2323");
})