export default class Comment{
    author: number;
    content: string;
    articleRef: number;

    constructor(author: number, content: string, articleRef: number) {
        this.author = author;
        this.content = content;
        this.articleRef = articleRef;
    }
}
