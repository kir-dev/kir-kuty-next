'use client'
import React from 'react'
import Button from '@/components/Ui/Button'
import { QuizAnswer } from '@/app/games/quiz/page'

type buttonRowProps = {
    answers: QuizAnswer[]
    onNext: () => void
    revealed: boolean
    onClick: (id: number) => void
    onAbort?: () => void
}

export default function ButtonRow(props: buttonRowProps) {
    return (
        <div className={'full-width'}>
            <div className='center'>
                {props.answers.map((answer, index) => (
                    <Button
                        key={index}
                        text={answer.text}
                        big={true}
                        onClick={() => props.onClick(index)}
                        color={props.revealed ? (answer.correct ? 'var(--green)' : 'var(--red)') : 'transparent'}
                    />
                ))}
            </div>
            <div className={'right next'}>
                <Button key='next' text={'Következő'} onClick={props.onNext} color='transparent'></Button>
            </div>
        </div>
    )
}
