'use client'
import React, { useState } from 'react'
import Title from '@/components/Ui/Title'
import CodeComposer from '@/components/CodeComposer/CodeComposer'
import Canvas from '@/components/CodeComposer/Canvas'
import Button from '@/components/Ui/Button'

export default function HtmlGame() {
    const html_code: string =
        '<!DOCTYPE html>\n' +
        '<html>\n' +
        '<body>\n' +
        '\n' +
        '<h2 title="I\'m a header">The title Attribute</h2>\n' +
        '\n' +
        '<p title="I\'m a tooltip">Mouse over this paragraph, to display the title attribute as a tooltip.</p>\n' +
        '\n' +
        '</body>\n' +
        '</html>\n' +
        '<n></n>'

    const [playerCode, setPlayerCode] = useState(html_code)
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
