import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import axios from 'axios'
import { useSelector } from 'react-redux';
// #19 8:00
import LikeDislikes from './LikeDislikes'


const { TextArea } = Input;

// #16
function SingleComment(props) {

    // const videoId = props.postId;

    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const user = useSelector(state => state.user);

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        
        // 모든 정보 모아서 req 보내주기
        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result)
                    setCommentValue("")
                    setOpenReply(false)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('comment 저장 실패')
                }
            })
    }

    const actions = [
        
        // #19 Comment LikeDislikes
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id} />        
        ,<span onClick={onClickReplyOpen} key="comment-basic-reply-to"> Reply to </span>
    ]

    return (
        <div>
            
            <Comment 
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                content={<p>{props.comment.content}</p>}
            />
            
            
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <textarea 
                    style={{ width: '100%', borderRadius: '5px'}}
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder="코멘트를 작성해주세요"
                
                />
                <br />
                <button style={{ width:'20%', height: '52px' }} onClick={onSubmit} > Submit </button>


            </form>
            }
            
        </div>
    )
}

export default SingleComment
