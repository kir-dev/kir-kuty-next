'use client'
import React from 'react'
import Button from '@/components/Ui/Button'
import { Option } from '@/app/games/http/httpStatuses'

type ButtonRowProps = {
    options?: Option[]
    onNext: () => void
    revealed: boolean
    onClick: (option: Option) => void
    onAbort?: () => void
}

export default function ButtonRowForHttp({ options, onNext, onAbort, onClick, revealed }: ButtonRowProps) {
    return (
        <div className={'full-width'}>
            {onAbort && (
                <div className={'left back'}>
                    <Button key='next' text={'Másik állat'} onClick={onAbort} color='transparent'></Button>
                </div>
            )}
            <div className='center'>
                {options?.map(option => (
                    <Button
                        key={option.value.code}
                        text={option.value.name}
                        big={true}
                        onClick={() => onClick(option)}
                        color={revealed ? (option.correct ? 'var(--green)' : 'var(--red)') : 'transparent'}
                    />
                ))}
            </div>
            <div className={'right next'}>
                <Button key='next' text={'Következő'} onClick={onNext} color='transparent'></Button>
            </div>
        </div>
    )
}
