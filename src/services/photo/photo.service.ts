import { utilsService } from '@services/utils/utils.service';
import analyze from 'rgbaster';

const getBrightness = (r: number, g: number, b: number) => {
  return (r * 299 + g * 587 + b * 114) / 1000;
};

const drawFrame = async (
  contextCanvas: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  colorPhoto: 'white' | 'black',
  like = 0,
) => {
  contextCanvas.strokeStyle = '#F59E0B';
  contextCanvas.lineWidth = 50;
  contextCanvas.beginPath();
  contextCanvas.moveTo(0, 0);
  contextCanvas.lineTo(canvasWidth, 0);
  contextCanvas.lineTo(canvasWidth, canvasHeight);
  contextCanvas.lineTo(0, canvasHeight);
  contextCanvas.lineTo(0, 0);
  contextCanvas.stroke();

  contextCanvas.lineWidth = 30;
  contextCanvas.strokeStyle = '#FBDB0F';

  contextCanvas.beginPath();
  contextCanvas.moveTo(30, 30);
  contextCanvas.lineTo(canvasWidth - 30, 30);
  contextCanvas.lineTo(canvasWidth - 30, canvasHeight - 30);
  contextCanvas.lineTo(30, canvasHeight - 30);
  contextCanvas.lineTo(30, 30);
  contextCanvas.stroke();

  contextCanvas.textAlign = 'center';
  contextCanvas.fillStyle =
    colorPhoto === 'black' ? '#0070ff' : 'rgba(244,10,10,0.52)';

  contextCanvas.font = `bold ${
    canvasWidth / 12
  }px -apple-system, system-ui, "Helvetica Neue", Roboto, sans-serif`;

  contextCanvas.fillText('Пасхальная лента', canvasWidth / 2, canvasWidth / 12);

  contextCanvas.font = `bold ${
    canvasWidth / 20
  }px -apple-system, system-ui, "Helvetica Neue", Roboto, sans-serif`;

  contextCanvas.fillText(
    `Собрано ${utilsService.numberFormat(like)} ❤️`,
    canvasWidth / 4,
    canvasHeight - canvasHeight / 20,
    300,
  );
};

function determineColorBrightness(color: string | null): 'white' | 'black' {
  if (!color) {
    throw new Error('Color should be defined');
  }

  const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
  const match = color.match(regex);

  if (!match) {
    throw new Error('Invalid color format');
  }

  const r = Number.parseInt(match[1]);
  const g = Number.parseInt(match[2]);
  const b = Number.parseInt(match[3]);

  const brightness = getBrightness(r, g, b);

  return brightness > 128 ? 'white' : 'black';
}

/**
 * Сервис для работы с фотками и создание историй
 */
export const photoService = {
  createHistory: async (photoUrl: string, like = 0): Promise<string> => {
    const responseFetch = await fetch(photoUrl);
    const blob = await responseFetch.blob();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const image = new Image();
    image.src = URL.createObjectURL(blob);

    return new Promise((resolve) => {
      image.addEventListener('load', async () => {
        // console.log('Загрузили фото');
        canvas.width = image.width;
        canvas.height = image.height;
        context?.drawImage(image, 0, 0);

        const result = await analyze(image.src, { scale: 0.6 });
        const getDetermineColorBrightness = determineColorBrightness(
          result[0].color,
        );
        if (!context) {
          // console.log('context нет');
          return '';
        }
        drawFrame(
          context,
          canvas.width,
          canvas.height,
          getDetermineColorBrightness,
          like,
        );

        resolve(canvas.toDataURL());
      });
    });
  },
};
