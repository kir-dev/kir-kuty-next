import MenuItem from '@/components/MenuItem/MenuItem'
import React from 'react'
import Title from '@/components/Ui/Title'

export default function Home() {
    return (
        <main>
            <Title />
            <MenuItem href='games/http' title={'Http'} subTitle={'A cool game'} />
            <MenuItem href='games/html' title={'HTML építő'} subTitle={'Another cool game'} />
            <MenuItem href='https://fontero.vercel.app/' title={'Fontero'} subTitle={'Another cool game'} />
        </main>
    )
}
