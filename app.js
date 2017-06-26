const express = require('express');


const app = express();


// tells Express that our view files are in the "views/" folder
//                                                 |
//                  --------------------------------
//                  |
app.set('views', 'views');
               // ⇑⇑⇑ (if your folder is called "views/" then it's optional)


        // imports the "ejs" package and allows us to use EJS view files
app.set('view engine', 'ejs');



// Morgan middleware
const morgan = require('morgan');

// console.logs information about the connection
app.use(morgan('dev'));


app.use((req, res, next) => {
  console.log('OUR MIDDLEWARE 🤖🎩');

  req.pizza = '🍕🍪🇵🇷';

  next();
});


// tells Express that our static files are inside the "public/" folder
app.use(express.static('public'));



// LAYOUT RELATED STUFF ⇣⇣⇣ ----------------------------------------------------

const expressLayouts = require('express-ejs-layouts');

// tells Express that we want to use the EJS layouts package in our app
app.use(expressLayouts);

// tells Express that our layout file is "views/layout.ejs"
//                                                 |
//                    ------------------------------
//                    |
app.set('layout', 'layout.ejs');
                  // ⇡⇡⇡ (if your layout file is called "layout.ejs" then it's optional)

// STUFF RELATED TO LAYOUTS ⇡⇡⇡ ------------------------------------------------



// POST BODY PARSER RELATED STUFF ↧↧↧ -----------------------------------------

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// STUFF RELATED TO POST BODY PARSING ↥↥↥ -------------------------------------



// ROUTES GO HERE ☟☟☟ --------------------------------------------------------

app.get('/', (req, res, next) => {
  // display "views/home-page-view.ejs"
  res.render('home-page-view.ejs');
});


// STEP #1 of our search form submission
app.get('/search', (req, res, next) => {
  console.log('In the /search route ' + req.pizza);
                      //                    |
                      // comes from the middleware on line 30

  // display "views/search-form-view.ejs"
  res.render('search-form-view.ejs');
});

// STEP #2 of our search form submission
// <form method="get" action="/results">
//                |               |
//   --------------               |
//   |       ----------------------
//   |       |
app.get('/results', (req, res, next) => {
  // req.query refers to the data in the "query string"  ( ?food=pizza&price=888 )

  // With a query string like "?searchTerm=best+computer&interestThing=on" you get:
  // req.query = {
  //   searchTerm: 'best computer',
  //   interestThing: 'on'
  // }

           // <input name="searchTerm">
           //                   |
  const myTerm = req.query.searchTerm;
  const myCheckbox = req.query.interestThing;
               //                    |
               // <input name="interestThing">

  if (myCheckbox === 'on') {
    // display "views/pizza-results.ejs"
    res.render('pizza-results.ejs', {
      theSearch: myTerm
    });
  }

  else {
    // display "views/results-view.ejs"
    res.render('results-view.ejs', {
      theSearch: myTerm
    });
  }
});



// STEP #1 of our LOGIN form submission
app.get('/login', (req, res, next) => {
  // display "views/login-form-view.ejs"
  res.render('login-form-view.ejs');
});

// STEP #2 of our LOGIN form submission
// <form method="post" action="/check-login">
//                |                  |
//   --------------                  |
//   |       -------------------------
//   |       |
app.post('/check-login', (req, res, next) => {
             // <input name="emailValue">
             //                  |
  const userEmail = req.body.emailValue;
  const userPass = req.body.passwordValue;
            //                   |
            // <input name="passwordValue">

  if (userEmail === 'a@a.a' && userPass === 'swordfish') {
    res.render('welcome-view.ejs');
  }

  else {
    res.render('go-away-view.ejs');
  }
});

// HERE GO ROUTES ☝︎☝︎☝︎ --------------------------------------------------------



app.listen(3000);
