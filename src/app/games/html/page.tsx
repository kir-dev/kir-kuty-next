'use client'
import React, { useState } from 'react'
import Title from '@/components/Ui/Title'
import CodeComposer from '@/components/CodeComposer/CodeComposer'
import Canvas from '@/components/CodeComposer/Canvas'
import Button from '@/components/Ui/Button'
import { htmlConsts } from '@/app/games/html/htmlConsts'
import type { ValidationBody, ValidationResponse } from '@/app/games/api/html/validation/route'

const helpButtons = [
    {
        name: '<p>',
        code: '<p></p>',
    },
    {
        name: '<h1>',
        code: '<h1></h1>',
    },
    {
        name: '<h2>',
        code: '<h2></h2>',
    },
    {
        name: '<button>',
        code: '<button></button>',
    },
]
export default function HtmlGame() {
    const [playerLvl, setPlayerLvl] = useState(0)
    const [hintRevealed, setHintRevealed] = useState(false)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const sampleCode = htmlConsts[playerLvl]
    const [playerCode, setPlayerCode] = useState('')

    function handleChildCodeChange(content: string) {
        setIsCorrect(null)
        setIsLoading(false)
        setPlayerCode(content)
    }

    function insertHelpButton(text: string) {
        setPlayerCode(playerCode => playerCode + text)
    }

    function skipLvl() {
        setPlayerLvl(playerLvl => (playerLvl + 1) % htmlConsts.length)
        setHintRevealed(false)
        setIsCorrect(null)
        setIsLoading(false)
    }

    function revealHint() {
        setHintRevealed(!hintRevealed)
    }

    return (
        <div className='App'>
            <div className='main-content-column'>
                <Title />
                <div className='instruction'>
                    <h2>Próbáld meg rekreálni a HTML kódját a minta szövegnek!</h2>
                </div>
                <div className='main-content-row'>
                    <div className='sidebar'>
                        <div className='full-width'>
                            <div className='center'>
                                <h2>Minta</h2>
                            </div>
                            <div className='right next'>
                                <Button text={'Következő'} color={'var(--background)'} onClick={skipLvl} />
                            </div>
                        </div>
                        <Canvas code={sampleCode.code} />
                        <div className='full-width'>
                            <div className='center'>
                                <h2>Hint</h2>
                            </div>
                            <div className='right next'>
                                {hintRevealed ? (
                                    <Button text={'Hint elrejtése'} color='transparent' onClick={revealHint} />
                                ) : (
                                    <Button text={'Hint megtekintése'} color='transparent' onClick={revealHint} />
                                )}
                            </div>
                        </div>
                        <div className={'left'}>{hintRevealed && <p>{sampleCode.hint}</p>}</div>

                        {/*                        disgusting
                        <div className='margin-t-80'></div>
                        <h2> Mi is ez a játék? </h2>
                        <p className='left'>
                            A weboldalak valójában nagyon egyszerű kicsi komponensekből állnak, ezek felépítésére használjuk a HTML kódokat. A
                            feladatod az, hogy megpróbáld lemásolni a mintaként kapott oldalt, hogy a képernyő jobb oldalán is hasonló oldalt kapj!
                            Ehhez írj kódot a középső panelbe!
                        </p>*/}
                    </div>
                    <div>
                        <div className='full-width'>
                            <div className='center'>
                                <h2>Kód</h2>
                            </div>
                        </div>
                        <CodeComposer onCodeChange={handleChildCodeChange} code={playerCode} />
                        <div>
                            {helpButtons.map((cur, index) => (
                                <Button key={index} text={cur.name} color='transparent' onClick={() => insertHelpButton(cur.code)} />
                            ))}
                        </div>
                    </div>

                    <div className='sidebar'>
                        <div className='full-width'>
                            <div className='center'>
                                <h2>Render</h2>
                            </div>
                        </div>
                        <Canvas code={playerCode} />
                        {playerCode && <div className='full-width'>
                            {isLoading && <div className='center'><h2>Egy pillanat...</h2></div>}
                            {isCorrect !== null && <div className='center'>
                                <h2>{isCorrect ? "Helyes! 😊" : "Még nem jó! 😞"}</h2>
                            </div>}
                            <div className='right next'>
                                <Button text='Ellenőrzés' color='transparent' onClick={async () => {
                                    const body: ValidationBody = { taskId: playerLvl, solution: playerCode }
                                    setIsLoading(true)
                                    setIsCorrect(null)
                                    const response = await fetch('api/html/validation', {
                                        method: 'POST',
                                        body: JSON.stringify(body),
                                    })
                                    setIsLoading(false)
                                    setIsCorrect((await response.json() as ValidationResponse).similar)
                                }} />
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
