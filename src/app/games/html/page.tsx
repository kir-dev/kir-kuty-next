'use client'
import React, { useState } from 'react'
import Title from '@/components/Ui/Title'
import CodeComposer from '@/components/CodeComposer/CodeComposer'
import Canvas from '@/components/CodeComposer/Canvas'
import Button from '@/components/Ui/Button'
import { htmlConsts } from '@/app/games/html/htmlConsts'

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

    var html_code = htmlConsts[playerLvl]
    const [sampleCode, setSampleCode] = useState(html_code)
    const [playerCode, setPlayerCode] = useState('')

    function handleChildCodeChange(content: string) {
        setPlayerCode(content)
    }

    function insertHelpButton(text: string) {
        setPlayerCode(playerCode => playerCode + text)
    }

    function skipLvl() {
        setPlayerLvl(playerLvl => (playerLvl + 1) % htmlConsts.length)
        setSampleCode(htmlConsts[playerLvl])
        setHintRevealed(false)
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
                        {hintRevealed && <p>{sampleCode.hint}</p>}
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
                    </div>
                </div>
            </div>
        </div>
    )
}
