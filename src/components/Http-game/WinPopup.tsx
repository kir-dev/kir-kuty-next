'use client'
import Link from 'next/link'
import styles from './styles.module.css'
import Button from '../Ui/Button'
import { useRouter } from 'next/navigation'
type props = {
    score: number
    onClose: () => void
}

export default function WinPopup(props: props) {
    const router = useRouter()
    return (
        <div className={styles.popup}>
            <div className={styles.popupMain}>
                <h1>
                    Congratulations! You won! <br />
                    {`Points: ${props.score}`}
                </h1>
                <Button onClick={() => router.push('/')} color={'transparent'} text='Menu' />
            </div>
        </div>
    )
}
