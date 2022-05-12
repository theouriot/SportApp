import User from "./User";
import Coach from  "./Coach";

export default class Client extends User {
    age: number | null;
    weight: number | null;
    height: number | null;
    profilePicture: string | null;
    follows: [Coach] | null;

    constructor(id: number, alias: string, email: string, password: string, age: number | null, weight: number | null, height: number | null, profilePicture: string | null, follows: [Coach] | null) {
        super(id, alias, email, password);
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.profilePicture = profilePicture;
        this.follows = follows;
    }
}
