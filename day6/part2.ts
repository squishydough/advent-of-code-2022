import { input, tests } from './input'

function start(datastream: string) {
  let messageStart = -1
  let message = ''

  const MESSAGE_SIZE = 14

  for (let i = 0; i < datastream.length; i++) {
    // grab 14-letter chunk, splitting letters into an array
    const candidate = datastream.slice(i, i + MESSAGE_SIZE).split('')

    let validCandidate = true
    for (let j = 0; j < candidate.length; j++) {
      const letter = candidate[j]
      // check if letter found anywhere else in the 4-letters
      // if candidate index and j are the same, then it's the
      // exact same character slot and should not count as a duplicate
      const isDuplicate =
        candidate.findIndex((c, index) => c === letter && index !== j) > -1

      if (isDuplicate) {
        validCandidate = false
        break
      }
    }

    if (validCandidate) {
      messageStart = i + MESSAGE_SIZE
      message = candidate.join('')
      break
    }
  }

  console.info(
    `The first start-of-message marker was detected at character ${messageStart}, message: ${message}`
  )
}

start(tests[0]) // answer is 19
start(tests[1]) // answer is 23
start(tests[2]) // answer is 23
start(tests[3]) // answer is 29
start(tests[4]) // answer is 26
start(input)
