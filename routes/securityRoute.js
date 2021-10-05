const express = require('express');
const router = express.Router();
const Security = require('../models/Security');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.Api_Key);

// get the info of the person
router.get('/security', async (req, res) => {
    try {
        const person = await Security.find({});
        res.render('security/index', { person });
    } catch (e) {
        req.flash('error', 'oops,something went wrong');
        res.redirect('/error')
    };
})


// get new entry
router.get('/security/new', async (req, res) => {

    try {
        res.render('security/new');
    } catch (e) {
        req.flash('error', 'oops,something went wrong');
        res.redirect('/error')
    };
})

// creating a new entry
router.post('/security', async (req, res) => {

    try {
        const newPerson = {
            ...req.body
        }
        // console.log(isNaN(newPerson.phone));
        if (isNaN(newPerson.phone)) {
            req.flash('error', 'Enter a valid Phone number');
            res.redirect('/security/new')
        }else{
            
        let date_ob = new Date();

        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();

        let dateandtime = date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds

        // prints date & time in YYYY-MM-DD HH:MM:SS format
        // console.log(dateandtime);

        const msg = {
            to: `${newPerson.email}`,
            from: "atozs2650@gmail.com",
            subject: "Checked-in successfully",
            text: `Hello ${newPerson.name}, you checked-in at ${dateandtime}.`
        };
        // sgMail.send(msg);

        await Security.create(newPerson);
        req.flash('success', 'New Entry created Successfully!!')
        req.flash('success', 'Mail Sent!')
        res.redirect('/security');

        }
    } catch (e) {
        req.flash('error', 'check if your mail is valid or phone number should be 10 digits');
        res.redirect('/error')
    };
})

// show info about a particular entry
router.get('/security/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const person = await Security.findById(id);
        res.render('security/show', { person });
    } catch (e) {
        req.flash('error', 'oops,something went wrong');
        res.redirect('/error')
    };
})

// updating the data with given entry
router.get('/security/:id/edit', async (req, res) => {

    try {
        const { id } = req.params;
        const person = await Security.findById(id);
        res.render('security/edit', { person });
    } catch (e) {
        req.flash('error', 'oops,something went wrong');
        res.redirect('/error')
    };
})

// updating the entry with the new info
router.patch('/security/:id', async (req, res) => {

    try {
        const updateData = req.body;
        const { id } = req.params;
        await Security.findByIdAndUpdate(id, updateData);
        res.redirect(`/security/${id}`);
        req.flash('success', 'Updated the entry')
    } catch (e) {
        req.flash('error', 'oops,check if phone number is 10 digits');
        res.redirect('/error')
    };
})

// checking out
router.delete('/security/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const newPerson = await Security.findById(id);

        let date_ob = new Date();

        let date = ("0" + date_ob.getDate()).slice(-2);

        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        let year = date_ob.getFullYear();

        let hours = date_ob.getHours();

        let minutes = date_ob.getMinutes();

        let seconds = date_ob.getSeconds();

        let dateandtime = date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds


        const msg = {
            to: `${newPerson.email}`,
            from: "atozs2650@gmail.com",
            subject: "Checked-out successfully",
            text: `Hello ${newPerson.name}, you checked-out at ${dateandtime}.`
        };
        // sgMail.send(msg);
        req.flash('success', 'Checked Out Succesfully')
        await Security.findByIdAndDelete(id);
        res.redirect('/security');

    } catch (e) {
        req.flash('error', 'oops,something went wrong');
        res.redirect('/error')
    };
})


module.exports = router;