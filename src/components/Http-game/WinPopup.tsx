'use client'
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
                <h1>Gratula! </h1>
                <h1>{`${props.score} pontot szereztél!`}</h1>
                <Button onClick={() => router.push('/')} color={'transparent'} text='Vissza a menübe >' />
            </div>
        </div>
    )
}
