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
  const [textTrim] = useState(text.trim());
  const handleClick = () => {
    setShowFullText(true);
  };

  return textTrim.length > maxCharacters && !showFullText ? (
    <>
      {textTrim.slice(0, Math.max(0, maxCharacters))}...
      <Link onClick={handleClick}>Показать еще</Link>
    </>
  ) : (
    textTrim
  );
};
