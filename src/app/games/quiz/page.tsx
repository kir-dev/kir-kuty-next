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
    question: QuizQuestion
}

type QuizQuestion = {
    id: string
    text: string
    image: string
    answers: QuizAnswer[]
}

export default function QuizPage() {
    const [questions, setQuestions] = useState<QuizQuestion[]>([])
    const [answers, setAnswers] = useState<QuizAnswer[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>()
    const [currentAnswers, setCurrentAnswers] = useState<QuizAnswer[]>()
    const [score, setScore] = useState(0)
    const [numOfRounds, setnumOfRounds] = useState(0)
    const [revealed, setRevealed] = useState(false)

    async function fetchQuestions() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/question', {})
            const data = await response.data
            console.log(data)
            data.map((question: QuizQuestion) => {
                setQuestions(prev => [...prev, question])
                question.answers.map((answer: QuizAnswer) => {
                    setAnswers(prev => [...prev, answer])
                })
            })
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
        const nextAnswers = answers.filter(answer => answer.question === nextQuestion)
        setCurrentAnswers(nextAnswers)
    }

    function vote(id: number) {
        setRevealed(true)
        if (currentAnswers![id].correct) {
            setScore(score + 1)
        }
    }

    useEffect(() => {
        fetchQuestions()
        startNewQuiz()
    }, [])

    return (
        <div className='App'>
            <div className='main-content-column'>
                <Title />
                <div className='instruction'>
                    <h2>Mi lehet a helyes válasz?</h2>
                </div>
                <div className='main-content-row'>
                    <div className='sidebar'>fasdf</div>
                    <div className='centerbar'>
                        {currentQuestion && <ImageContainer altText={'Missing picture'} src={currentQuestion?.image!} revealed={true} />}
                    </div>
                    <div className='sidebar result'>
                        <p className={styles.score}>{`${score} megszerzett / ${numOfRounds} pont`}</p>
                    </div>
                </div>
                {currentAnswers && (
                    <ButtonRowForQuiz
                        answers={currentAnswers}
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
