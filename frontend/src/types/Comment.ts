export default class Comment{
    _id: number | null;
    author: any;
    content: string;
    timestamp: number;

    constructor(_id: number | null ,author: any, content: string) {
        this._id = _id;
        this.author = author;
        this.content = content;
        this.timestamp =  new Date().getTime();
    }

}
