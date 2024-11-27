import { Hint } from '../interfaces/Hint.interface';
import Tip1 from '@/assets/tips/tip_1.svg';
import Tip2 from '@/assets/tips/tip_2.svg';
import Tip3 from '@/assets/tips/tip_3.svg';
import Tip4 from '@/assets/tips/tip_4.svg';

export const hints: Hint[] = [
  {
    id: 1,
    text: 'Добро пожаловать в игру! Пройдите небольшое обучение, эти советы помогут вам стать лучшим из лучших',
    image: '',
  },
  {
    id: 2,
    text: 'Собирайте небольшие клетки, чтобы увеличивать свою массу. Это помогает быстрее расти в начале игры',
    image: Tip1,
  },
  {
    id: 3,
    text: 'Избегайте более крупных игроков, которые могут вас поглотить. Старайтесь держаться подальше от опасных зон',
    image: Tip2,
  },
  {
    id: 4,
    text: 'Используйте зелёные вирусы для защиты: маленькие игроки могут прятаться за ними, чтобы избежать нападений',
    image: Tip3,
  },
  {
    id: 5,
    text: 'Разделяйтесь (клавиша Space), чтобы атаковать более мелких игроков или быстрее перемещаться. Помните, что разделение делает вас уязвимыми: избегайте разделения рядом с большими игроками',
    image: Tip4,
  },
];