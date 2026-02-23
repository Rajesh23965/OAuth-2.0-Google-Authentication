import express, { type Request, type Response } from "express";
import passport from "passport";
import session from "express-session";
import "dotenv/config";
import "./auth/google.js";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req: Request, res: Response) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login | OAuth Project</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Roboto', sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .login-card {
                    background: rgba(255, 255, 255, 0.95);
                    padding: 3rem;
                    border-radius: 20px;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
                    text-align: center;
                    width: 100%;
                    max-width: 400px;
                }
                h1 { color: #333; margin-bottom: 0.5rem; font-size: 1.8rem; }
                p { color: #666; margin-bottom: 2rem; font-size: 0.9rem; }
                
                .google-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    background-color: #ffffff;
                    color: #757575;
                    text-decoration: none;
                    font-weight: 500;
                    padding: 12px 24px;
                    border: 1px solid #dadce0;
                    border-radius: 4px;
                    transition: background-color .2s, box-shadow .2s;
                    font-size: 14px;
                }
                .google-btn:hover {
                    background-color: #f8f9fa;
                    box-shadow: 0 1px 3px rgba(60,64,67, 0.3), 0 4px 8px 3px rgba(60,64,67, 0.15);
                }
                .google-icon { width: 48px; height: 28px; }
            </style>
        </head>
        <body>
            <div class="login-card">
                <h1>Welcome Back</h1>
                <p>Please sign in to continue to your dashboard</p>
                
                <a href="/auth/google" class="google-btn">
                    <img class="google-icon" src="https://53.fs1.hubspotusercontent-na1.net/hubfs/53/image8-2.jpg" alt="Google Logo""")/>>
                    Sign in with Google
                </a>
            </div>
        </body>
        </html>
    `);
});


app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

app.get('/profile', (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.redirect('/');

    const user = req.user as any;
    const userPhoto = user.photos?.[0]?.value || 'https://via.placeholder.com';

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Profile - ${user.displayName}</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; width: 320px; }
                img { width: 100px; height: 100px; border-radius: 50%; border: 3px solid #4285F4; margin-bottom: 1rem; }
                h1 { color: #333; margin: 10px 0; font-size: 1.5rem; }
                .email { color: #666; margin-bottom: 1.5rem; display: block; }
                .logout-btn { display: inline-block; padding: 10px 20px; background-color: #db4437; color: white; text-decoration: none; border-radius: 5px; transition: background 0.3s; }
                .logout-btn:hover { background-color: #c53929; }
            </style>
        </head>
        <body>
            <div class="card">
                <img src="${userPhoto}" alt="Profile Picture">
                <h1>Welcome, ${user.displayName}</h1>
                <span class="email">${user.emails?.[0]?.value || ''}</span>
                <a href='/logout' class="logout-btn">Logout</a>
            </div>
        </body>
        </html>
    `);
});


app.get('/logout', (req: Request, res: Response) => {
    req.logout(() => {
        res.redirect('/');
    })
})




app.listen(PORT, () => {
    console.log(`Server is runnig on http://localhost:${PORT}`);
})