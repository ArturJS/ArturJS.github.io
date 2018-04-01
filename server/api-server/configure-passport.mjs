import passport from 'koa-passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import Router from 'koa-router';
import { withAuth } from './utils/auth.utils';

const router = new Router();

export const configurePassport = app => {
    app.use(passport.initialize());
    app.use(passport.session());

    router
        .get(
            '/auth/google',
            passport.authenticate('google', { scope: ['email', 'profile'] }),
        )
        .get('/auth/google/callback', async (ctx, next) => {
            await passport.authenticate('google', async (err, user, info) => {
                if (user === false) {
                    ctx.redirect('/api/failure');
                } else {
                    await ctx.login(user);
                    ctx.redirect('/api/success');
                }
            })(ctx);
        })
        .get('/success', withAuth, async ctx => {
            ctx.body = `Success!`;
        })
        .get('/failure', async ctx => {
            ctx.body = 'failure!';
        });

    app.use(router.routes());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    const {
        HOST,
        PORT,
        GOOGLE_OAUTH20_CLIENT_ID,
        GOOGLE_OAUTH20_CLIENT_SECRET,
    } = process.env;

    passport.use(
        new OAuth2Strategy(
            {
                clientID: GOOGLE_OAUTH20_CLIENT_ID,
                clientSecret: GOOGLE_OAUTH20_CLIENT_SECRET,
                callbackURL: `http://${HOST}:${PORT}/api/auth/google/callback`,
            },
            (accessToken, refreshToken, profile, done) => {
                done(null, {
                    accessToken,
                    refreshToken,
                    profile,
                });
            },
        ),
    );
};