import MenuItem from '@/components/MenuItem/MenuItem'
import React from 'react'

export default function Home() {
    return (
        <main>
            <MenuItem href='games/http' title={'Http'} subTitle={'A cool game'} />
            <MenuItem href='https://fontero.vercel.app/' title={'Fontero'} subTitle={'Another cool game'} />
        </main>
    )
}
