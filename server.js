const path = require('path');
const express = require('express');
// Import express-session
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const routes = require('./controllers');
const sequelize = require('./config/connection');
//const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;



const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});


const hbs = exphbs.create({});
//templates
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



app.use(express.json());

//to collect data that sent from the user
app.use(express.urlencoded({ extended: true }));

//css, imgs, js
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
