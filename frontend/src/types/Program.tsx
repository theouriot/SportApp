import Comment from "./Comment"
import Step from "./Step"

export default class Program {
    _id: number;
    name: string;
    creator: number;
    idCategory: number;
    idLevel: number;
    description?: string;
    likeCount: number;
    viewCount: number;
    steps?: [Step];
    image?: string;

    constructor(id: number, name: string, creator: number, idCategory: number, idLevel: number, description: string, steps: [Step], image: string) {
        this._id = id;
        this.name = name;
        this.creator = creator;
        this.idCategory = idCategory;
        this.idLevel = idLevel;
        this.description = description;
        this.likeCount = 0;
        this.viewCount = 0;
        this.steps = steps;
        this.image = image;
    }

}
