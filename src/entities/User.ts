import { state,NoProblem,Panic } from './OnlyState';

export interface IUser {
    id: number;
    name: string;
    email: string;
    contacts?:Number[];
    photo?:string;
    state:state;
}

class User implements IUser {

    public id: number;
    public name: string;
    public email: string;
    public contacts?:Number[] ;
    public photo?:string;
    public state:state;
    constructor(nameOrUser: string | IUser, email?: string, id?: number) {
        if (typeof nameOrUser === 'string') {
            this.name = nameOrUser;
            this.email = email || '';
            this.id = id || -1;
        } else {
            this.name = nameOrUser.name;
            this.email = nameOrUser.email;
            this.id = nameOrUser.id;
        }
        this.state='NoProblem'
    }
}

export default User;
