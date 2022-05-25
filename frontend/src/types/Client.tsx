import User from "./User";
import Coach from  "./Coach";

export default class Client extends User {
    age: number | null;
    weight: number | null;
    height: number | null;
    profilePicture: string | null;
    follows: [Coach] | null;

    constructor(id: any, alias: any, email: any, password: any, age: any | null, weight: any | null, height: any | null, profilePicture: any | null, follows: [Coach] | null) {
        super(id, alias, email, password);
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.profilePicture = profilePicture;
        this.follows = follows;
    }
}
