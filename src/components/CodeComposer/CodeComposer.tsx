'use client'
import styles from './styles.module.css'
import { ChangeEvent, useEffect, useState } from 'react'
import React from 'react'

type CodeComposerProps = {
    onCodeChange: (code: string) => void
    code: string
}

export default function CodeComposer(props: CodeComposerProps) {
    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        props.onCodeChange(event.target.value)
    }

    return <textarea className={styles.editor} value={props.code} onChange={handleChange} />
}
