import { Link } from '@vkontakte/vkui';
import { FC, useState } from 'react';

/**
 * Компонент для отображения текста с максимальным количеством символов и кнопкой "Показать еще"
 * @param text
 * @param maxCharacters
 * @constructor
 */
export const TextShowMoreComponent: FC<{
  text: string;
  maxCharacters?: number;
}> = ({ text, maxCharacters = 45 }) => {
  const [showFullText, setShowFullText] = useState(false);

  const handleClick = () => {
    setShowFullText(true);
  };

  return (
    <div>
      {text.length > maxCharacters && !showFullText ? (
        <>
          <p>{text.slice(0, Math.max(0, maxCharacters))}...</p>
          <Link onClick={handleClick}>Показать еще</Link>
        </>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
};
