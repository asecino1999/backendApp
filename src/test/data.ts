import UserDao from '../daos/User/UserDao.mock';

import { OState, NoProblem, Panic } from '../entities/OnlyState';
import { IUser } from '@entities/User';


let users = [{
  "name": "Sean Maxwell",
  "email": "sean.maxwell@gmail.com",
  "id": 159123164363,
  "photo": "https://los40es00.epimg.net/los40/imagenes/2016/05/09/videojuegos/1462795844_886980_1462795962_noticia_normal.jpg",
  "state": "NoProblem",
  "contacts": []
},
{
  "name": "Gordan Freeman",
  "email": "gordan.freeman@halflife.com",
  "id": 906524522143,
  "photo": "https://los40es00.epimg.net/los40/imagenes/2016/05/09/videojuegos/1462795844_886980_1462795962_noticia_normal.jpg",
  "state": "NoProblem",
  "contacts": [
    357437875835,
    159123164363
  ]

},
{
  "name": "John Smith",
  "email": "jsmith@yahoo.com",
  "id": 357437875835,
  "photo": "https://los40es00.epimg.net/los40/imagenes/2016/05/09/videojuegos/1462795844_886980_1462795962_noticia_normal.jpg",
  "state": "NoProblem",
  "contacts": [159123164363]

},
{
  "name": "John Smith",
  "email": "jsmith@yahoo.com",
  "id": 357437875834,
  "photo": "https://los40es00.epimg.net/los40/imagenes/2016/05/09/videojuegos/1462795844_886980_1462795962_noticia_normal.jpg",
  "state": "NoProblem"
}
]


let statesTest: OState[] = [
  { id: 357437875835, state: "NoProblem" },
  { id: 159123164363, state: "NoProblem" }
]

let contactsUserTest: IUser[] = [
  {
    "name": "John Smith",
    "email": "jsmith@yahoo.com",
    "id": 357437875835,
    "photo": "https://los40es00.epimg.net/los40/imagenes/2016/05/09/videojuegos/1462795844_886980_1462795962_noticia_normal.jpg",
    "state": "NoProblem",
    "contacts": [159123164363]

  },
  {
    "name": "Sean Maxwell",
    "email": "sean.maxwell@gmail.com",
    "id": 159123164363,
    "photo": "https://los40es00.epimg.net/los40/imagenes/2016/05/09/videojuegos/1462795844_886980_1462795962_noticia_normal.jpg",
    "state": "NoProblem",
    "contacts": []
  },
]

export let userDao = new UserDao()

interface test {
  input: any
  output: any
  testF(...id: any): Promise<any>

}



export let call =  () =>{ 
  userDao.call(users[0].id).  then(() => (userDao.getOne(users[0].id))). then((e)=>console.log(e)).
  then(() => userDao.stopcall(users[0].id)).then(() => userDao.getOne(users[0].id)). then((e)=>console.log(e)).
  catch((e) => console.log(e))
}
//let fun = (...id:any):Promise<any>  =>  {return userDao.getOne(id)}
export let data: test[] = [

  // getone 
  { input: users[0].id, output: users[0], testF: (id) => userDao.getOne(id) },
  { input: 15913164363, output: null, testF: (id) => userDao.getOne(id) },
  // get allstate 
  { input: users[0].id, output: [], testF: (id) => userDao.getAllState(id) },
  { input: users[1].id, output: statesTest, testF: (id) => userDao.getAllState(id) },
  // get contact 
  { input: users[0].id, output: [], testF: (id) => userDao.getContact(id) },
  { input: 15913164363, output: null, testF: (id) => userDao.getContact(id) },
  { input: users[1].id, output: users[1].contacts, testF: (id) => userDao.getContact(id) },
  // get userContact 
  { input: users[0].id, output: [], testF: (id) => userDao.getContactUser(id) },
  { input: 15913164363, output: null, testF: (id) => userDao.getContactUser(id) },
  { input: users[1].id, output: contactsUserTest, testF: (id) => userDao.getContactUser(id) },
  // call 


]