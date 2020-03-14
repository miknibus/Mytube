import express from 'express';
import routes from '../routes';
import { home, search } from '../controller/videoController';
import { login, logout, join } from '../controller/userController';

const globalRouter = express.Router();

globalRouter.get(routes.root, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);

export default globalRouter;