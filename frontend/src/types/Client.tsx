import {User} from "./User";
import {Coach} from  "./Coach";

export class Client extends User {
    age: number;
    weight: number;
    height: number;
    profilePicture: string | null;
    follows: [Coach];

    constructor(id: number, login: string, name: string, password: string, age: number, weight: number, height: number, profilePicture: string | null, follows: [Coach]) {
        super(id, login, name, password);
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.profilePicture = profilePicture;
        this.follows = follows;
    }
}
