'use strict'

const path = require('path')

const pMap = require('p-map')
const ora = require('ora')

const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')

module.exports = async ({ outputDir, url, fullPage = true }) => {
  const spinner = ora()
  spinner.info(outputDir)
  spinner.start('Launching Chromium')
  spinner.color = 'yellow'

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const selectDevices = devices
  await pMap(
    selectDevices,
    async (currentDevice, i) => {
      spinner.text = `[${i + 1}/${selectDevices.length}] ${currentDevice.name}`
      await page.emulate(currentDevice)
      await page.goto(url)
      await page.screenshot({
        path: path.join(outputDir, `${currentDevice.name}.png`),
        fullPage,
      })
    },
    { concurrency: 1 },
  )

  browser.close()
}
