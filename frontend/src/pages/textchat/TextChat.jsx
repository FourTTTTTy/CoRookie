import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import * as components from 'components'
import * as hooks from 'hooks'
import * as utils from 'utils'
import * as api from 'api'

import * as StompJs from '@stomp/stompjs'
import * as SockJs from 'sockjs-client'

import { IoExitOutline } from 'react-icons/io5'

const TextChat = () => {
    const { commentOpened } = hooks.commentState()
    const [me, setMe] = useState()
    const [chat, setChat] = useState({
        textChannelId: 1,
        writerId: null,
        content: '',
    })
    const [chats, setChats] = useState([])
    const client = useRef({})

    const connectThread = () => {
        client.current = new StompJs.Client({
            brokerURL: utils.WEBSOCKET_BASE_URL + '/ws/chat',
            connectHeaders: {
                Authorization: hooks.getCookie('Authorization'),
            },
            debug: function (message) {
                console.log(message)
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log('Connected')
                client.current.subscribe('/topic/thread/' + 1, message => {
                    const jsonBody = JSON.parse(message.body)
                    setChats(chats => [...chats, jsonBody])
                })
                client.current.publish({
                    destination: '/app/thread/',
                    body: JSON.stringify(chats),
                })
            },
            onStompError: frame => {
                console.error(frame)
            },
        })

        client.current.activate()
    }

    const disconnect = () => {
        client.current.deactivate()
    }

    const send = () => {
        if (!client.current.connected) {
            return
        }

        if (chat.content.replace(/\s+/gi, '') === '') {
            return
        }

        client.current.publish({
            destination: '/app/thread/',
            body: JSON.stringify(chat),
        })

        setChat({
            ...chat,
            writerId: me.id,
            content: '',
        })
    }

    useEffect(() => {
        api.apis
            .getMe()
            .then(response => {
                console.log(response.data)
                setMe(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        connectThread()

        return () => {
            disconnect()
        }
    }, [])

    return (
        <S.Wrap>
            <S.Header>
                <S.Title>1. 공지</S.Title>
                <S.ExitButton>
                    <IoExitOutline />
                </S.ExitButton>
            </S.Header>
            <S.Container>
                <S.ChatBox>
                    <S.ThreadBox>
                        <components.Thread />
                        <components.Thread />
                        <components.Thread />
                        <components.Thread />
                        <components.Thread />
                        <components.Thread />
                        <components.Thread />
                        <components.Thread />
                        <components.Thread />
                        <components.Thread />
                        <components.Thread />
                        <components.Thread />
                        <components.Thread />
                    </S.ThreadBox>
                    <components.EditBox />
                </S.ChatBox>
                {commentOpened && <components.CommentBox />}
            </S.Container>
        </S.Wrap>
    )
}

const S = {
    Wrap: styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    `,
    Header: styled.div`
        display: flex;
        align-items: center;
        height: 64px;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.color.white};
        box-shadow: ${({ theme }) => theme.shadow.card};
        margin: 16px;
        padding: 0 26px;
    `,
    Title: styled.div`
        font-size: ${({ theme }) => theme.fontsize.title2};
    `,
    ExitButton: styled.div`
        margin: 0 0 0 auto;
        cursor: pointer;
        transition-duration: 0.2s;

        & svg {
            width: 24px;
            height: 24px;
        }

        &:hover {
            color: ${({ theme }) => theme.color.warning};
            transform: translateX(1px);
        }
    `,
    Container: styled.div`
        display: flex;
        height: 100%;
        max-height: calc(100vh - 152px);
    `,
    ChatBox: styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        transition: width 0.2s;
    `,
    ThreadBox: styled.div`
        width: 100%;
        flex-grow: 1;
        /* max-height: calc(100vh - 300px); */
        overflow-y: auto;
        padding: 0 0 16px;
        margin: 0 0 auto 0;

        &::-webkit-scrollbar {
            height: 0px;
            width: 4px;
        }
        &::-webkit-scrollbar-track {
            background: transparent;
        }
        &::-webkit-scrollbar-thumb {
            background: ${({ theme }) => theme.color.gray};
            border-radius: 45px;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: ${({ theme }) => theme.color.gray};
        }
    `,
}

export default TextChat
