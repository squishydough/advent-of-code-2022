import fs from 'fs'

const movesLegend = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
} as const

const outcomeLegend = {
  X: 'Loss',
  Y: 'Draw',
  Z: 'Win',
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

type Moves = keyof typeof whatBeats

type Round = {
  opponentMove: keyof typeof movesLegend
  outcome: keyof typeof outcomeLegend
}

const rounds = fs
  .readFileSync('input.txt', 'utf-8')
  // new line separated rounds -> array of rounds
  .split('\r\n')
  // split rounds string into object
  .map((round) => {
    const [opponentMove, outcome] = round.split(' ')
    return { opponentMove, outcome } as Round
  })

const totalScore = rounds.reduce((total, round) => {
  const opponentMove = movesLegend[round.opponentMove]
  const outcome = outcomeLegend[round.outcome]

  let playerMove: Moves
  if (outcome === 'Draw') {
    playerMove = movesLegend[round.opponentMove]
  } else if (outcome === 'Win') {
    playerMove = whatBeats[opponentMove]
  } else {
    playerMove = Object.keys(whatBeats).find(
      (key) => whatBeats[key as Moves] === opponentMove
    ) as Moves
  }

  return total + scores[outcome] + scores[playerMove]
}, 0)

console.info(`Your total score is ${totalScore}.`)
