import React, { useState } from 'react'
import styled from 'styled-components'

import * as components from 'components'

import { IoExitOutline } from 'react-icons/io5'

const TextChat = () => {
    const [openComment, setOpenComment] = useState(false)

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
                        <components.Thread openComment={openComment} setOpenComment={setOpenComment} />
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
                {openComment && <components.CommentBox />}
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
        background-color: ${({ theme }) => theme.color.main};
        color: ${({ theme }) => theme.color.white};
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
        max-height: calc(100vh - 300px);
        overflow-y: auto;
        padding: 0 0 16px;

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
