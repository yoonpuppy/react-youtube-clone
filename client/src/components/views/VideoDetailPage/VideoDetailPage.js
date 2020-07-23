import React, { useEffect, useState } from 'react'
// #9 3:30 반응형
import { Row, Col, List, Avatar, Typography } from 'antd';
import axios from 'axios';
// #10 
import SideVideo from './Sections/SideVideo';

function VideoDetailPage(props) {

    // #9 7:00
    const videoId = props.match.params.videoId
    const [VideoDetail, setVideoDetail] = useState([])

    const videoVariable = { 
        videoId: videoId 
    }

    
    

    useEffect(() => {
        
        axios.post('/api/video/getVideoDetail', videoVariable)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.videoDetail)
                    setVideoDetail(response.data.videoDetail)

                } else {
                    alert('비디오 정보 가져오기 실패')
                }
            })

    }, [])

    if(VideoDetail.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div  style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />

                        <List.Item
                            actions={[]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.title}
                                description={VideoDetail.description}
                            />
                            <div></div>
                        </List.Item>

                        {/* Comments */}

                    </div>

                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
            
        )
    } else {
        return (
            <div>
                ...loading
            </div>
        )
    }
    
}

export default VideoDetailPage
