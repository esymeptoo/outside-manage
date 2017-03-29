import passport from 'koa-passport';
// import AccountModel from '../models/account';
import UserModel from '../models/user'

passport.serializeUser((user, done) => {
  done(null, user.ID)
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
})

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
  UserModel.verify(username, password)
    .then((result) => {
      if (result != null) {
        done(null, result.code === -1 ? -1 : result.user);
      } else {
        done(null, false);
      }
    })
}));
