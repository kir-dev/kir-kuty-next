'use client'
import React from 'react'
import Link from 'next/link'
import styles from './styles.module.css'

export default function Title() {
    return (
        <Link href={'/'}>
            {/*<img
                src={'https://github.com/kir-dev/kir-kuty-next/blob/5e3f7f454b5cdd5a849acd5bf37c7539f8719102/public/Kir-Dev-vertical.png'}
                alt={'nem adta be'}
            />*/}
            <h1 className={styles.headerTitle}>
                <span className={'white-text'}>Kir</span>
                -Kuty
            </h1>
        </Link>
    )
}
