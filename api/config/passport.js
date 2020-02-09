const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../sequelize').User;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const BCRYPT_SALT_ROUNDS = 12;
const jwtStrategyOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.JWT_SECRET,
};

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});



// passport.use(
//   'register',
//   new localStrategy(
//     {
//       usernameField: 'username',
//       passwordField: 'password',
//       session: false,
//     },
//     (username, password, done) => {
//       try {
//         User.findOne({
//           where: {
//             username: username,
//           },
//         }).then(user => {
//           if (user != null) {
//             console.log('username already taken');
//             return done(null, false, { message: 'username already taken' });
//           } else {
//             bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
//               User.create({ username, password: hashedPassword }).then(user => {
//                 console.log('user created');
//                 // note the return needed with passport local - remove this return for passport JWT to work
//                 return done(null, user);
//               });
//             });
//           }
//         });
//       } catch (err) {
//         done(err);
//       }
//     },
//   ),
// );

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      try {
        User.findOne({
          where: {
            email: email,
          },
        }).then(user => {
          if (user === null) {
            return done(null, false, { message: 'bad email' });
          } else {
            bcrypt.compare(password, user.password).then(response => {
              if (response !== true) {
                console.log('passwords do not match');
                return done(null, false, { message: 'passwords do not match' });
              }
              console.log(`user ${user.email} found & authenticated`);
              // note the return needed with passport local - remove this return for passport JWT
              return done(null, user);
            });
          }
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);



passport.use(
  'jwt',
  new JWTstrategy(jwtStrategyOptions, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          email: jwt_payload.id,
        },
      }).then(user => {
        if (user) {
          console.log('user found in db in passport');
          // note the return removed with passport JWT - add this return for passport local
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);
