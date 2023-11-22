'use client'
import React from 'react'
import Link from 'next/link'
import styles from './styles.module.css'

export default function Title() {
    return (
        <Link href={'/'}>
            <h1 className={styles.headerTitle}>
                <span className={'white-text'}>Kir</span>
                -Kuty
            </h1>
        </Link>
    )
}
