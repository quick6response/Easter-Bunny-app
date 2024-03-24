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
  onCLickText?: () => void;
  style?: React.CSSProperties;
  // если требуется сразу показать текст
  isShowAllTextAtOnce?: boolean;
}> = ({
  text,
  maxCharacters = 45,
  onCLickText,
  style,
  isShowAllTextAtOnce = false,
}) => {
  const [showFullText, setShowFullText] = useState(false);
  const [textTrim] = useState(text.trim());
  const handleClick = () => {
    setShowFullText(true);
  };

  const isShowMore =
    textTrim.length > maxCharacters && !showFullText && !isShowAllTextAtOnce;

  return isShowMore ? (
    <>
      <div style={style} onClick={onCLickText}>
        {textTrim.slice(0, Math.max(0, maxCharacters))}...
      </div>

      <Link onClick={handleClick}>Показать еще</Link>
    </>
  ) : (
    <div style={style} onClick={onCLickText}>
      {textTrim}
    </div>
  );
};
