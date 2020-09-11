
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import UserDao from '@daos/User/UserDao.mock';
import { paramMissingError } from '@shared/constants';


const router = Router();
const userDao = new UserDao();
router.get('/all/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    const users = await userDao.getAllState(Number(id));
    return res.status(OK).json({users});
});



export default router ; 