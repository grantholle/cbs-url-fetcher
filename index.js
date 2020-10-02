#!/usr/bin/env node

const axios = require('axios')
const { program } = require('commander')
const chalk = require('chalk')
const fs = require('fs')

program
  .version('1.0.0')
  .option('-s, --start <season>', 'The starting season', 1)
  .option('-e, --end <season>', 'The ending season')
  .option('-f --file <path>', 'The file path which to write the output')
  .arguments('<show>')
  .action(async (show, command) => {
    console.log(chalk.blue(`Fetching show details for ${show} starting at season ${command.start}`))

    const start = parseFloat(command.start)
    const end = command.end ? parseFloat(command.end) : Infinity
    let output = ''

    for (let season = start; season <= end; ++season) {
      try {
        const { data } = await axios.get(`https://www.cbs.com/shows/${show}/video/xhr/episodes/page/0/size/9999/xs/0/season/${season}/`)

        if (!data.success) {
          break
        }

        console.log(chalk.blue(`Got details for season ${season}`))
        output += `# Season ${season}\n`
        output += data.result.data.reduce(
          (s, data) => s += `https://www.cbs.com/shows/${show}${data.raw_url}\n`, ''
        )
      } catch (err) {
        console.log(chalk.bgRed(err.message))
      }
    }

    if (command.file) {
      return fs.writeFile(command.file, output, 'utf8', err => {
        if (err) {
          return console.log(chalk.bgRed(err.message))
        }

        console.log(chalk.green(`Successfully wrote results to ${command.file}`))
      })
    }

    console.log(output)
    console.log(chalk.green('Finished!'))
  })

program.parse()
