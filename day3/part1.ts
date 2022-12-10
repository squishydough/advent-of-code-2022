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

const rucksack = fs.readFileSync('input.txt', 'utf8').split('\r\n')

const priorities = rucksack.reduce<number>((acc, item) => {
  // Split the item in half into two compartments
  const compartment1 = item.slice(0, item.length / 2)
  const compartment2 = item.slice(item.length / 2, item.length)

  // Compare each letter in compartment1 to each letter in compartment2
  // Once a duplicate is found, break out of the loop
  let duplicateItem: string | null = null
  for (let i = 0; i < compartment1.length; i++) {
    const letter = compartment1[i]
    if (compartment2.includes(letter)) {
      duplicateItem = letter
      break
    }
  }

  if (!duplicateItem) {
    console.error('No duplicate item found')
    return 0
  }

  // Add the priority of the duplicate item to the accumulator
  return acc + getLetterPriority(duplicateItem)
}, 0)

console.info(
  `The sum of priorities for the rucksack item types is ${priorities}`
)
