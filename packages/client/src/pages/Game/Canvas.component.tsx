import { useEffect, useRef } from 'react'
import './Canvas.scss'
import { ICircle, STATUS } from './interfaces'
import { useMousePosition } from '../../utils/useMousePosition'

// @TODO база
// - надо чтобы кружок бежал за мышкой => нужен вектор
// - чем дальше мышка за фрейм тем больше скорость
// - чем жирнее круг - тем меньше скорость
// - сделать круг картинкой, чтобы не так скучно было жить...

// @TODO средне
// - нужна карта. Карта [10k, 10k] canvas [1048, 956]. мы должны кудато попасть канвасом в карте и далее уже бегать по ней
// - рендерим все что есть именно в карте, а не в холсте.

// @TODO хард
// поиграть ещё понять остальные детали =)
export function CanvasComponent() {
  const ref = useRef(null)
  const coodrs = useRef<ICircle>({
    x: 0,
    y: 0,
    radius: 10,
    strokeStyle: 'black',
    colorFill: 'black',
    status: STATUS.ALIVE,
  })
  useMousePosition(coodrs)
  const FOOD = useRef<Array<ICircle>>([])
  // значения НЕ экран. значения - полотно !
  FOOD.current = generateFood({ width: 1000, height: 1000 })

  const ENEMY = useRef<Array<ICircle>>([])
  ENEMY.current = [
    { x: 1000, y: 500, status: STATUS.ALIVE, strokeStyle: 'green', colorFill: 'green', radius: 5 },
    { x: 1200, y: 200, status: STATUS.ALIVE, strokeStyle: 'green', colorFill: 'green', radius: 5 },
  ]

  const resize = function () {
    const canvas = document.querySelector('canvas')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  useEffect(() => {
    window.addEventListener('resize', resize)
    resize()
  }, [])

  function collisionDetection() {
    for (const element of FOOD.current) {
      if (element.status === STATUS.ALIVE) {
        if (isCollided(element, { ...coodrs.current })) {
          coodrs.current.radius = coodrs.current.radius + element.radius
          element.status = STATUS.DEAD
        }
      }
    }
  }

  // временно. По факту там по-другому как-то
  function collisionEnemyDetection() {
    for (const element of ENEMY.current) {
      if (isCollided(element, { ...coodrs.current })) {
        const d = coodrs.current.radius - element.radius
        if (d <= 0) {
          // Тут какой-то gameover
          return
        }
        coodrs.current.radius = coodrs.current.radius - element.radius
        element.status = STATUS.DEAD
      }
    }
  }

  const animate = () => {
    if (ref?.current) {
      const canvas = document.querySelector('canvas')!
      //@ts-ignore
      const ctx = ref.current.getContext('2d')
      ctx?.clearRect(0, 0, canvas.width, canvas.height)

      collisionDetection()
      collisionEnemyDetection()
      drawCircle(ctx, {
        ...coodrs.current,
        lineWidth: 2,
      })

      for (const element of FOOD.current) {
        if (element.status === STATUS.ALIVE) {
          drawCircle(ctx, {
            ...element,
            lineWidth: 2,
          })
        }
      }

      for (const element of ENEMY.current) {
        if (element.status === STATUS.ALIVE) {
          drawCircle(ctx, {
            ...element,
            lineWidth: 2,
          })
        }
      }
    }
  }

  useEffect(() => {
    /** 100 мс оставлено специально для удобного дебага */
    const id = setInterval(animate, 100)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <canvas ref={ref} />
    </>
  )
}

const drawCircle = (
  ctx: CanvasRenderingContext2D,
  circleDims: {
    radius: number
    lineWidth: number
    x: number
    y: number
    strokeStyle: string
    colorFill: string
  },
) => {
  const { radius, x: startX, y: startY, lineWidth, strokeStyle, colorFill } = circleDims
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = strokeStyle
  ctx.beginPath()

  ctx.arc(startX, startY, radius, 0, Math.PI * 2, true)
  ctx.stroke()
  ctx.closePath()
  ctx.fillStyle = colorFill
  ctx.fill()
}

// на самом деле должна быть более сложная функция при поедании.
// в оригинале поедании или детект столкновения с врагом происходит если мы наехали на какую-то часть (30% например)
function isCollided(circle0: ICircle, circle1: ICircle) {
  let maxDistanceSquared = circle0.radius + circle1.radius
  maxDistanceSquared *= maxDistanceSquared

  const dx = circle0.x - circle1.x
  const dy = circle0.y - circle1.y

  const currentDistanceSquared = dx * dx + dy * dy

  return currentDistanceSquared < maxDistanceSquared
}

const FOOD_COUNT = 20
// примитивная ф-ия =)
function generateFood({ width, height }: { width: number; height: number }) {
  return new Array(FOOD_COUNT).fill(null).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    status: STATUS.ALIVE,
    strokeStyle: 'red',
    colorFill: 'red',
    radius: 10,
  }))
}
