import MenuItem from '@/components/MenuItem/MenuItem'
import React from 'react'
import Title from '@/components/Ui/Title'

export default function Home() {
    return (
        <main className='main-content-column'>
            <Title />
            <div className='flex-section-100 padding-16'>
                <MenuItem
                    href='games/http'
                    title={'Kir-Kuty'}
                    subTitle={'Találd ki melyik HTTP hibakódot ábrázolják a kutyás-kacsás-pizzás képek!'}
                    iconPath={'/kuty.png'}
                />
                <MenuItem href='games/html' title={'HTML építő'} subTitle={'Alkosd meg saját weboldalad a minta alapján!'} iconPath={'/html.png'} />
                <MenuItem href='/games/quiz' title={'Kir-Quiz'} subTitle={'És te mennyit tudsz a körről?'} iconPath={'/quiz.png'} />
                <MenuItem href='https://fontero.vercel.app/' title={'Fontero'} subTitle={'Egy másik nagyon kafa játék!'} iconPath={'/js.png'} />
            </div>
        </main>
    )
}
