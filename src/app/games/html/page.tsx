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

    function handleChildCodeChange(content: string) {
        setPlayerCode(content)
    }

    return (
        <div className='App'>
            <Title />
            <div className='container'>
                <div className='main-content'>
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
                            <div className='right next'>
                                <Button text={'Renderelés'} color={'var(--background)'} onClick={() => {}} />
                            </div>
                        </div>
                        <CodeComposer onCodeChange={handleChildCodeChange} />
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