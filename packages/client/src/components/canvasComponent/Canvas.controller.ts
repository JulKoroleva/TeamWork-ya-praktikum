import { MAP_SIZE } from '@/constants/GAME';
import { CameraModel } from './models/Camera.model';
import { MapRegionModel } from './models/MapRegion.model';
import { PlayerModel } from './models/Player.model';
import { GenerateFood } from './utils/generateFood';
import { STATUS } from './interfaces';
import { isCollided } from './utils/isCollided';
import { GenerateEnemy } from './utils/generateEnemy';

export class CanvasController {
  public Map = new MapRegionModel();
  public Camera = new CameraModel();
  public Player = new PlayerModel({ X: 2000, Y: 2000, Radius: 10 });
  public FoodFields = GenerateFood({ width: MAP_SIZE, height: MAP_SIZE });
  public EnemyFields = GenerateEnemy({ width: MAP_SIZE, height: MAP_SIZE });

  public MovePlayer(mouseX: number, mouseY: number) {
    this.Player.move(this.Camera, mouseX, mouseY);
  }

  public CollisionDetection() {
    for (const element of this.FoodFields) {
      if (element.Status === STATUS.ALIVE) {
        if (isCollided(element, this.Player)) {
          this.Player.Radius = this.Player.Radius + element.Radius / 2;
          element.Status = STATUS.DEAD;
        }
      }
    }
  }

  public collisionEnemyDetection() {
    for (const element of this.EnemyFields) {
      if (isCollided(element, this.Player)) {
        if (this.Player.Radius <= element.Radius) {
          /** @TODO там как-то разлетается он вроде */
          return;
        }
      }
    }
  }

  public DrawFood(ctx: CanvasRenderingContext2D) {
    for (const element of this.FoodFields) {
      if (element.Status === STATUS.ALIVE) {
        element.draw(ctx);
      }
    }
  }

  public DrawEnemy(ctx: CanvasRenderingContext2D) {
    for (const element of this.EnemyFields) {
      if (element.Status === STATUS.ALIVE) {
        element.draw(ctx);
      }
    }
  }
}
