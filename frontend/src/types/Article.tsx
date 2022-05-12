import Coach from "./Coach";

export default class Article {
    _id: number;
    name: string;
    author: number;
    description: string;
    content: string;
    likeCount: number;
    viewCount: number;
    image: string;

    constructor(id: number, name: string, author: number,description: string, content: string, image: string) {
        this._id = id;
        this.name = name;
        this.author = author;
        this.description = description;
        this.content = content;
        this.likeCount = 0;
        this.viewCount = 0;
        this.image = image;
    }

}
