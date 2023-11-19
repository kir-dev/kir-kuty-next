import Link from 'next/link'
import styles from './styles.module.css'

type MenuItemProps = {
    href: string
    title: string
    subTitle: string
    iconPath: string
}

export default function MenuItem(props: MenuItemProps) {
    return (
        <Link
            href={props.href}
            className={'big-button'}
            style={{
                backgroundImage: `url(` + props.iconPath + `)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <p className={styles.title}>{props.title}</p>
            <p className={styles.subtitle}>{props.subTitle}</p>
        </Link>
    )
}
