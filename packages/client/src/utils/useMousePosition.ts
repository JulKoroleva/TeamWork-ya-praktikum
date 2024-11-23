import { MutableRefObject, useEffect } from 'react'
import { ICircle } from '../pages/Game/interfaces'

export function useMousePosition(ref: MutableRefObject<Partial<ICircle>>) {
  const handleCursorMovement = (event: MouseEvent): void => {
    //@ts-ignore
    const rect = event.target.getBoundingClientRect()
    ref.current = {
      ...ref.current,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }
  useEffect(() => {
    window.addEventListener('mousemove', handleCursorMovement)
    return () => {
      window.removeEventListener('mousemove', handleCursorMovement)
    }
  }, [])
}
