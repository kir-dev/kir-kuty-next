import React from 'react'
import styles from './styles.module.css'
import Image from 'next/image'

type imageProps = {
    errorCode: number
    animalName: string
    src: string
}

export function ImageContainer(props: imageProps) {
    return (
        <div className='content'>
            <div className='relative'>
                <div style={{ width: 700, height: 600 }}>
                    <Image
                        className={styles.img}
                        src={`${props.src}/${props.errorCode}.jpg`}
                        width={1}
                        height={1}
                        layout={'responsive'}
                        alt={props.animalName}
                    />
                </div>
                {/*<div className={styles.censored}>
                    <h2>
                        {props.errorCode} <br /> CENSORED
                    </h2>
                </div>*/}
            </div>
        </div>
    )
}
