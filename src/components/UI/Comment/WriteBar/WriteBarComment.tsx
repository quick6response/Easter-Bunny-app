import { FixedLayout, WriteBar, WriteBarIcon } from '@vkontakte/vkui';
import { FC, Fragment, memo, useState } from 'react';
import styles from '../comment.module.css';

interface IWriteBarComment {
  onSubmit: (text: string) => void;
}

export const WriteBarComment: FC<IWriteBarComment> = memo(({ onSubmit }) => {
  const [text, setText] = useState<string>('');

  return (
    <FixedLayout vertical="bottom" filled>
      <div className={styles.fixedLayout} onSubmit={() => onSubmit(text)}>
        <WriteBar
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={255}
          placeholder="Ваш комментарий..."
          after={
            <Fragment>
              <WriteBarIcon
                aria-label="Отправить комментарий"
                mode="send"
                onClick={() => onSubmit(text?.replace(/\s+/g, ' ')?.trim())}
                disabled={text.replace(/\s+/g, ' ').trim().length < 5}
              />
            </Fragment>
          }
        />
      </div>
    </FixedLayout>
  );
});
