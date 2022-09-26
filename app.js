document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const width = 10
  const squares = []
  let score = 0

  grid.style.width = (width * 70) + "px"

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
      square.style.backgroundImage = ''
      grid.appendChild(square)
      squares.push(square)
    }
  }
  createBoard()

  squares.forEach(square => square.addEventListener('click', create))

  function create() {
    this.style.backgroundImage = candyColors[0]
  }

  function checkRowForThree() {
    for (i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i - 1, i + width, i - width]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''
      let oui = squares[i].style.backgroundImage

      // if (arr[3] !== undefined) {
      // }

      if (rowOfThree.every(index => squares[index].style.backgroundImage >= decidedColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        let next = candyColors.indexOf(decidedColor) + 1;
        squares[i].style.backgroundImage = candyColors[next]
      }
    }
  }
  checkRowForThree()

  window.setInterval(function () {
    checkRowForThree()
  }, 100)
})
