import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const htmlPath = path.join(__dirname, 'index.html')
const outPath = path.resolve(__dirname, '../public/cv.pdf')

const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
})

try {
  const page = await browser.newPage()
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 60_000 })
  await page.evaluate(() => document.fonts.ready)
  await page.emulateMedia({ media: 'print' })
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
  })
  console.log(`Wrote ${outPath}`)
} finally {
  await browser.close()
}
