import fs from 'fs'

const opponentLegend = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
} as const

const suggestedLegend = {
  X: 'Rock',
  Y: 'Paper',
  Z: 'Scissors',
} as const

const scores = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
  Win: 6,
  Loss: 0,
  Draw: 3,
} as const

const whatBeats = {
  Rock: 'Paper',
  Paper: 'Scissors',
  Scissors: 'Rock',
} as const

type Round = {
  opponentMove: keyof typeof opponentLegend
  suggestedMove: keyof typeof suggestedLegend
}

const rounds = fs
  .readFileSync('input.txt', 'utf-8')
  // new line separated rounds -> array of rounds
  .split('\r\n')
  // split rounds string into object
  .map((round) => {
    const [opponentMove, suggestedMove] = round.split(' ')
    return { opponentMove, suggestedMove } as Round
  })

const totalScore = rounds.reduce((total, round) => {
  const opponentMove = opponentLegend[round.opponentMove]
  const suggestedMove = suggestedLegend[round.suggestedMove]

  // Initialize player score based on the suggested move
  let playerScore = scores[suggestedMove]

  if (opponentMove === suggestedMove) {
    playerScore += scores.Draw
  } else if (whatBeats[opponentMove] === suggestedMove) {
    playerScore += scores.Win
  } else {
    playerScore += scores.Loss
  }

  return total + playerScore
}, 0)

console.info(`Your total score is ${totalScore}.`)
