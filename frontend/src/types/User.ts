export default class User {
    _id: number;
    alias: string;
    email: string;
    password: string;

    constructor(_id: any,alias: any, email: any, password: any) {
        this._id = _id;
        this.alias = alias;
        this.email = email;
        this.password = password;
    }
}