import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { IoReorderTwoSharp } from 'react-icons/io5'

const KanbanBoard = () => {
    const tasks = [
        {
            id: '1',
            content: '사용자는 프로젝트를 생성하고 생성하고 만들고 생성한다. ',
            type: 'Frontend',
            priority: 'high',
        },
        {
            id: '2',
            content: '사용자는 프로젝트를 생성하고 생성하고 만들고 생성한다. ',
            type: 'Frontend',
            priority: 'high',
        },
        {
            id: '3',
            content: '사용자는 프로젝트를 생성하고 생성하고 만들고 생성한다. ',
            type: 'Frontend',
            priority: 'high',
        },
        { id: '4', content: '사용자는 프로젝트를 생성하고 생성하고 만들고 생성한다. ' },
        { id: '5', content: '사용자는 프로젝트를 생성하고 생성하고 만들고 생성한다. ' },
    ]

    const taskStatus = {
        toDo: {
            name: 'To Do',
            items: tasks,
        },
        inProgress: {
            name: 'In Progress',
            items: [],
        },
        done: {
            name: 'Done',
            items: [],
        },
    }
    const [columns, setColumns] = useState(taskStatus)

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId]
            const destColumn = columns[destination.droppableId]
            const sourceItems = [...sourceColumn.items]
            const destItems = [...destColumn.items]
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            })
        } else {
            const column = columns[source.droppableId]
            const copiedItems = [...column.items]
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            })
        }
    }

    return (
        <S.Wrap>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <S.Column key={columnId}>
                            {columnId === 'toDo' && <S.Todo>{column.name}</S.Todo>}
                            {columnId === 'inProgress' && <S.InProgress>{column.name}</S.InProgress>}
                            {columnId === 'done' && <S.Done>{column.name}</S.Done>}
                            <S.TaskBox>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <S.IssueContainer {...provided.droppableProps} ref={provided.innerRef}>
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <S.IssueDrag
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            backgroundColor: snapshot.isDragging
                                                                                ? '#286EF0'
                                                                                : 'white',
                                                                            ...provided.draggableProps.style,
                                                                        }}>
                                                                        <S.IssueTopic>{item.content}</S.IssueTopic>
                                                                        <S.IssueInfo>
                                                                            <S.Type>{item.type}</S.Type>
                                                                            <S.Priority>
                                                                                <IoReorderTwoSharp />
                                                                            </S.Priority>
                                                                            <S.ProfileImg
                                                                                src={
                                                                                    require('images/thread_profile.png')
                                                                                        .default
                                                                                }
                                                                                alt="Profile"
                                                                            />
                                                                        </S.IssueInfo>
                                                                    </S.IssueDrag>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </S.IssueContainer>
                                        )
                                    }}
                                </Droppable>
                            </S.TaskBox>
                        </S.Column>
                    )
                })}
            </DragDropContext>
        </S.Wrap>
    )
}

const S = {
    Wrap: styled.div`
        display: flex;
        justify-content: space-between;
        background-color: ${({ theme }) => theme.color.background};
        margin: 16px;
        height: 100%;
        width: 100%;
        flex-grow: 1;
        overflow-y: auto;
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
    Column: styled.div`
        display: flex;
        flex-direction: column;
        margin: 0 4px;
        width: 100%;
        background-color: ${({ theme }) => theme.color.background};
        max-height: calc(100vh - 208px);
    `,
    TaskBox: styled.div`
        width: 100%;
    `,
    IssueContainer: styled.div`
        width: 100%;
        border-radius: 8;
        min-height: 500px;
        max-height: calc(100vh - 208px);
    `,
    IssueDrag: styled.div`
        user-select: 'none';
        padding: 16px;
        margin: 8px 0;
        min-height: 50px;
        border-radius: 8px;
        font-size: ${({ theme }) => theme.fontsize.content};
    `,
    IssueTopic: styled.div`
        margin: 8px 0;
    `,
    IssueInfo: styled.div`
        display: flex;
        align-items: center;
        margin: 8px 0 4px 0;
        padding: 12px 0 0 0;
    `,
    Todo: styled.div`
        display: flex;
        align-items: center;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.color.success};
        padding: 8px 16px;
        width: 100%;
        height: 32px;
        color: ${({ theme }) => theme.color.white};
    `,
    InProgress: styled.div`
        display: flex;
        align-items: center;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.color.pending};
        padding: 8px 16px;
        width: 100%;
        height: 32px;
        color: ${({ theme }) => theme.color.white};
    `,
    Done: styled.div`
        display: flex;
        align-items: center;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.color.orange};
        padding: 8px 16px;
        width: 100%;
        height: 32px;
        color: ${({ theme }) => theme.color.white};
    `,
    ProfileImg: styled.img`
        width: 20px;
        height: 20px;
        margin: 0 0 0 4px;
    `,
    Type: styled.div`
        margin: 4px 0;
        font-size: 13px;
        color: ${({ theme }) => theme.color.middlegray};
    `,
    Priority: styled.div`
        display: flex;
        padding: 0 4px;
        margin: 0 4px 0 0;
        margin-left: auto;
        & svg {
            width: 20px;
            height: 20px;
            color: ${({ theme }) => theme.color.pending};
        }
    `,
}

export default KanbanBoard