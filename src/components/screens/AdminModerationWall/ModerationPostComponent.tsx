import { ModerationWallType } from '@api/admin/moderation/types/moderation.wall.type';
import styles from '@components/UI/Post/post.module.css';
import { PostComponent } from '@components/UI/Post/PostComponent';
import { PostModel } from '@models/post.model';
import { textService } from '@services/text/text.service';
import { Icon20Info } from '@vkontakte/icons';
import { Button, ButtonGroup, Div, Group, MiniInfoCell } from '@vkontakte/vkui';
import { clsx } from 'clsx';
import { FC, useState } from 'react';

interface IModerationPostComponent {
  post: PostModel;
  onClickVoteButton: (dto: ModerationWallType) => Promise<boolean>;
}
export const ModerationPostComponent: FC<IModerationPostComponent> = ({
  post,
  onClickVoteButton,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClickButtonVote = async (status: boolean) => {
    setIsLoading(true);
    const onClick = await onClickVoteButton({ hash: post.hash, status });
    return setIsLoading(onClick);
  };

  return (
    <Group
      key={post.id}
      className={clsx(styles.group)}
      style={{
        cursor: 'not-allowed',
      }}
    >
      <>
        <PostComponent key={post.id} post={post} isViewButton={false} />
        <Div>
          <ButtonGroup stretched>
            <Button
              stretched
              mode="secondary"
              appearance="positive"
              loading={isLoading}
              onClick={() => onClickButtonVote(true)}
            >
              Одобрить
            </Button>
            <Button
              stretched
              mode="secondary"
              appearance="negative"
              loading={isLoading}
              onClick={() => onClickButtonVote(false)}
            >
              Отклонить
            </Button>
          </ButtonGroup>
        </Div>
        <MiniInfoCell
          before={<Icon20Info />}
          onClick={() =>
            textService.copyText(`id${post.id} (hash: ${post.hash})`)
          }
        >
          id{post.id} (hash: {post.hash})
        </MiniInfoCell>
      </>
    </Group>
  );
};
