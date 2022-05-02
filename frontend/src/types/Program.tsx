import Comment from "./Comment"
import Step from "./Step"

export default class Program {
    _id: number;
    name: string;
    creator: number;
    idCategory: number;
    description?: string;
    likeCount: number;
    viewCount: number;
    steps?: [Step];
    comments?: [Comment];
    image?: string;

    constructor(id: number, name: string, creator: number, idCategory: number, description: string, steps: [Step], comments: [Comment], image: string) {
        this._id = id;
        this.name = name;
        this.creator = creator;
        this.idCategory = idCategory;
        this.description = description;
        this.likeCount = 0;
        this.viewCount = 0;
        this.steps = steps;
        this.comments = comments;
        this.image = image;
    }

}
