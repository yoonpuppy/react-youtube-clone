import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState([])
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        
        // #11 
        let variable = { userTo: props.userTo }
        
        axios.post('/api/subscribe/subscribeNumber', variable )
            .then(response => {
                if(response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('구독자 수 정보를 받아오지 못함')
                }
            })

        let subscribedVariable = {
            userTo: props.userTo, 
            userFrom: localStorage.getItem('userId')
        }

        axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if(response.data.success){
                    setSubscribed(response.data.subscribed)
                } else {
                    alert('정보 받아오기 실패')
                }
            })
    
    }, [])

    // #12 onClick 기능
    const onSubscribe = () => {

        let subscribedVariable = {
            userTo: props.userTo, 
            userFrom: localStorage.getItem('userId')
        }

    
        // 이미 구독 중이라면
        if(Subscribed) {

            axios.post('/api/subscribe/unSubscribe', subscribedVariable )
                .then(response => {
                    if(response.data.success) {
                        
                        // 구독 취소
                        setSubscribeNumber(SubscribeNumber - 1)
                        // 반대
                        setSubscribed(!Subscribed)

                    } else {
                        alert('구독 취소 실패')
                    }
                })
        
        } else {
            // 구독 중이 아니라면
            axios.post('/api/subscribe/subscribe', subscribedVariable )
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('구독 실패')
                    }
                })
        }
    }

    return (
        <div>
            <button
                style={{ backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000 '}` , borderRadius: '4px', color: 'white', padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'}}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
                
            </button>
        </div>
    )
}

export default Subscribe
