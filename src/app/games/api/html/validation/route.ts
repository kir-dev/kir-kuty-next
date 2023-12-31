'use server'

import { NextResponse } from 'next/server'
import type { Page } from 'puppeteer-core'
import puppeteer from 'puppeteer-core'
import { htmlConsts } from '@/app/games/html/htmlConsts'
import looksSame from 'looks-same'

export interface ValidationBody {
    taskId: number
    solution: string
}

export interface ValidationResponse {
    similar: boolean
}

export async function POST(request: Request): Promise<NextResponse<ValidationResponse>> {
    // we don't do validation here ( •̀ᴗ•́ )
    const body = (await request.json()) as ValidationBody
    const task = htmlConsts[body.taskId]
    if (!body.solution?.length || !task) return NextResponse.json({ similar: false })
    
    const similar = await arePagesSimilar(String(body.solution.toString()), task.code)
    return NextResponse.json({ similar: similar })
}

async function arePagesSimilar(actual: string, expected: string): Promise<boolean> {
    const browser = await puppeteer.connect({
        browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_KEY}`,
    })
    let page
    try {
        page = await browser.newPage()
        await page.setJavaScriptEnabled(false)
        const actualScreenshot = await createHtmlPageScreenshot(page, actual)
        const expectedScreenshot = await createHtmlPageScreenshot(page, expected)
        const similarity = await looksSame(actualScreenshot, expectedScreenshot)
        return similarity.equal
    } catch (e) {
        console.error('Failed to compare html pages', e)
    } finally {
        await browser.close()
    }
    return false
}

async function createHtmlPageScreenshot(page: Page, html: string): Promise<Buffer> {
    await page.setContent(html)
    return page.screenshot({ encoding: 'binary', type: 'png', optimizeForSpeed: true })
}
