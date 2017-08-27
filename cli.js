'use strict'

const tempy = require('tempy')
const yargs = require('yargs')

const capz = require('.')

async function main() {
  const { argv } = yargs
    .option('output-dir', {
      alias: 'o',
      describe: 'Set screenshot output directory, default to random temp dir',
    })
    .option('url', {
      describe: 'Specify url for screenshots',
    })
    .demandOption(['url'])
    .help()
  await capz({
    outputDir: argv.outputDir || tempy.directory(),
    url: argv.url,
  })
}

main()
