import React, { useState } from 'react'
import styled from 'styled-components'

import { format, addMonths, subMonths } from 'date-fns'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns'
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns'

import { BsPlus } from 'react-icons/bs'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

const Plan = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    let rows = []
    let days = []
    let day = startDate

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1))
    }

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1))
    }

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            days.push(
                <S.DayNumber key={day} className={format(currentMonth, 'M') !== format(day, 'M') ? 'disable' : ''}>
                    {format(day, 'd')}
                </S.DayNumber>,
            )

            day = addDays(day, 1)
        }
        rows.push(
            <S.Week>
                <S.DayBox>
                    <S.Day></S.Day>
                    <S.Day></S.Day>
                    <S.Day></S.Day>
                    <S.Day></S.Day>
                    <S.Day></S.Day>
                    <S.Day></S.Day>
                    <S.Day></S.Day>
                </S.DayBox>
                <S.DayHeader>{days}</S.DayHeader>
                <S.PlanBox>
                    <S.PlanRows>
                        <S.PlanRow>
                            <S.DayPlan></S.DayPlan>
                            <S.DayPlan></S.DayPlan>
                            <S.DayPlan></S.DayPlan>
                            <S.DayPlan></S.DayPlan>
                            <S.DayPlan></S.DayPlan>
                            <S.DayPlan></S.DayPlan>
                            <S.DayPlan></S.DayPlan>
                        </S.PlanRow>
                    </S.PlanRows>
                </S.PlanBox>
            </S.Week>,
        )
        days = []
    }

    return (
        <S.Wrap>
            <S.Container>
                <S.CalendarHeader>
                    <S.CalendarAccess>
                        <S.MonthBox>
                            <IoIosArrowBack onClick={() => prevMonth()} />
                            <div>
                                {format(currentMonth, 'yyyy')}년 {format(currentMonth, 'M')}월
                            </div>
                            <IoIosArrowForward onClick={() => nextMonth()} />
                        </S.MonthBox>
                        <S.CreateButton>
                            <BsPlus /> 생성
                        </S.CreateButton>
                    </S.CalendarAccess>
                    <S.WeekHeader>
                        <S.DayOfWeek>S</S.DayOfWeek>
                        <S.DayOfWeek>M</S.DayOfWeek>
                        <S.DayOfWeek>T</S.DayOfWeek>
                        <S.DayOfWeek>W</S.DayOfWeek>
                        <S.DayOfWeek>T</S.DayOfWeek>
                        <S.DayOfWeek>F</S.DayOfWeek>
                        <S.DayOfWeek>S</S.DayOfWeek>
                    </S.WeekHeader>
                </S.CalendarHeader>
                <S.Calendar>{rows}</S.Calendar>
            </S.Container>
        </S.Wrap>
    )
}

const S = {
    Wrap: styled.div`
        display: flex;
        width: 100%;
        height: 100%;
        max-height: calc(100vh - 56px);
    `,
    Container: styled.div`
        width: 100%;
        max-height: calc(100vh - 56px);
        background-color: ${({ theme }) => theme.color.white};
        border-radius: 8px;
        margin: 16px 16px 16px 0;
    `,
    CalendarHeader: styled.div`
        position: relative;
        width: 100%;
    `,
    CalendarAccess: styled.div`
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    MonthBox: styled.div`
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: ${({ theme }) => theme.fontsize.title2};

        & > div {
            margin: 0 24px;
        }

        & > svg {
            width: 24px;
            height: 24px;
            margin: 2px 0 0;
            cursor: pointer;
            transition-duration: 0.2s;
        }

        & > svg:first-child:hover {
            color: ${({ theme }) => theme.color.main};
            transform: translateX(-2px);
        }

        & > svg:last-child:hover {
            color: ${({ theme }) => theme.color.main};
            transform: translateX(2px);
        }

        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    `,
    CreateButton: styled.button`
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0;
        width: 56px;
        height: 30px;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.color.main};
        color: ${({ theme }) => theme.color.white};
        margin: 0 16px;
    `,
    WeekHeader: styled.div`
        width: 100%;
        height: 32px;
        display: flex;
        align-items: center;
    `,
    DayOfWeek: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: ${({ theme }) => theme.fontsize.title2};
        padding: 0 12px;
        flex: 1 1 0%;

        &:first-child {
            color: ${({ theme }) => theme.color.warning};
        }

        &:last-child {
            color: ${({ theme }) => theme.color.main};
        }
    `,
    Calendar: styled.ul`
        display: flex;
        flex-direction: column;
        height: 100%;
        max-height: calc(100% - 92px);
    `,
    Week: styled.li`
        position: relative;
        border-top: 1px solid ${({ theme }) => theme.color.middlegray};
        flex: 1 1 0%;
    `,
    DayBox: styled.ul`
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    `,
    Day: styled.li`
        flex: 1 1 0%;

        &:not(:last-child) {
            border-right: 1px solid ${({ theme }) => theme.color.middlegray};
        }
    `,
    DayHeader: styled.ul`
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 24px;
    `,
    DayNumber: styled.li`
        display: flex;
        align-items: center;
        font-size: ${({ theme }) => theme.fontsize.sub1};
        padding: 0 12px;
        flex: 1 1 0%;

        &:first-child {
            color: ${({ theme }) => theme.color.warning};
        }

        &:last-child {
            color: ${({ theme }) => theme.color.main};
        }

        &.disable {
            color: ${({ theme }) => theme.color.middlegray};
        }
    `,
    PlanBox: styled.div`
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    `,
    PlanRows: styled.ul`
        flex: 1 1 0%;
        margin: 24px 0 0;
    `,
    PlanRow: styled.li`
        display: flex;
        position: relative;
        font-size: ${({ theme }) => theme.fontsize.sub1};
        width: 100%;
        height: 24px;
    `,
    DayPlan: styled.li`
        flex: 1 1 0%;
    `,
}

export default Plan
