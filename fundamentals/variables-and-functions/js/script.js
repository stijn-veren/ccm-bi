let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')

// Draws a "filled" rectangle
context.fillStyle = '#607d8b'
context.fillRect(100, 100, 400, 400)

// Creates a rectangle
context.lineWidth = 4
context.beginPath()
context.rect(100, 100, 400, 400)
context.stroke()

// Creates a circle
context.beginPath()
context.arc(300, 300, 100, 0, Math.PI * 2)
context.stroke()
