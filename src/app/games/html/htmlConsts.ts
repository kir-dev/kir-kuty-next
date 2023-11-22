type HtmlSample = {
    difficulty: number
    code: string
    hint?: string
}

export const htmlConsts: HtmlSample[] = [
    {
        difficulty: 1,
        code: 'Ez egy mezei bekezdés',
    },
    {
        difficulty: 2,
        code: '<h1>Ez egy Címsor 1 bekezdés</h1>',
    },
    {
        difficulty: 3,
        code: '<h2>Ez egy Címsor 2 bekezdés</h2>' + 'és itt egy gomb is : <button>gomb vagyok</button>',
    },
    {
        difficulty: 4,
        code: '<h1>Lent egy Címsor 2 bekezdés van a gomb belsejében</h1>' + '<button><h2>fontos gomb vagyok</h2></button>',
    },
]
