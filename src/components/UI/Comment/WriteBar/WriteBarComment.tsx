import { commentConfig } from '@config/comment.config';
import { FixedLayout, Spinner, WriteBar, WriteBarIcon } from '@vkontakte/vkui';
import { FC, Fragment, memo } from 'react';
import styles from '../comment.module.css';

interface IWriteBarComment {
  isLoading: boolean;
  text: string;
  setText: (text: string) => void;
  onSubmit: () => void;
}

export const WriteBarComment: FC<IWriteBarComment> = memo(
  ({ onSubmit, text, setText, isLoading }) => {
    return (
      <FixedLayout vertical="bottom" filled>
        <form className={styles.fixedLayout} onSubmit={() => onSubmit}>
          <WriteBar
            value={text}
            onChange={(event) => setText(event.target.value)}
            maxLength={commentConfig.maxLength}
            placeholder="Ваш комментарий..."
            disabled={isLoading}
            after={
              <Fragment>
                {!isLoading ? (
                  <WriteBarIcon
                    aria-label="Отправить комментарий"
                    mode="send"
                    onClick={() => onSubmit()}
                    disabled={
                      text.replace(/\s+/g, ' ').trim().length <
                      commentConfig.minLength
                    }
                  >
                    Отправить комментарий
                  </WriteBarIcon>
                ) : (
                  <Spinner size="regular" />
                )}
              </Fragment>
            }
          />
        </form>
      </FixedLayout>
    );
  },
);
