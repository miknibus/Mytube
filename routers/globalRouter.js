import express from "express";
import routes from "../routes";
import passport from "passport";
import { search, root } from "../controller/videoController";
import {
  getLogin,
  postLogin,
  logout,
  getJoin,
  postJoin,
  githubLogin,
  postGithubLogin,
  twitchLogin,
  postTwitchLogin,
  getMyProfile
} from "../controller/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.root, root);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);
globalRouter.get(routes.twitch, twitchLogin);
globalRouter.get(
  routes.twitchCallback,
  passport.authenticate("twitch", { failureRedirect: "/login" }),
  postTwitchLogin
);

globalRouter.get(routes.myProfile, getMyProfile);

export default globalRouter;
