import React from 'react'
import styled from 'styled-components'

const MainCategory = () => {
    return (
        <S.Wrap>
            <S.Container>
                <S.Button>일정</S.Button>
                <S.Button>이슈</S.Button>
            </S.Container>
        </S.Wrap>
    )
}

const S = {
    Wrap: styled.div`
        width: 216px;
        height: 80px;
        background-color: ${({ theme }) => theme.color.white};
        border-radius: 8px;
        box-shadow: ${({ theme }) => theme.shadow.card};
        margin: 16px 0;
    `,
    Container: styled.div`
        width: 100%;
        height: 100%;
    `,
    Button: styled.div`
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        transition-duration: 0.2s;
        padding: 16px;
        font-size: ${({ theme }) => theme.fontsize.sub1};
        cursor: pointer;

        &:hover {
            background-color: ${({ theme }) => theme.color.main};
            color: ${({ theme }) => theme.color.white};
        }

        &:first-child {
            border-radius: 8px 8px 0 0;
        }

        &:last-child {
            border-radius: 0 0 8px 8px;
        }
    `,
}

export default MainCategory
