import { IUser } from '@entities/User';
import { getRandomInt } from '@shared/functions';
import { MockDaoMock } from '../MockDb/MockDao.mock';
import { IUserDao } from './UserDao';
import { state, NoProblem, Panic, OState } from './../../entities/OnlyState';

class UserDao extends MockDaoMock implements IUserDao {

    db:any 
    // inicar la db para que no se cruse la data 
    public async init(){
        this.db=await super.openDb();
    }

    // update service 
    public setPanic(user: IUser) { user.state = "Panic"; return user }
    public setNoProblem(user: IUser) { user.state = "NoProblem"; return user }
    public addContactUser(user: IUser, id_contact: number):IUser {
        if (!user.contacts) {
            user.contacts = [id_contact]
        } else {
            if (user.contacts.indexOf(id_contact) < 0  )
                user.contacts.push(id_contact)
        }
        return user
    }
    public delContactUser(user: IUser, id_contact: number):IUser {
        if (!user.contacts) {
            user.contacts = []
        } else {
            const position = user.contacts.indexOf(id_contact);
            if (position > 0  ){
                user.contacts.splice(position)
            }
                
        }
        return user
    }


    // operaciones 
    public getOneNA(db: any, id: Number): IUser | null {
        for (const user of db.users) {
            if (user.id === id) {
                return user;
            }
        }
        return null;
    }
    public getContactNA(db: any, contacts: Number[]): IUser[] | null {
        let userContact: (IUser | null)[] = contacts.map((id: Number) => this.getOneNA(db, id))
        return userContact.filter((index): index is IUser => index !== null)
    }
    public updateUserNA(db: any, id: Number, operation: (user: IUser) => IUser): (any|number)[] {
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === id) {
                db.users[i] = operation(db.users[i]);
                return [db,1];
            }
        }
        return [db,0]
    }

    // async ---------------------------------------------------

    public async getOne(id: Number): Promise<IUser | null> {
        try {
            const db =this.db?this.db: await super.openDb();
            return this.getOneNA(db, id)
        } catch (err) {
            throw err;
        }
    }


    public async getAll(): Promise<IUser[]> {
        try {
            const db =this.db?this.db: await super.openDb();
            return db.users;
        } catch (err) {
            throw err;
        }
    }
    public async getContact(id: number): Promise<Number[] | null> {
        try {
            const db =this.db?this.db: await super.openDb();

            let contacts: Number[] | null = this.getOneNA(db, id)?.contacts || null;
            return contacts
        } catch (err) {
            throw err;
        }
    }
    public async getContactUser(id: Number): Promise<IUser[] | null> {
        try {
            const db =this.db?this.db: await super.openDb();
            // get user and contacts 
            let contacts: Number[] | null = this.getOneNA(db, id)?.contacts || null;
            // get contancts of users  
            return contacts ? this.getContactNA(db, contacts) : null
        } catch (err) {
            throw err;
        }
    }

    public async getAllState(id: Number): Promise<OState[] | null> {
        try {
            let db =this.db?this.db: await super.openDb();
            let contacts: Number[] | undefined = this.getOneNA(db, id)?.contacts;
            //let contactsUser:IUser[]|null
            //console.log(contacts, id)
            if (contacts && Array.isArray(contacts)) {
                let contactsUser = this.getContactNA(db, contacts)
                return contactsUser?.map((user) => ({ id: user.id, state: user.state } as OState)) || []
            }
            return null
        } catch (err) {
            throw err;
        }
    }

    public async call(id: number):Promise<Number|null> {
        try {
            let db =this.db?this.db: await super.openDb();
            
            [db,status  ]= this.updateUserNA(db, id, (user: IUser) => this.setPanic(user))
            await super.saveDb(db);
            return Number(status) ; 
        } catch (err) {
            throw err
             
        }
    }
    public async stopcall(id: number):Promise<Number> {
        try {
            let db =this.db?this.db: await super.openDb();
            [db,status  ]= this.updateUserNA(db, id, (user) => this.setNoProblem(user))
            await super.saveDb(db);
            return Number(status) ; 
        } catch (err) {
            throw err
        }
    }


    public async add(user: IUser): Promise<void> {
        try {
            const db =this.db?this.db: await super.openDb();
            user.id = getRandomInt();
            db.users.push(user);
            await super.saveDb(db);

        } catch (err) {
            throw err;
        }
    }
    public async addContact(id_user: number, id_contact: number) {
        try {
            let db =this.db?this.db: await super.openDb();
            let exist =  this.getOneNA(db,id_contact);
            let status 
            if(!exist )return null;
            [db,status  ]=this.updateUserNA(db,id_user,(user:IUser)=>this.addContactUser(user,id_contact))
            await super.saveDb(db);
            return Number(status) ; 
        } catch (err) {
            throw err;
        }
    }
    public async delContact(id_user: number, id_contact: number) {
        try {
            let db =this.db?this.db: await super.openDb();
            //let exist =  this.getOneNA(db,id_contact);
            //if(!exist )return null;
            let status 
            [db,status  ]=this.updateUserNA(db,id_user,(user:IUser)=>this.delContactUser(user,id_contact))
            await super.saveDb(db);
            return Number(status) ; 
        } catch (err) {
            throw err;
        }
    }
    public async update(user: IUser): Promise<void> {
        try {
            const db =this.db?this.db: await super.openDb();
            for (let i = 0; i < db.users.length; i++) {
                if (db.users[i].id === user.id) {
                    db.users[i] = user;
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('User not found');
        } catch (err) {
            throw err;
        }
    }


    public async delete(id: number): Promise<void> {
        try {
            const db =this.db?this.db: await super.openDb();
            for (let i = 0; i < db.users.length; i++) {
                if (db.users[i].id === id) {
                    db.users.splice(i, 1);
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('User not found');
        } catch (err) {
            throw err;
        }
    }
}

export default UserDao;
