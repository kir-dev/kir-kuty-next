'use client'
import React, { useState } from 'react'
import Title from '@/components/Ui/Title'
import CodeComposer from '@/components/CodeComposer/CodeComposer'
import Canvas from '@/components/CodeComposer/Canvas'
import Button from '@/components/Ui/Button'
import { htmlConsts } from '@/app/games/html/htmlConsts'

export default function HtmlGame() {
    var html_code = htmlConsts[0].code

    const [playerCode, setPlayerCode] = useState('')
    const [sampleCode, setSampleCode] = useState(html_code)

    const helpButtons = [
        {
            name: '<button>',
            code: '<button></button>',
        },
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
    ]

    function handleChildCodeChange(content: string) {
        setPlayerCode(content)
    }

    function insertHelpButton(text: string) {
        setPlayerCode(playerCode => playerCode + text)
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
                                <Button text={'Következő'} color={'var(--background)'} onClick={() => {}} />
                            </div>
                        </div>
                        <Canvas code={sampleCode} />
                        <div className='full-width'></div>
                        <Button text={'Hint megtekintése'} color='transparent' onClick={() => {}} />
                        <p>adsfj;kldsfjadskfjads;k fadskfhadsf</p>
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
