'use client'
import React from 'react'
import Button from '@/components/Ui/Button'
import { Answers } from '@/app/games/http/page'
import styles from '@/components/Http-game/styles.module.css'

type buttonRowProps = {
    answers: Answers
    onNext: () => void
    revealed: boolean
    onClick: (id: number) => void
    onAbort?: () => void
}

export default function ButtonRowForHttp(props: buttonRowProps) {
    return (
        <div className={styles.buttoncontainer}>
            <div className={styles.options}>
                {props.answers.strings.map((answer, index) => (
                    <Button
                        key={index}
                        text={answer}
                        big={true}
                        onClick={() => props.onClick(index)}
                        color={props.revealed ? (props.answers.correctBtnIndex == index ? 'var(--green)' : 'var(--red)') : 'transparent'}
                    />
                ))}
            </div>

            <div className={styles.actionbuttonrow}>
                {props.onAbort && (
                    <div className={'back'}>
                        <Button key='next' text={'Másik állat'} onClick={props.onAbort} color='transparent'></Button>
                    </div>
                )}

                <div className={'next'}>
                    <Button key='next' text={'Következő'} onClick={props.onNext} color='transparent'></Button>
                </div>
            </div>
        </div>
    )
}
