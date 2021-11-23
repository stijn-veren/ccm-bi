const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [2000, 2000],
}

let img
let iw, ih

const imgCanvas = document.createElement('canvas')
const imgContext = imgCanvas.getContext('2d')

const sketch = ({ context, width, height }) => {
  const cell = 10
  const cols = Math.floor(width / cell)
  const rows = Math.floor(height / cell)
  const numCells = cols * rows

  imgCanvas.width = cols
  imgCanvas.height = rows

  console.log([cell, cols, rows, numCells])

  return ({ context, width, height }) => {
    iw = ih = 200

    imgContext.fillStyle = 'white'
    imgContext.fillRect(0, 0, cols, rows)

    const tx = (cols - iw) * 0.5
    const ty = (rows - ih) * 0.5

    imgContext.save()
    imgContext.translate(tx, ty)
    imgContext.drawImage(img, 0, 0, iw, ih)
    imgContext.restore()

    const imgData = imgContext.getImageData(0, 0, cols, rows).data

    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)

    context.textBaseline = 'middle'
    context.textAlign = 'center'

    // context.drawImage(imgCanvas, 0, 0)

    for (let i = 0; i < numCells; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)

      const x = col * cell
      const y = row * cell

      const r = imgData[i * 4 + 0]
      const g = imgData[i * 4 + 1]
      const b = imgData[i * 4 + 2]
      // const a = imgData[i * 4 + 3]

      const glyph = getGlyph((r + g + b) / 3)

      let fontSize = 0

      switch (Math.floor(random.range(0, 6))) {
        case 1:
          fontSize = 0.5
          break

        case 2:
          fontSize = 0.6
          break

        case 3:
          fontSize = 0.7
          break

        case 4:
          fontSize = 0.8
          break

        case 5:
          fontSize = 0.9
          break

        default:
          fontSize = 1
          break
      }

      context.font = `${cell * fontSize}px Monaco`

      // context.fillStyle = `rgb(${r},${g},${b})`
      context.fillStyle = 'white'

      context.save()
      context.translate(x, y)
      context.translate(cell * 0.5, cell * 0.5)

      // context.fillRect(0, 0, cell, cell)

      // context.beginPath()
      // context.arc(0, 0, cell * 0.5, 0, Math.PI * 2)
      // context.fill()

      context.fillText(glyph, 0, 0)

      context.restore()
    }
  }
}

const getGlyph = (v) => {
  if (v < 50) return '.'
  if (v < 100) return '_'
  if (v < 150) return '+'
  if (v < 200) return '*'

  const glyphs = 'XZ$'.split()

  return random.pick(glyphs)
}

const loadMeSomeImage = () => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      if (false) {
        iw = this.width
        ih = this.height
      } else {
        iw = 1000
        ih = 1000
      }
      resolve(img)
    }
    img.onerror = () => reject()
    img.src = true ? 'mlogo.jpg' : 'logo.png'
  })
}

const start = async () => {
  img = await loadMeSomeImage()

  canvasSketch(sketch, settings)
}

start()
