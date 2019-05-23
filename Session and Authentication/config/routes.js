const restrictedPages = require('./auth');
const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const carController= require ('../controllers/car')

module.exports = app => {

    app.get('/', homeController.index);
    app.get('/user/register', restrictedPages.isAnonymous, userController.registerGet);
    app.get('/user/login', restrictedPages.isAnonymous, userController.loginGet);
    app.get('/car/add', restrictedPages.hasRole('Admin'), carController.addGet);
    app.get('/car/all', carController.allCars);
    app.get('/car/rent:id', restrictedPages.isAuthed, carController.rentGet);
    app.get('/user/rents', restrictedPages.isAuthed, userController.myRents);
    app.get('/car/edit/:id', restrictedPages.isAuthed, carController.editGet);

    app.post('/user/register', restrictedPages.isAnonymous, userController.registerPost)
    app.post('/user/login', restrictedPages.isAnonymous, userController.loginPost);
    app.post('/user/logout', userController.logout);
    app.post('/car/add', restrictedPages.hasRole('Admin'), carController.addPost);
    app.post('/car/edit/:id', restrictedPages.isAuthed, carController.editPost);
    app.post('/car/rent/:id', restrictedPages.isAuthed, carController.rentPost);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};