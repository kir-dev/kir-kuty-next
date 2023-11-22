import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Image from 'next/image'

type ImageProps = {
    errorCode: number
    animalName: string
    src: string
    revealed: boolean
}

export function ImageContainer(props: ImageProps) {
    const [loading, setLoading] = useState(true)

    const handleLoadingComplete = () => {
        setLoading(false)
    }

    useEffect(() => {
        console.log('loading: ' + loading)
    }, [loading])

    return (
        <div className='content'>
            <div className='relative'>
                <div style={{ width: 700, height: 600 }}>
                    {loading && <div className={styles.placeholder}>Loading...</div>}
                    <Image
                        className={styles.img}
                        src={`${props.src}/${props.errorCode}.jpg`}
                        width={1}
                        height={1}
                        layout={'responsive'}
                        alt={props.animalName}
                        placeholder='empty' // This is important to prevent rendering the previous image
                        onLoad={handleLoadingComplete}
                    />
                </div>
                {!props.revealed && (
                    <div className={styles.censored}>
                        <h2>CENSORED</h2>
                    </div>
                )}
            </div>
        </div>
    )
}
