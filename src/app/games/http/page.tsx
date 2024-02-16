'use client'
import React, { useEffect, useState } from 'react'
import Title from '@/components/Ui/Title'
import ButtonRowForHttp from '@/components/Http-game/ButtonRowForHttp'
import { ImageContainer } from '@/components/Http-game/ImageContainer'
import styles from './styles.module.css'
import WinPopup from '@/components/Http-game/WinPopup'
import Button from '@/components/Ui/Button'
import { QuizType, quizTypes } from '@/components/Quiz-game/QuizTypes'
import { generateHttpQuestions, Option, Question } from '@/app/games/http/httpStatuses'

export default function HttpGame() {
    const [quizType, setQuizType] = useState<QuizType | undefined>()
    const [questions, setQuestions] = useState<Question[]>([])

    useEffect(() => {
        setQuestions(!quizType ? [] : generateHttpQuestions())
    }, [quizType, setQuestions])

    return (
        <div className='App'>
            <div className='main-content-column'>
                <Title />
                {!quizType ? (
                    <QuizTypeSelect setQuizType={setQuizType} />
                ) : (
                    <HttpCodeQuiz questions={questions} quizType={quizType} setQuizType={setQuizType} />
                )}
            </div>
        </div>
    )
}

interface QuizTypeSelectProps {
    setQuizType: (animal: QuizType) => void
}

function QuizTypeSelect({ setQuizType }: QuizTypeSelectProps) {
    return (
        <div className='main-content-column'>
            <div className='flex-section-100'>
                <div className='instruction'>
                    <h4>Válassz egy állatot, amivel szeretnél játszani!</h4>
                </div>
                {quizTypes.map(animal => (
                    <button key={animal.name} onClick={() => setQuizType(animal)} className={'button'}>
                        <h2>{animal.name}</h2>
                        <div className={styles.icon}>{animal.svg}</div>
                    </button>
                ))}
            </div>
        </div>
    )
}

interface HttpCodeQuizProps {
    questions: Question[]
    quizType: QuizType
    setQuizType: (animal?: QuizType) => void
}

function HttpCodeQuiz({ questions, quizType, setQuizType }: HttpCodeQuizProps) {
    const [revealed, setRevealed] = useState(false)
    const [round, setRound] = useState(0)
    const [score, setScore] = useState(0)
    const [showPopup, setShowPopup] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
    const currentQuestion: Option[] | undefined = questions[currentQuestionIndex]?.options

    function goNext() {
        if (currentQuestionIndex == questions.length - 1) {
            setShowPopup(true)
        } else {
            setRevealed(false)
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }
    }

    function vote(option: Option) {
        if (revealed) {
            goNext()
        } else {
            setRevealed(true)
            if (option.correct) {
                setScore(score + 1)
            }
            setRound(round + 1)
            if (round == questions.length - 1) {
                setShowPopup(true)
            }
        }
    }

    return (
        <>
            {showPopup && <WinPopup score={score} onClose={() => setShowPopup(false)} />}

            <div className='instruction'>
                <h4>Melyik HTTP állapotkódra utalhat a kép?</h4>
            </div>
            <div className='main-content-row'>
                <div className='sidebar'>
                    <div className='left'>
                        <h2> Mi is ez a játék? </h2>
                        <p>
                            Biztos találkoztál már az ERROR 404-el! De azt nem biztos, hogy tudtad, hogy pontosan mit is jelent ez, vagy hogy miért
                            szokott megjelenni.
                        </p>
                        <p>
                            A weboldalak általában úgy működnek, hogy amikor megnyitsz egy oldalt, a böngésződ elküld egy kérést a szervernek, amely
                            válaszol a kérésre és jó esetben visszaküldi az oldalt. Ha azonban valami galiba történik, akkor a szerver weboldal
                            helyett egy hibaüzenetet küld vissza a böngészőnek, amely segít megérteni, mi is csúszhatott félre.
                        </p>
                        <p>
                            Ilyen például a HTTP error 404, ami azt jelenti, a szerver nem találta meg a keresett weboldalt vagy fájlt, mert az nem
                            létezik.
                        </p>
                        <p>A játék során a feladatod, hogy kitaláld, melyik HTTP állapotkódhoz tartozik az adott, állatokkal illusztrált kép.</p>
                        <Button
                            text={'Bővebben a HTTP állapotkódokról >'}
                            color={'transparent'}
                            onClick={() => window.open('https://hu.wikipedia.org/wiki/HTTP-%C3%A1llapotk%C3%B3dok')}
                        />
                    </div>
                </div>
                <div className='centerbar'>
                    <ImageContainer
                        errorCode={currentQuestion?.find(option => option.correct)?.value.code ?? 0}
                        altText={quizType.name}
                        src={quizType.url}
                        revealed={revealed}
                    />
                </div>
                <div className='sidebar result'>
                    <h4>{`${score} megszerzett / ${round} pont`}</h4>
                </div>
            </div>
            <ButtonRowForHttp
                options={currentQuestion}
                onClick={vote}
                revealed={revealed}
                onNext={goNext}
                onAbort={() => {
                    setQuizType(undefined)
                    setRevealed(false)
                }}
            />
        </>
    )
}
