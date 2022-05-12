import React, {Fragment} from "react";
import {useEffect, useState} from "react";

import CommentService from "../../../services/CommentService";
import Comment from "../../../types/Comment";

import CommentPage from "./Comment";

interface Props {
    idArticle: number;
    update: number;
}

const ListComment: React.FC<Props> = (props) => {

    const [comments, setComments] = useState<Array<Comment>>([]);

    useEffect(() => {

        const getComments = async (id: any) => {
            await CommentService.getCommentsByArticle(id)
                .then((response: any) => {
                    setComments(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        getComments(props.idArticle).then( () => "ok");

    }, [props.idArticle,props.update]);

    return (
        <div>
            {comments &&
            comments.map((comment,index) => (
                <Fragment key={index}>
                    <CommentPage comment={comment}/>
                </Fragment>
            ))}
        </div>
    );
};

export default ListComment;



