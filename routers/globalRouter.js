import express from 'express';
import routes from '../routes';
import { search, root } from '../controller/videoController';
import { getLogin, postLogin, logout, getJoin, postJoin } from '../controller/userController';

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.root, root);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

export default globalRouter;
