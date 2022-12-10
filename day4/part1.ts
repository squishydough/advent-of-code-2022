import fs from 'fs'

type Elf = {
  range: {
    start: number
    end: number
  }
}

function start() {
  const elves = fs
    // Read all lines from the input.txt file
    .readFileSync('input.txt', 'utf-8')
    // Split each line into an array
    .split(/\r?\n/)
    // Convert each array item into an array of elves and
    // the ranges they are responsible for
    .map<Elf[]>((section) => {
      const elfRanges = section.split(',')

      const elves: Elf[] = elfRanges.map((range) => {
        const [start, end] = range.split('-').map((value) => Number(value))
        return {
          range: {
            start,
            end,
          },
        }
      })

      return elves
    })

  const answer = elves.reduce((acc, section) => {
    const [elf1, elf2] = section
    let isFullyContained = false

    // If elf1 fully contains elf2
    if (
      elf1.range.start <= elf2.range.start &&
      elf1.range.end >= elf2.range.end
    ) {
      isFullyContained = true
    }

    // if elf2 fully contains elf1
    if (
      elf2.range.start <= elf1.range.start &&
      elf2.range.end >= elf1.range.end
    ) {
      isFullyContained = true
    }

    // Add 1 if one elf's range is fully contained by the other
    // Otherwise add 0
    const score = Number(isFullyContained)

    return acc + score
  }, 0)

  console.info(
    `There are ${answer} pairs of elves where one range fully contains the other.`
  )
}

start()
