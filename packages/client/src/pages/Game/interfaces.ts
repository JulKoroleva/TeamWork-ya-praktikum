export interface ICircle {
  x: number
  y: number
  status: STATUS
  strokeStyle: string
  colorFill: string
  radius: number
}

export enum STATUS {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
}
