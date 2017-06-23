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



// ROUTES GO HERE ☟☟☟ --------------------------------------------------------

app.get('/', (req, res, next) => {
  // display "views/home-page-view.ejs"
  res.render('home-page-view.ejs');
});


// STEP #1 of our search form submission
app.get('/search', (req, res, next) => {
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

  // display "views/results-view.ejs"
  res.render('results-view.ejs');
});

// HERE GO ROUTES ☝︎☝︎☝︎ --------------------------------------------------------



app.listen(3000);
