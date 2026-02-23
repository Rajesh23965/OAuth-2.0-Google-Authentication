import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import "dotenv/config";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.CALLBACK_URL!,
    passReqToCallback: true
}, (request: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
    return done(null, profile);
}));


passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});
