import MenuItem from '@/components/MenuItem/MenuItem'
import React from 'react'
import Title from '@/components/Ui/Title'

export default function Home() {
    return (
        <main>
            <Title />
            <MenuItem href='games/http' title={'Http'} subTitle={'A cool game'} iconPath={'/kuty.png'} />
            <MenuItem href='games/html' title={'HTML építő'} subTitle={'Another cool game'} iconPath={'/html.png'} />
            <MenuItem href='https://fontero.vercel.app/' title={'Fontero'} subTitle={'Another cool game'} iconPath={'/js.png'} />
        </main>
    )
}
