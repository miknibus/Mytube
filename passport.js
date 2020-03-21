import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import GithubStrategy from 'passport-github';
import { OAuth2Strategy } from 'passport-oauth';
import request from 'request';
import User from './models/User';
import routes from './routes';
import { githubLoginCallback, twitchLoginCallback } from './controller/userController';

passport.use(User.createStrategy());
passport.use(
	new GithubStrategy(
		{
			clientID     : process.env.GH_ID,
			clientSecret : process.env.GH_SECRET,
			callbackURL  : `http://localhost:4000${routes.githubCallback}`
		},
		githubLoginCallback
	)
);

OAuth2Strategy.prototype.userProfile = (accessToken, done) => {
	const options = {
		url     : 'https://api.twitch.tv/helix/users',
		method  : 'GET',
		headers : {
			'Client-ID'   : process.env.TWITCH_ID,
			Accept        : 'application/vnd.twitchtv.v5+json',
			Authorization : `Bearer ${accessToken}`
		}
	};

	request(options, (error, response, body) => {
		if (response && response.statusCode === 200) {
			done(null, JSON.parse(body));
		} else {
			done(JSON.parse(body));
		}
	});
};

passport.use(
	'twitch',
	new OAuth2Strategy(
		{
			authorizationURL : 'https://id.twitch.tv/oauth2/authorize',
			tokenURL         : 'https://id.twitch.tv/oauth2/token',
			clientID         : process.env.TW_ID,
			clientSecret     : process.env.TW_SECRET,
			callbackURL      : `http://localhost:4000${routes.twitchCallback}`,
			scope            : 'user_read'
		},
		twitchLoginCallback
	)
);

// TODO: unattended problem with github email returning as null
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
