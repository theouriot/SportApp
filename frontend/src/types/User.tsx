export class User {

    id: number;
    login: string;
    name: string
    password: string;

    constructor(id: number, login: string, name: string, password: string) {
        this.id = id;
        this.login = login;
        this.name = name;
        this.password = password;
    }

}
