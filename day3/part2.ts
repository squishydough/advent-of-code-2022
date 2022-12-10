import fs from 'fs'

/**
 * Receives a letter and returns the numerical value of it.
 * a = 1, b = 2, c = 3, ..., z = 26, A = 27, B = 28, ..., Z = 52
 * @param letter - letter to score
 * @returns
 */
function getLetterPriority(letter: string): number {
  const isLetterUppercase = letter === letter.toUpperCase()

  // If the letter is uppercase, we need to add 26 to the score
  const uppercaseOffset = isLetterUppercase ? 26 : 0

  // If the letter is uppercase, we need to subtract 64 from the character code
  // Otherwise, subtract 96
  const charCodeOffset = isLetterUppercase ? 64 : 96
  const characterCode = letter.charCodeAt(0) - charCodeOffset

  return characterCode + uppercaseOffset
}

function start() {
  const rucksacks = fs
    .readFileSync('input.txt', 'utf-8')
    // split at new lines
    .split(/\r?\n/)

  let totalPriorities = 0

  // Loop through the rucksacks in groups of 3
  for (let i = 0; i < rucksacks.length; i += 3) {
    // Get the rucksack items
    const rucksack1 = rucksacks[i]
    const rucksack2 = rucksacks[i + 1]
    const rucksack3 = rucksacks[i + 2]

    for (let j = 0; j < rucksack1.length; j++) {
      const item = rucksack1[j]

      if (rucksack2.includes(item) && rucksack3.includes(item)) {
        totalPriorities += getLetterPriority(item)
        break
      }
    }
  }

  console.info(`Total priorities: ${totalPriorities}`)
}

start()
