export class User {

    _id: number;
    alias: string;
    email: string
    password: string;

    constructor(_id: number, alias: string, email: string, password: string) {
        this._id = _id;
        this.alias = alias;
        this.email = email;
        this.password = password;
    }

}
