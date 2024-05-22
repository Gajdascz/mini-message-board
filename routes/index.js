import e from 'express';
const router = e.Router();

const messages = [
  {
    text: 'Hi There!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Mini Message Board', messages });
});

router
  .get('/new', function (req, res, next) {
    res.render('form', { title: 'New Message Form' });
  })
  .post('/new', function (req, res, next) {
    messages.push({ text: req.body.messageInput, user: req.body.nameInput, added: new Date() });
    res.redirect('/');
  });

export default router;
