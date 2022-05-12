import Client from "./Client";
import User from "./User";

export default class Coach extends User {
    followers: [Client] | null;
    //programs: [Program]

    constructor(_id: number, alias: string, email: string, password: string, followers: [Client] | null) {
        super(_id, alias, email, password);
        this.followers = followers;
    }
}

