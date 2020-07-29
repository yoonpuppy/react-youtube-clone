import React from 'react'
import { Tooltip, Icon } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'

// #19 2:00
function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)

    const [LikeAction, setLikeAction] = useState(null) 
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = { }

    if(props.video) {
        variable = { videoId: props.videoId , userId:props.userId }
    } else {
        variable = { commentId: props.comment._id , userId: props.userId }
    }


    useEffect(() => {

        axios.post('/api/like/getLikes', variable)
            .then(response => {
                if(response.data.success) {

                    // 얼마나 많은 좋아요를 받았는지 (response.data.likes.length)
                    setLikes(response.data.likes.length)
                    
                    // 이미 좋아요를 눌렀는지
                    response.data.likes.map(like => {
                        if(like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })


                } else {
                    alert('Likes 정보를 가져오지 못함')
                }
            })

        axios.post('/api/dislike/getDislikes', variable)
            .then(response => {
                if(response.data.success) {
                    // 얼마나 많은 싫어요를 받았는지 (response.data.dislikes.length)
                    setDislikes(response.data.dislikes.length)
                    
                    // 이미 싫어요를 눌렀는지
                    response.data.dislikes.map(dislike => {
                        if(dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })


                } else {
                    alert('Dislikes 정보를 가져오지 못함')
                }
            })

    }, [])

    return (
        <div>
            <span  key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick

                    />
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor: 'auto'}}> {Likes} </span>
            </span>


            <span  key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick

                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Dislikes} </span>
            </span>
        </div>
    )
}

export default LikeDislikes
