const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let x = getRandomPos()
let y = getRandomPos()
let snakeLen = 5
let speed = 10
let x_direction = speed
let y_direction = 0
let snakePositions = []

let score = 0

let x_apple = getRandomPos()
let y_apple = getRandomPos()

let apple_colors = ['#ff0000','#58bc34']
let apple_color = '#ff0000'

requestAnimationFrame(animation)

function animation() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.beginPath()
	ctx.font = 'bold 20px sans-serif'
	ctx.fillText(`Pontos: ${score}`, 450, 50)

	ctx.beginPath()
	ctx.fillStyle = '#fff'
	let snake = ctx.rect(x, y, 10, 10)
	ctx.fill()

	ctx.beginPath()
	ctx.fillStyle = apple_color
	let apple = ctx.rect(x_apple, y_apple, 10, 10)
	ctx.fill()

	x += x_direction
	y += y_direction

	if (y > canvas.height + 10) {
		y = 0
	}
	if (y < -10) {
		y = canvas.height
	}
	if (x > canvas.width + 10) {
		x = 0
	}
	if (x < -10) {
		x = canvas.width
	}

	let snakePosition = []
	snakePosition.push(x, y)

	let checkPos = snakePositions.filter((pos) => {
		return JSON.stringify(pos) === JSON.stringify(snakePosition)
	})

	if (checkPos.length) {
		restart()
	} else {
		snakePositions.push(snakePosition)
	}

	if (snakePositions.length > snakeLen) {
		snakePositions.shift()
	}

	if (
		x < x_apple + 10 &&
		x + 10 > x_apple &&
		y < y_apple + 10 &&
		y + 10 > y_apple
	) {
		x_apple = getRandomPos()
		y_apple = getRandomPos()
		snakeLen += 1
		score += 1
		apple_color = apple_colors[getAppleColor()]
	}

	moveSnake(snakePositions)
	requestAnimationFrame(animation)
}

function restart() {
	snakeLen = 5
	x = getRandomPos()
	y = getRandomPos()
	x_apple = getRandomPos()
	y_apple = getRandomPos()
	x_direction = speed
	y_direction = 0
	score = 0
	while (snakePositions.length !== snakeLen) {
		snakePositions.shift()
	}
}

function moveSnake(positions) {
	for (position of positions) {
		ctx.beginPath()
		ctx.fillStyle = '#fff'
		ctx.rect(position[0], position[1], 10, 10)
		ctx.fill()
	}
}

function getRandomPos() {
	return Math.floor(Math.random() * 59) * 10
}

function getAppleColor() {
	return Math.floor(Math.random() * 2)
}

window.addEventListener('keydown', (event) => {
	if (event.key === 'w') {
		if (y_direction !== speed) {
			y_direction = -speed
			x_direction = 0
		}
	}
	if (event.key === 's') {
		if (y_direction !== -speed) {
			y_direction = speed
			x_direction = 0
		}
	}

	if (event.key == 'a') {
		if (x_direction !== speed) {
			x_direction = -speed
			y_direction = 0
		}
	}
	if (event.key == 'd') {
		if (x_direction !== -speed) {
			x_direction = speed
			y_direction = 0
		}
	}
})