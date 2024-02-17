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

export default function ButtonRowForQuiz(props: buttonRowProps) {
    return (
        <div className={'full-width'}>
            <div className='center'>
                {props.answers.map((answer, index) => (
                    <Button
                        key={index}
                        text={answer.text}
                        veryBig={true}
                        onClick={() => props.onClick(index)}
                        color={props.revealed ? (answer.correct ? 'var(--green)' : 'var(--red)') : 'transparent'}
                    />
                ))}
            </div>
        </div>
    )
}
