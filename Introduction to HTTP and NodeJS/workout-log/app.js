const express = require('express');
const handlebars = require('express-handlebars');
const initData = require('./data');
const bodyParser = require('body-parser');
const workoutLogRouter = require('./routes/workout-log-route');

initData();
const app = express();
const port = 3000;

app.engine('.hbs', handlebars({
   extname: '.hbs',
   partialsDir: './views/partials/',
}));
app.set('view engine', '.hbs');
app.set('views', './views/');

app.use((req, res, next) => {
   console.log(Date.now());
   next();
});

app.use(express.static('./public/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/workoutlog', workoutLogRouter);

app.get('/', (req, res) => {
   res.send('Hello World');
});

app.listen(port, () => {
   console.log(`Server started ... at port ${port}`);
});

