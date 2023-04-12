import { ReportPostModel } from '@api/admin/report/types/report.posts.response.interface';
import { ModerationReportType } from '@components/screens/AdminModerationReport/types/moderation.report.type';
import styles from '@components/UI/Post/post.module.css';
import { PostComponent } from '@components/UI/Post/PostComponent';
import { textService } from '@services/text/text.service';
import { Icon20Info } from '@vkontakte/icons';
import { Button, ButtonGroup, Div, Group, MiniInfoCell } from '@vkontakte/vkui';
import { clsx } from 'clsx';
import { FC, useState } from 'react';

interface IModerationPostComponent {
  report: ReportPostModel;
  onClickVoteButton: (dto: ModerationReportType) => Promise<boolean>;
}
export const ReportPostComponent: FC<IModerationPostComponent> = ({
  report,
  onClickVoteButton,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClickButtonVote = async (status: boolean) => {
    setIsLoading(true);
    const onClick = await onClickVoteButton({ id: report.id, status });
    console.log(onClick);
    return setIsLoading(onClick);
  };

  return (
    <Group
      key={report.id}
      className={clsx(styles.group)}
      style={{
        cursor: 'not-allowed',
      }}
    >
      <>
        <PostComponent
          key={report.id}
          post={report.wall}
          isViewButton={false}
        />
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
            textService.copyText(`id${report.id} (hash: ${report.wall.hash})`)
          }
        >
          id{report.id} (hash: {report.wall.hash})
        </MiniInfoCell>
      </>
    </Group>
  );
};
