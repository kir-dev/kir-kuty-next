import React from 'react'
import styles from './styles.module.css'
import Image from 'next/image'

type imageProps = {
    errorCode: number
    animalName: string
}

export function ImageContainer(props: imageProps) {
    return (
        <div className='content'>
            <div className='relative'>
                <div className={styles.upperCensored}></div>
                <img className={styles.img} src={`https://http.${props.animalName}/${props.errorCode}.jpg`} alt={props.animalName} />
                <div className={styles.censored}>
                    <h2>
                        {props.errorCode} <br /> CENSORED
                    </h2>
                </div>
            </div>
        </div>
    )
}
