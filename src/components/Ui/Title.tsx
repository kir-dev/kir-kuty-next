'use client'
import React from 'react'
import Link from 'next/link'
import styles from './styles.module.css'

export default function Title() {
    return (
        <Link href={'/'}>
            <div className={styles.httpGameTitleContainer}>
                <img src={'/Kir-Dev-vertical.png'} alt={'nem adta be'} style={{ width: '100px' }} />
                <h1 className={styles.headerTitle}>
                    <span className={'orange-text'}>Kir</span>
                    -Kuty
                </h1>
            </div>
        </Link>
    )
}
