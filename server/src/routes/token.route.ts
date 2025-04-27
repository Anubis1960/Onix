import express from 'express';
import {TokenController} from '../controller/token.controller';

const router = express.Router();
const tokenController = new TokenController();

router.get(
    '/refresh',
    tokenController.refreshTokens.bind(tokenController)
);