/*jslint esversion:6*/
const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

let app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
  });
  
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
  });

//use 3rd add-on



app.use( (req,res,next) => {
    let now = new Date().toString();
    let log = `${now} : ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log',log + '\n', err => {
        if(err) {
            console.log('Unable to append to server.log')
        }
    });

    next();
})

app.use( (req,res,next) => {
    res.render('mainteinance.hbs',{
        pageTitle:'Back soon',
        message: 'we are working on it',
    });
});

app.use(express.static(__dirname + '/public')) //dirname is automatic set root


app.get('/',(req, res) => {
    res.render('home.hbs',{
        pageTitle:'HomePage',
        message: 'Welcome!',
    });
})

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle:'About Page',
        message: 'See my info',
    })
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage:'Bad Request'
    });
});


app.listen(3000,() => console.log('listening on port 3000'));