import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';

function Comment(props) {

    // const videoId = props.match.params.videoId
    const videoId = props.postId;

    const user = useSelector(state => state.user);

    const [CommentValue, setCommentValue] = useState("")

    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value)

    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: videoId
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result)
                } else {
                    alert('comment 저장 실패')
                }
            })

    }


    return (
        <div>
            <br />
            <p> Replies </p>
            <hr />

            {/* Comment Lists */}

            {/* Root Comment Form */}

            <form style={{ display: 'flex'}} onSubmit={onSubmit} >
                <textarea 
                    style={{ width: '100%', borderRadius: '5px'}}
                    onChange={handleClick}
                    value={CommentValue}
                    placeholder="코멘트를 작성해주세요"
                
                />
                <br />
                <button style={{ width:'20%', height: '52px' }} onClick > Submit </button>


            </form>
        </div>
    )
}

export default Comment
