//import  './../daos/MockDb/MockDao.mock';

//import UserDao from '../daos/User/UserDao.mock';
import { data,call } from './data';
const chalk = require('chalk')
const testerJson = (out: any, value: any, input?:any) => {
    if (JSON.stringify(out) === JSON.stringify(value)) {
        console.log(`${chalk.green('OK')}`);
    }
    else {
        console.log(`${chalk.red('error')}`);
        if (input) console.log('input :\n',input )
        console.log('debe ser ser :\n',value )
        console.log('pero es  :\n',out )
    }
}

//let userDao=new UserDao()
// getone 
//userDao.getOne(data[0].input).then((e)=>testerJson(e,data[0].output))

let testFun =data.map((index):Promise<void>=> {
    return new Promise ( (resolve, reject )=>{
        index.testF(index.input).
        then((e)=>resolve(testerJson(e,index.output,index.input))).
        catch(e=>reject(e))
    })
});
Promise.all(testFun ). 
then(()=>call()).
catch(e=>console.log(e))