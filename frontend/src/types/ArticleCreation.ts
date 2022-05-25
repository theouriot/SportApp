
export default class ArticleCreation {
    name: string;
    author: string;
    description: string;
    content: string;
    likeCount: number;
    viewCount: number;
    image: string;

    constructor(name: any, author: any, description: any, content: any, image: any) {

        this.name = name;
        this.author = author;
        this.description = description;
        this.content = content;
        this.likeCount = 0;
        this.viewCount = 0;
        this.image = image;
    }


}
