type HtmlSample = {
    difficulty: number
    code: string
    hint?: string
}

export const htmlConsts: HtmlSample[] = [
    {
        difficulty: 1,
        code: 'Ez egy mezei bekezdés',
        hint: 'Próbáld meg a nyitó <p> és a záró </p> taget használni, ahhoz, hogy a szöveg bekezdésbe kerüljön',
    },
    {
        difficulty: 2,
        code: '<h1>Ez egy Címsor 1 bekezdés</h1>',
        hint: 'Próbáld meg a nyitó <h1> és a záró </h1> taget használni, ahhoz, hogy a szöveg címsorba kerüljön. Használd ki a lenti gombok nyújtotta kényelmet',
    },
    {
        difficulty: 3,
        code: '<h2>Ez egy Címsor 2 bekezdés</h2>' + 'és itt egy gomb is : <button>gomb vagyok</button>',
        hint: 'most már három taget is kell használnod(...durva), ahhoz, hogy a fenti szöveg címsorba kerüljön, bekezdés és egy gomb is legyen a szövegben',
    },
    {
        difficulty: 4,
        code: '<h1>Lent egy Címsor 2 bekezdés van a gomb belsejében</h1>' + '<button><h2>fontos gomb vagyok</h2></button>',
    },
]
