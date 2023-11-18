import React from 'react'
import styles from './styles.module.css'

type imageProps = {
    errorCode: number
}

export function ImageContainer(props: imageProps) {
    return (
        <div className='content'>
            <div className='relative'>
                <img className={styles.img} src={'https://http.dog/' + props.errorCode + '.jpg'} />
                <div className={styles.censored}>
                    <h2> C E N S O R E D </h2>
                </div>
            </div>
        </div>
    )
}
