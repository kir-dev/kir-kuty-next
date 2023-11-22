import styles from './styles.module.css'
import { ChangeEvent, useEffect, useState } from 'react'

type CodeComposerProps = {
    onCodeChange: (code: string) => void
    code: string
}

export default function CodeComposer(props: CodeComposerProps) {
    const [code, setCode] = useState('')

    useEffect(() => {
        props.onCodeChange(code)
    }, [code])

    useEffect(() => {
        setCode(props.code)
        console.log(props.code)
    }, [props.code])

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        props.onCodeChange(event.target.value)
        setCode(event.target.value)
    }

    return <textarea className={styles.editor} value={code} onChange={handleChange} />
}
