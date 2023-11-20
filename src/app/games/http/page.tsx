'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import Title from '@/components/Ui/Title'
import { httpStatusCodes, httpStatusNames } from '@/app/games/http/httpConsts'
import ButtonRow from '@/components/Http-game/ButtonRow'
import { ImageContainer } from '@/components/Http-game/ImageContainer'
import styles from './styles.module.css'

export type Answers = {
    strings: string[]
    correctHttpCode: number
    correctBtnIndex: number
}
type Animal = {
    name: string
    svg: ReactNode
}

const animals: Animal[] = [
    {
        name: 'dog',
        svg: (
            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
                <path d='M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z' />
            </svg>
        ),
    },
    {
        name: 'pizza',
        svg: (
            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
                <path d='M169.7 .9c-22.8-1.6-41.9 14-47.5 34.7L110.4 80c.5 0 1.1 0 1.6 0c176.7 0 320 143.3 320 320c0 .5 0 1.1 0 1.6l44.4-11.8c20.8-5.5 36.3-24.7 34.7-47.5C498.5 159.5 352.5 13.5 169.7 .9zM399.8 410.2c.1-3.4 .2-6.8 .2-10.2c0-159.1-128.9-288-288-288c-3.4 0-6.8 .1-10.2 .2L.5 491.9c-1.5 5.5 .1 11.4 4.1 15.4s9.9 5.6 15.4 4.1L399.8 410.2zM176 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm64 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM96 384a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z' />
            </svg>
        ),
    },
]

export default function HttpGame() {
    const buttonNumber = 4
    const [score, setScore] = useState(0)
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
        if (index == answers.correctBtnIndex) {
            setScore(score => score + 1)
        }
    }

    function next() {
        setRevealed(false)
        getRandomUniqueStatuses()
    }

    useEffect(() => {
        getRandomUniqueStatuses()
        setScore(0)
    }, [animalIdx])
    return (
        <div className='App'>
            <Title />
            <div className='container'>
                {animalIdx == -1 ? (
                    <>
                        {animals.map((animal, idx) => (
                            <button key={idx} onClick={() => setAnimalIdx(idx)} className={'big-button'}>
                                <h2>{animal.name}</h2>
                                <div className={styles.icon}>{animal.svg}</div>
                            </button>
                        ))}
                    </>
                ) : (
                    <>
                        <div className='main-content'>
                            <div className='sidebar'>
                                <p id='history'>Try to guess the corresponding error message to the code, using the image as help!</p>
                            </div>
                            <ImageContainer errorCode={answers.correctHttpCode} animalName={animals[animalIdx].name} />
                            <div className='sidebar'>
                                <p className={styles.score}>{score}</p>
                            </div>
                        </div>

                        <ButtonRow answers={answers} onClick={vote} revealed={revealed} onNext={next} onAbort={() => setAnimalIdx(-1)} />
                    </>
                )}
            </div>
        </div>
    )
}
