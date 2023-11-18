import styles from './styles.module.css'
import { ChangeEvent, useEffect, useState } from 'react'

type CodeComposerProps = {
    onCodeChange: (code: string) => void
}

export default function CodeComposer(props: CodeComposerProps) {
    const [code, setCode] = useState('')

    useEffect(() => {
        props.onCodeChange(code)
    }, [code])

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setCode(event.target.value)
    }

    return <textarea className={styles.editor} value={code} onChange={handleChange} />
}
