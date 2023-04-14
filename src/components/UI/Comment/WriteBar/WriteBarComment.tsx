import { commentConfig } from '@config/comment.config';
import {
  Counter,
  FixedLayout,
  Spinner,
  WriteBar,
  WriteBarIcon,
} from '@vkontakte/vkui';
import { FC, Fragment, memo } from 'react';
import styles from '../comment.module.css';

interface IWriteBarComment {
  isLoading: boolean;
  text: string;
  setText: (text: string) => void;
  onSubmit: (text: string) => void;
  reference?: React.Ref<HTMLTextAreaElement>;
}

export const WriteBarComment: FC<IWriteBarComment> = memo(
  ({ onSubmit, text, setText, isLoading }) => {
    return (
      <FixedLayout vertical="bottom" filled className={styles.fixedLayout}>
        {/*<form className={styles.fixedLayout} onSubmit={() => onSubmit}>*/}
        <WriteBar
          className={styles.fixedLayout}
          value={text}
          onSubmit={() => onSubmit(text)}
          onChange={(event) => setText(event.target.value)}
          maxLength={commentConfig.maxLength}
          placeholder={`Ваш комментарий...`}
          disabled={isLoading}
          before={
            text.replace(/\s+/g, ' ').trim().length <
              commentConfig.minLength && (
              <WriteBarIcon>
                <Counter mode="prominent">
                  {commentConfig.minLength -
                    text.replace(/\s+/g, ' ').trim().length}
                </Counter>
              </WriteBarIcon>
            )
          }
          after={
            <Fragment>
              {!isLoading ? (
                <WriteBarIcon
                  aria-label="Отправить комментарий"
                  mode="send"
                  onClick={() => onSubmit(text)}
                  disabled={
                    text.replace(/\s+/g, ' ').trim().length <
                    commentConfig.minLength
                  }
                >
                  Отправить комментарий
                </WriteBarIcon>
              ) : (
                <WriteBarIcon>
                  <Spinner size="regular" />
                </WriteBarIcon>
              )}
            </Fragment>
          }
        />
        {/*</form>*/}
      </FixedLayout>
    );
  },
);
