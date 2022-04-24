import {Client} from "./Client";
import {User} from "./User";

export class Coach extends User {
    followers: [Client] | null;
    //programs: [Program]

    constructor(id: number, login: string, name: string, password: string, followers: [Client] | null) {
        super(id, login, name, password);
        this.followers = followers;
    }
}

