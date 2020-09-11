import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import UserDao from '@daos/User/UserDao.mock';
import { paramMissingError } from '@shared/constants';

// Init shared
const router = Router();
const userDao = new UserDao();


/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    console.log('existo')
    const users = await userDao.getAll();
    return res.status(OK).json({users});
});


/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await userDao.add(user);
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('/update', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    user.id = Number(user.id);
    await userDao.update(user);
    return res.status(OK).end();
});


/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await userDao.delete(Number(id));
    return res.status(OK).end();
});



/******************************************************************************
 *                       get One - "POST /api/users/get"
 ******************************************************************************/

router.get('/get/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    const user = await userDao.getOne(Number(id));
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: 'no user found',
        });
    }
    return res.status(OK).json({users: user});
});



/******************************************************************************
 *                       constacts  One - "POST /api/users/contacts"
 ******************************************************************************/

router.get('/contacts/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    const userContact = await userDao.getContactUser(Number(id));
    if (!userContact) {
        return res.status(BAD_REQUEST).json({
            error: 'no user found or contact ',
        });
    }
    return res.status(OK).json({userContact});
});


/******************************************************************************
 *                       constacts state   One - "POST /api/users/contactsstate"
 ******************************************************************************/

router.get('/contactsstate/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    const userContact = await userDao.getAllState(Number(id));
    if (!userContact) {
        return res.status(BAD_REQUEST).json({
            error: 'no user found or contact ',
        });
    }
    return res.status(OK).json({userContact});
});

/******************************************************************************
 *                       call   One - "POST /api/users/call"
 ******************************************************************************/

router.get('/call/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    const status = await userDao.call(Number(id));
    if (!status) {
        return res.status(BAD_REQUEST).json({
            error: 'no user found  ',
        });
    }
    return res.status(OK).json({status});
});
/******************************************************************************
 *                       stopcall   One - "POST /api/users/stopcall"
 ******************************************************************************/

router.get('/stopcall/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    const status = await userDao.call(Number(id));
    if (!status) {
        return res.status(BAD_REQUEST).json({
            error: 'no user found  ',
        });
    }
    return res.status(OK).json({status});
});


/******************************************************************************
 *                       addcontact   One - "POST /api/users/addcontact"
 ******************************************************************************/
router.get('/addcontact/:idUser/:idContact', async (req: Request, res: Response) => {
    const { idUser , idContact } = req.params as ParamsDictionary;
    const status = await userDao.addContact(Number(idUser),Number(idContact));
    if (!status) {
        return res.status(BAD_REQUEST).json({
            error: 'no user found  ',
        });
    }
    return res.status(OK).json({status});
});
/******************************************************************************
 *                       delcontact   One - "POST /api/users/delcontact"
 ******************************************************************************/
router.get('/delcontact/:idUser/:idContact', async (req: Request, res: Response) => {
    const { idUser , idContact } = req.params as ParamsDictionary;
    const status = await userDao.delContact(Number(idUser),Number(idContact));
    if (!status) {
        return res.status(BAD_REQUEST).json({
            error: 'no user found  ',
        });
    }
    return res.status(OK).json({status});
});



/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
