import Comment from "./Comment"
import Step from "./Step"

export default class Program {
    name: string;
    creator: string;
    idCategory: string;
    idLevel: string;
    description: string;
    image?: string | null;

    constructor(name: string, creator: string, idCategory: string, idLevel: string, description: string, image: string | null) {
        this.name = name;
        this.creator = creator;
        this.idCategory = idCategory;
        this.idLevel = idLevel;
        this.description = description;
        this.image = image;
    }

}
