import { useEffect, useRef } from 'react';
import './Canvas.scss';
import { useMousePosition } from '@/utils/useMousePosition';
import { useCanvasResize } from '@/utils/useCanvasResize';
import { FPS } from '@/constants/GAME';
import { CanvasController } from './Canvas.controller';

export function CanvasComponent() {
  const controller = new CanvasController();

  const refCanvas = useRef<HTMLCanvasElement>(null);
  const mouseCoodrs = useMousePosition();
  useCanvasResize();

  const animate = () => {
    if (refCanvas?.current) {
      const canvas = document.querySelector('canvas')!;
      const ctx = refCanvas.current.getContext('2d')!;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      controller.MovePlayer(mouseCoodrs.current.X, mouseCoodrs.current.Y);
      controller.Camera.focus(canvas, controller.Map, controller.Player);
      ctx.translate(-controller.Camera.X, -controller.Camera.Y);

      controller.CollisionDetection();
      controller.collisionEnemyDetection();

      /** оставлено для дебага */
      // controller.Map.draw(ctx)
      controller.Player.draw(ctx);
      controller.DrawFood(ctx);
      controller.DrawEnemy(ctx);
    }
  };

  useEffect(() => {
    const id = setInterval(animate, 1000 / FPS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <canvas ref={refCanvas} />
    </>
  );
}
