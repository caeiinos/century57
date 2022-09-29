
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const detruit = document.querySelector('.destroy')
  const construit = document.querySelector('.create')
  const scoreDisplay = document.getElementById('score')
  const width = 10
  const squares = []
  let constr = true
  let MultiScore = 1
  let score = 300
  scoreDisplay.innerHTML = score

  grid.style.width = (width * 70) + "px"

  detruit.addEventListener("click", construire);
  construit.addEventListener("click", detruire);

  function detruire() {
    construit.removeAttribute('id', 'action__e--sleep')
    detruit.setAttribute('id', 'action__e--sleep')
    constr = true
  }

  function construire() {
    construit.setAttribute('id', 'action__e--sleep')
    detruit.removeAttribute('id', 'action__e--sleep')
    console.log(constr)
    constr = false
  }

  const candyColors = [
    'url("images/v1.png")',
    'url("images/v2.png")',
    'url("images/v3.png")',
    'url("images/v4.png")',
    'url("images/v5.png")'
  ]

  //create your board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      square.setAttribute('id', i)
      square.setAttribute('class', 'empty')
      square.style.backgroundImage = ''
      grid.appendChild(square)
      squares.push(square)
    }
  }
  createBoard()

  squares.forEach(square => square.addEventListener('click', create))

  function create() {
    if (constr && score >= 30 && this.hasAttribute('class', 'empty')) {
      this.style.backgroundImage = candyColors[0]
      this.removeAttribute('class', 'empty')
      score = score - 30
      scoreDisplay.innerHTML = score
    }
    else if (!constr && !this.hasAttribute('class', 'empty')) {
      MultiScore = MultiScore - candyColors.indexOf(squares[i].style.backgroundImage) * 0.1
      this.setAttribute('class', 'empty')
      let oui = candyColors.indexOf(squares[this.getAttribute('id')].style.backgroundImage)
      MultiScore = Math.round((MultiScore - (oui + 1) * 0.1) * 10) / 10
      this.style.backgroundImage = ''
    }
  }

  function checkRowForThree() {
    for (i = width; i < width * width - width; i++) {
      let rowOfThree = [i, i + 1, i - 1, i + width, i - width]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if (rowOfThree.every(index => squares[index].style.backgroundImage >= decidedColor && !isBlank)) {
        scoreDisplay.innerHTML = score
        let next = candyColors.indexOf(decidedColor) + 1;
        MultiScore = Math.round((MultiScore + next * 0.1) * 10) / 10
        squares[i].style.backgroundImage = candyColors[next]
      }
    }
  }
  checkRowForThree()

  window.setInterval(function () {
    checkRowForThree()
  }, 100)

  setInterval(function () {
    score = score + (10 * MultiScore)
    scoreDisplay.innerHTML = score
  }, 10 * 1000);
})

WZoom.create('.grid');