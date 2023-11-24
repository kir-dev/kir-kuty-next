type HtmlSample = {
    difficulty: number
    code: string
    hint?: string
}

export const htmlConsts: HtmlSample[] = [
    {
        difficulty: 1,
        code: '<p>Lorem Ipsum</p>',
        hint: 'Próbáld meg a nyitó <p> és a záró </p> taget használni, ahhoz, hogy a szöveg bekezdésbe kerüljön',
    },
    {
        difficulty: 2,
        code: '<h1>A Kir-Dev a legjobb</h1>',
        hint: 'Próbáld meg a nyitó <h1> és a záró </h1> taget használni, ahhoz, hogy a szöveg címsorba kerüljön. Használd ki a lenti gombok nyújtotta kényelmet',
    },
    {
        difficulty: 3,
        code:
            '<h2>Pilinszky János - Átváltozás</h2>' +
            '<p> Rossz voltam, s te azt mondtad, jó vagyok.<br></br>' +
            'Csúf, de te gyönyörűnek találtál.<br></br>' +
            'Végig hallgattad mindig, amit mondtam.<br></br>' +
            'Halandóból így lettem halhatatlan.</p>' +
            '<button href="https://hu.wikipedia.org/wiki/Pilinszky_J%C3%A1nos">Wikipedia</button>',
        hint: 'most már három taget is kell használnod(...durva), ahhoz, hogy a fenti szöveg címsorba kerüljön, bekezdés és egy gomb is legyen a szövegben',
    },
    {
        difficulty: 3,
        code:
            '<h2>Pilinszky János - Átváltozás</h2>' +
            '<p> Rossz voltam, s te azt mondtad, jó vagyok.<br></br>' +
            'Csúf, de te gyönyörűnek találtál.<br></br>' +
            'Végig hallgattad mindig, amit mondtam.<br></br>' +
            'Halandóból így lettem halhatatlan.</p>' +
            '<button href="https://hu.wikipedia.org/wiki/Pilinszky_J%C3%A1nos"><h2>Wikipedia</h2></button>',
        hint: 'most már három taget is kell használnod(...durva), ahhoz, hogy a fenti szöveg címsorba kerüljön, bekezdés és egy gomb is legyen a szövegben',
    },
]
