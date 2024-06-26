import e from 'express';
import createHttpError from 'http-errors';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const app = e();
const __dirname = import.meta.dirname;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(e.json());
app.use(e.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(e.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createHttpError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
