import { FOOD_COUNT } from '@/constants/GAME';
import { GameFeatureModel } from '../models/GameFeature.model';

/** временный вариант. супер примитивный */
export function GenerateFood({
  width,
  height,
}: {
  width: number;
  height: number;
}): ReadonlyArray<GameFeatureModel> {
  return new Array(FOOD_COUNT).fill(null).map(() => {
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    return new GameFeatureModel({
      X: Math.random() * width,
      Y: Math.random() * height,
      StrokeStyle: color,
      ColorFill: color,
      Radius: 10,
    });
  });
}
