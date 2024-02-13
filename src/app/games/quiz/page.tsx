'use client'

import React, { useEffect, useState } from 'react'
import Title from '@/components/Ui/Title'
import styles from '@/app/games/http/styles.module.css'
import { ImageContainer } from '@/components/Http-game/ImageContainer'
import ButtonRowForQuiz from '@/components/Quiz-game/ButtonRowForQuiz'
import axios from 'axios'

export type QuizAnswer = {
    id: string
    text: string
    correct: boolean
    questionId: string
}

type QuizQuestion = {
    id: string
    text: string
    image?: string
    answers: QuizAnswer[]
}

export default function QuizPage() {
    const [questions, setQuestions] = useState<any[]>([])
    const [answers, setAnswers] = useState<QuizAnswer[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>()
    const [score, setScore] = useState(0)
    const [numOfRounds, setnumOfRounds] = useState(0)
    const [revealed, setRevealed] = useState(false)

    async function fetchQuestions() {
        try {
            const response = await axios.get('http://localhost:3300' + '/question', {})
            setQuestions(response.data)
            //console.log('questions', questions)
        } catch (ex) {}
    }

    function startNewQuiz() {
        setScore(0)
        setnumOfRounds(0)
        startNewRound()
    }

    function startNewRound() {
        setRevealed(false)
        const nextQuestion = questions[Math.floor(Math.random() * questions.length)]
        setCurrentQuestion(nextQuestion)
        console.log('nextQuestion', nextQuestion)
        setnumOfRounds(numOfRounds + 1)
    }

    function vote(id: number) {
        if (currentQuestion === undefined) return

        setRevealed(true)
        if (currentQuestion!.answers![id].correct) {
            setScore(score + 1)
        }
    }

    useEffect(() => {
        async function cuccmucc() {
            await fetchQuestions()
            startNewQuiz()
        }

        cuccmucc()
    }, [])

    return (
        <div className='App'>
            <div className='main-content-column'>
                <Title />
                <div className='instruction'>
                    <h2>Mi lehet a helyes válasz?</h2>
                </div>
                <div className='main-content-row'>
                    <div className='sidebar'>afdafadfs</div>
                    <div className='centerbar'>
                        {currentQuestion && <ImageContainer altText={'Missing picture'} src={currentQuestion?.image!} revealed={true} />}
                        {currentQuestion && <p>{currentQuestion?.text}</p>}
                    </div>
                    <div className='sidebar result'>
                        <p className={styles.score}>{`${score} megszerzett / ${numOfRounds} pont`}</p>
                    </div>
                </div>
                {currentQuestion?.answers && (
                    <ButtonRowForQuiz
                        answers={currentQuestion?.answers}
                        onClick={vote}
                        revealed={revealed}
                        onNext={startNewRound}
                        onAbort={() => {
                            setRevealed(false)
                        }}
                    />
                )}
            </div>
        </div>
    )
}
