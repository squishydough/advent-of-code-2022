// Advent of Coding Day 1
// https://adventofcode.com/2022/day/1

import fs from 'fs'

type Elf = { index: number; calories: number }

const ELVES_NEEDED = 3
let highestCalorieElves: Elf[] = []

fs
  // read the file
  .readFileSync('input.txt', 'utf-8')
  // split on the empty new lines
  .split('\r\n\r\n')
  // convert each multiline chunk to an array of items, one array for each elf
  .map((input) => input.split('\r\n'))
  // get total calories for each elf
  .map((elf) =>
    elf.reduce((total, item) => {
      return total + Number(item)
    }, 0)
  )
  // find the highest calorie elves
  .forEach((calories, index) => {
    // If we don't yet have the needed elves, just add this one
    if (highestCalorieElves.length < ELVES_NEEDED) {
      highestCalorieElves.push({ index, calories })
      return
    }

    // Find the lowest calorie elf in the current list
    const lowestCalorieElf = highestCalorieElves.reduce((lowest, elf) => {
      if (elf.calories < lowest.calories) return elf
      return lowest
    })

    // If current elf calories is more than the lowest calorie elf, replace it
    if (lowestCalorieElf.calories < calories) {
      highestCalorieElves = highestCalorieElves.map((elf) =>
        elf.calories === lowestCalorieElf.calories ? { index, calories } : elf
      )
    }
  })

// Total the calories for the required elves
const totalCalories = highestCalorieElves.reduce(
  (total, elf) => total + elf.calories,
  0
)

console.info(
  `The top ${ELVES_NEEDED} elves have a combined ${totalCalories} calories.`
)
