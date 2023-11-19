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

const animals = ['dog', 'pizza']

export default function HttpGame() {
    const buttonNumber = 4
    const [answers, setAnswers] = useState<Answers>({
        strings: [''],
        correctBtnIndex: 0,
        correctHttpCode: 0,
    })
    const [revealed, setRevealed] = useState(false)
    const [animalIdx, setAnimalIdx] = useState(-1)

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
        if (revealed) {
            next()
        } else {
            setRevealed(true)
        }
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
                {animalIdx == -1 ? (
                    <>
                        {animals.map((animal, idx) => (
                            <button key={idx} onClick={() => setAnimalIdx(idx)} className={'big-button'}>
                                <h2>{animal}</h2>
                            </button>
                        ))}
                    </>
                ) : (
                    <>
                        <div className='main-content'>
                            <div className='sidebar'>
                                <p id='history'>Alma alva ring az ágon, alma álma áhitat, se érzés, se gondolat, tiszta fény az alma-álom.</p>
                            </div>
                            <ImageContainer errorCode={answers.correctHttpCode} animalName={animals[animalIdx]} />
                            <div className='sidebar'>
                                <p id='history'>Alma alva ring az ágon, alma álma áhitat, se érzés, se gondolat, tiszta fény az alma-álom.</p>
                            </div>
                        </div>

                        <ButtonRow answers={answers} onClick={vote} revealed={revealed} onNext={next} onAbort={() => setAnimalIdx(-1)} />
                    </>
                )}
            </div>
        </div>
    )
}
