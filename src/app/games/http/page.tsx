'use client'
import React, { useEffect, useState } from 'react'
import Title from '@/components/Ui/Title'
import { httpStatusCodes, httpStatusNames } from '@/app/games/http/httpConsts'
import ButtonRow from '@/components/Http-game/ButtonRow'
import { ImageContainer } from '@/components/Http-game/ImageContainer'

export type Answers = {
    strings: string[]
    correctHttpCode: number
    correctBtnIndex: number
}

function next() {}

export default function HttpGame() {
    const buttonNumber = 4
    const [answers, setAnswers] = useState<Answers>({
        strings: [''],
        correctBtnIndex: 0,
        correctHttpCode: 0,
    })
    const [revealed, setRevealed] = useState(false)

    function getRandomUniqueStatuses() {
        let usedIndexes: number[]
        usedIndexes = []
        {
            for (let i = 0; i < buttonNumber; i++) {
                let randomIndex
                do {
                    randomIndex = Math.floor(Math.random() * httpStatusNames.length)
                } while (usedIndexes.includes(randomIndex))
                usedIndexes.push(randomIndex)
            }
        }

        const correctBtnIndex = Math.floor(Math.random() * 4)
        const correctHttpCode = httpStatusCodes[usedIndexes[correctBtnIndex]]
        console.log(correctHttpCode)
        console.log(usedIndexes)
        console.log(correctBtnIndex)
        setAnswers({
            strings: usedIndexes.map(index => httpStatusNames[index]),
            correctBtnIndex: correctBtnIndex,
            correctHttpCode: correctHttpCode,
        })
    }

    function vote(index: number) {
        setRevealed(true)
    }

    function next() {
        setRevealed(false)
        getRandomUniqueStatuses()
    }

    useEffect(getRandomUniqueStatuses, [])
    return (
        <div className='App'>
            <Title />
            <div className='container'>
                <div className='main-content'>
                    <div className='sidebar'>
                        <p id='history'>alma álma áhitat</p>
                    </div>
                    <ImageContainer errorCode={answers.correctHttpCode} />
                    <div className='sidebar'></div>
                </div>

                <ButtonRow answers={answers} onClick={vote} revealed={revealed} onNext={next} />
            </div>
        </div>
    )
}
