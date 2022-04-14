
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = '589978172241-uo2hrci9p7eat7ernc0ltc537igb0egp.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy( 
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/google/callback',
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
        
    }
  
));

passport.serializeUser(function(user, done) {
  done(null, user)
});

passport.deserializeUser(function(user, done) {
    done(null, user)
});