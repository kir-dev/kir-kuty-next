'use client'

import React, { useEffect, useState } from 'react'
import Title from '@/components/Ui/Title'
import { ImageContainer } from '@/components/Http-game/ImageContainer'
import ButtonRowForQuiz from '@/components/Quiz-game/ButtonRowForQuiz'
import axios from 'axios'
import WinPopup from '@/components/Http-game/WinPopup'

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

const testQuestion: QuizQuestion = {
    id: '1',
    text: 'Mi a fővárosa Magyarországnak?',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/025/181/412/small/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg',
    answers: [
        { id: '1', text: 'Budapest asdf;jfasdlkfj;adflkjadsf', correct: true, questionId: '1' },
        { id: '2', text: 'Debrecen asdf;jfasdlkfj;adflkjadsf', correct: false, questionId: '1' },
        { id: '3', text: 'Szeged asdf;jfasdlkfj;adflkjadsf', correct: false, questionId: '1' },
        { id: '4', text: 'Pécs asdf;jfasdlkfj;adflkjadsf', correct: false, questionId: '1' },
    ],
}

export default function QuizPage() {
    const [questions, setQuestions] = useState<any[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>()
    const [score, setScore] = useState(0)
    const [round, setRound] = useState(0)
    const [revealed, setRevealed] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [offsetIfNoAns, setOffsetIfNoAns] = useState(0)

    async function fetchQuestions() {
        try {
            const response = await axios.get('https://api.kir-kuty.kir-dev.hu/question', {})
            setQuestions(response.data)
        } catch (ex) {}
    }

    async function startNewQuiz() {
        await fetchQuestions()
        setScore(0)
        setRound(0)
        startNewRound()
    }

    function startNewRound() {
        setRevealed(false)

        let nextQuestion = questions[round + offsetIfNoAns]
        while (nextQuestion && !nextQuestion.answers) {
            setOffsetIfNoAns(offsetIfNoAns + 1)
            nextQuestion = questions[round + offsetIfNoAns]
        }
        setCurrentQuestion(nextQuestion)
    }

    function vote(id: number) {
        if (currentQuestion === undefined) return

        if (revealed) {
            setRevealed(false)
            startNewRound()
            return
        }

        setRevealed(true)
        setRound(round + 1)
        if (currentQuestion!.answers![id].correct) {
            setScore(score + 1)
        }

        if (round + offsetIfNoAns >= questions.length || round >= 10) {
            setShowPopup(true)
        }
    }

    useEffect(() => {
        startNewQuiz()
    }, [])

    return (
        <div className='App'>
            <div className='main-content-column'>
                <Title />
                {showPopup && <WinPopup score={score} onClose={() => setShowPopup(false)} />}
                <div className='instruction'>
                    <h4>Mi lehet a helyes válasz?</h4>
                </div>
                <div className='main-content-row'>
                    <div className='sidebar'></div>
                    <div className='centerbar'>
                        {currentQuestion && currentQuestion.image && (
                            <ImageContainer altText={'Missing picture'} src={currentQuestion?.image!} revealed={true} small={true} />
                        )}
                        {currentQuestion && <h1>{currentQuestion.text}</h1>}
                        {!currentQuestion && <p>Loading questions...</p>}
                    </div>
                    <div className='sidebar result'>
                        <h3>{`${score} megszerzett / ${round} pont`}</h3>
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
