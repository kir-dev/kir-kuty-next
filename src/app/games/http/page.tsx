'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import Title from '@/components/Ui/Title'
import { httpStatusCodes, httpStatusNames } from '@/app/games/http/httpConsts'
import ButtonRowForHttp from '@/components/Http-game/ButtonRowForHttp'
import { ImageContainer } from '@/components/Http-game/ImageContainer'
import styles from './styles.module.css'
import WinPopup from '@/components/Http-game/WinPopup'
import Button from '@/components/Ui/Button'

export type Answers = {
    strings: string[]
    correctAnswerText: number
    correctBtnIndex: number
}
type Animal = {
    name: string
    svg: ReactNode
    url: string
}

const animals: Animal[] = [
    {
        name: 'Kutya',
        url: 'https://http.dog/',
        svg: (
            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
                <path d='M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z' />
            </svg>
        ),
    },
    {
        name: 'Pizza',
        url: 'https://http.pizza/',
        svg: (
            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
                <path d='M169.7 .9c-22.8-1.6-41.9 14-47.5 34.7L110.4 80c.5 0 1.1 0 1.6 0c176.7 0 320 143.3 320 320c0 .5 0 1.1 0 1.6l44.4-11.8c20.8-5.5 36.3-24.7 34.7-47.5C498.5 159.5 352.5 13.5 169.7 .9zM399.8 410.2c.1-3.4 .2-6.8 .2-10.2c0-159.1-128.9-288-288-288c-3.4 0-6.8 .1-10.2 .2L.5 491.9c-1.5 5.5 .1 11.4 4.1 15.4s9.9 5.6 15.4 4.1L399.8 410.2zM176 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm64 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM96 384a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z' />
            </svg>
        ),
    },
    {
        name: 'Kacsa',
        url: 'https://httpducks.com/',
        svg: (
            <svg xmlns='http://www.w3.org/2000/svg' width='1.3em' viewBox='0 0 209.322 209.322'>
                <g>
                    <path
                        d={`M105.572,101.811c9.889-6.368,27.417-16.464,28.106-42.166c0.536-20.278-9.971-49.506-49.155-50.878
		C53.041,7.659,39.9,28.251,36.071,46.739l-0.928-0.126c-1.932,0-3.438,1.28-5.34,2.889c-2.084,1.784-4.683,3.979-7.792,4.308
		c-3.573,0.361-8.111-1.206-11.698-2.449c-4.193-1.431-6.624-2.047-8.265-0.759c-1.503,1.163-2.178,3.262-2.028,6.226
		c0.331,6.326,4.971,18.917,16.016,25.778c7.67,4.765,16.248,5.482,20.681,5.482c0.006,0,0.006,0,0.006,0
		c2.37,0,4.945-0.239,7.388-0.726c2.741,4.218,5.228,7.476,6.037,9.752c2.054,5.851-27.848,25.087-27.848,55.01
		c0,29.916,22.013,48.475,56.727,48.475h55.004c30.593,0,70.814-29.908,75.291-92.48C180.781,132.191,167.028,98.15,105.572,101.811
		z M18.941,77.945C8.775,71.617,4.992,58.922,5.294,55.525c0.897,0.24,2.194,0.689,3.228,1.042
		c4.105,1.415,9.416,3.228,14.068,2.707c4.799-0.499,8.253-3.437,10.778-5.574c0.607-0.509,1.393-1.176,1.872-1.491
		c0.87,0.315,0.962,0.693,1.176,3.14c0.196,2.26,0.473,5.37,2.362,9.006c1.437,2.761,3.581,5.705,5.646,8.542
		c1.701,2.336,4.278,5.871,4.535,6.404c-0.445,1.184-4.907,3.282-12.229,3.282C30.177,82.591,23.69,80.904,18.941,77.945z
		 M56.86,49.368c0-4.938,4.001-8.943,8.931-8.943c4.941,0,8.942,4.005,8.942,8.943c0,4.931-4.001,8.942-8.942,8.942
		C60.854,58.311,56.86,54.299,56.86,49.368z M149.159,155.398l-20.63,11.169l13.408,9.293c0,0-49.854,15.813-72.198-6.885
		c-11.006-11.16-13.06-28.533,4.124-38.84c17.184-10.312,84.609,3.943,84.609,3.943L134.295,147.8L149.159,155.398z`}
                    />
                </g>
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
        correctAnswerText: 0,
    })
    const [revealed, setRevealed] = useState(false)
    const [animalIdx, setAnimalIdx] = useState(0)
    const [round, setRound] = useState(0)
    const [showPopup, setShowPopup] = useState(false)

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
            correctAnswerText: correctHttpCode,
        })
    }

    function vote(index: number) {
        if (revealed) {
            next()
        } else {
            setRevealed(true)
            if (index == answers.correctBtnIndex) {
                setScore(score => score + 1)
            }
            setRound(numberOfImages => numberOfImages + 1)
            if (round == 9) {
                setShowPopup(true)
            }
        }
    }

    function next() {
        setRevealed(false)
        getRandomUniqueStatuses()
    }

    useEffect(() => {
        getRandomUniqueStatuses()
        setScore(0)
        setRound(0)
    }, [animalIdx])

    return (
        <div className='App'>
            <div className='main-content-column'>
                <Title />
                {showPopup && <WinPopup score={score} onClose={() => setShowPopup(false)} />}

                {animalIdx == -1 ? (
                    <div className='main-content-column'>
                        <div className='flex-section-100'>
                            <div className='instruction'>
                                <h4>Válassz egy állatot, amivel szeretnél játszani!</h4>
                            </div>
                            {animals.map((animal, idx) => (
                                <button key={idx} onClick={() => setAnimalIdx(idx)} className={'button'}>
                                    <h2>{animal.name}</h2>
                                    <div className={styles.icon}>{animal.svg}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='instruction'>
                            <h4>Melyik HTTP állapotkódra utalhat a kép?</h4>
                        </div>
                        <div className='main-content-row'>
                            <div className='sidebar'>
                                <div className='left'>
                                    <h2> Mi is ez a játék? </h2>
                                    <p className={styles.paragraph}>
                                        Biztos találkoztál már az ERROR 404-el! De azt nem biztos, hogy tudtad, hogy pontosan mit is jelent ez, vagy
                                        hogy miért szokott megjelenni.
                                    </p>
                                    <p className={styles.paragraph}>
                                        A weboldalak általában úgy működnek, hogy amikor megnyitsz egy oldalt, a böngésződ elküld egy kérést a
                                        szervernek, amely válaszol a kérésre és jó esetben visszaküldi az oldalt. Ha azonban valami galiba történik,
                                        akkor a szerver weboldal helyett egy hibaüzenetet küld vissza a böngészőnek, amely segít megérteni, mi is
                                        csúszhatott félre.
                                    </p>
                                    <p className={styles.paragraph}>
                                        Ilyen például a HTTP error 404, ami azt jelenti, a szerver nem találta meg a keresett weboldalt vagy fájlt,
                                        mert az nem létezik.
                                    </p>
                                    <p className={styles.paragraph}>
                                        A játék során a feladatod, hogy kitaláld, melyik HTTP állapotkódhoz tartozik az adott, állatokkal illusztrált
                                        kép.
                                    </p>
                                    <Button
                                        text={'Bővebben a HTTP állapotkódokról >'}
                                        color={'transparent'}
                                        onClick={() => window.open('https://hu.wikipedia.org/wiki/HTTP-%C3%A1llapotk%C3%B3dok')}
                                    />
                                </div>
                            </div>
                            <div className='centerbar'>
                                <ImageContainer
                                    errorCode={answers.correctAnswerText}
                                    altText={animals[animalIdx].name}
                                    src={animals[animalIdx].url}
                                    revealed={revealed}
                                />
                            </div>
                            <div className='sidebar result'>
                                <h4>{`${score} megszerzett / ${round} pont`}</h4>
                                <ButtonRowForHttp
                                    answers={answers}
                                    onClick={vote}
                                    revealed={revealed}
                                    onNext={next}
                                    onAbort={() => {
                                        setAnimalIdx(-1)
                                        setRevealed(false)
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
