import styles from './styles.module.css'

interface CanvasProps {
    code: string
}

export default function Canvas(props: CanvasProps) {
    return <div className={styles.canvas} dangerouslySetInnerHTML={{ __html: props.code }}></div>
}
