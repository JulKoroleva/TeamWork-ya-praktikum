import { FPS, MIN_SPEED, SPEED_COEFFICIENT } from '@/constants/GAME';
import { CameraModel } from './Camera.model';
import { GameFeatureModel } from './GameFeature.model';
import { ICircle } from '../interfaces';

export class PlayerModel extends GameFeatureModel {
  constructor(props: ICircle) {
    super(props);
  }

  move(camera: CameraModel, mouseX: number, mouseY: number) {
    const speed = Math.max((100 / FPS) * SPEED_COEFFICIENT + this.Radius / 2, MIN_SPEED);
    const newX = (mouseX + camera.X - this.X) / speed;
    const newY = (mouseY + camera.Y - this.Y) / speed;
    this.Y += newY;
    this.X += newX;
  }
}
