// Advent of Coding Day 1
// https://adventofcode.com/2022/day/1

import fs from 'fs'

const elves = fs
  .readFileSync('input.txt', 'utf-8') // read the file
  .split('\r\n\r\n') // split on the empty new lines
  .map((input) => input.split('\r\n')) // convert each multiline chunk to an array of items, one array for each elf

console.info(`There are ${elves.length} elves.`)

let highestCalorieElf: { index: number; calories: number } = {
  index: -1,
  calories: -1,
}

elves.forEach((elf, index) => {
  const calories = elf.reduce<number>((total, item) => {
    return total + Number(item)
  }, 0)

  if (calories > highestCalorieElf.calories) {
    highestCalorieElf = { index, calories }
  }
})

console.info(
  `The highest calorie elf is ${highestCalorieElf.index} with ${highestCalorieElf.calories} calories.`
)
