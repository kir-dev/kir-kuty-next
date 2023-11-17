import Link from "next/link";
import {Url} from "url";
import styles from './styles.module.css'


type MenuItemProps ={
    href: string
    title: string
    subTitle: string
}

export default function MenuItem(props: MenuItemProps){
    return(
        <Link href= {props.href} className={styles.menu}>
            <p className={styles.title}>
                {props.title}
            </p>
            <p className={styles.subtitle}>
                {props.subTitle}
            </p>
        </Link>
    )

}