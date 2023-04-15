import { ReportPostModel } from '@api/admin/report/types/report.posts.response.interface';
import { ButtonGroupModeration } from '@components/screens/AdminModerationReport/Button/ButtonGroupModeration';
import { RichCellUserSendReport } from '@components/screens/AdminModerationReport/RichCell/RichCellUserSendReport';
import { ModerationReportType } from '@components/screens/AdminModerationReport/types/moderation.report.type';
import styles from '@components/UI/Post/post.module.css';
import { PostComponent } from '@components/UI/Post/PostComponent';
import { textService } from '@services/text/text.service';
import { Icon20Info } from '@vkontakte/icons';
import { Group, MiniInfoCell } from '@vkontakte/vkui';
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
    return setIsLoading(onClick);
  };

  return (
    <Group
      key={report.id}
      className={clsx(styles.group)}
      // style={{
      //   cursor: 'not-allowed',
      //   maxWidth: '99lvi',
      // }}
    >
      <>
        <PostComponent key={report.id} post={report.wall} isViewButton={false}>
          <RichCellUserSendReport
            user={report.user}
            id_vk={report.vk_id}
            date={report.date}
          />
        </PostComponent>
        <ButtonGroupModeration
          isLoading={isLoading}
          onClick={onClickButtonVote}
        />

        <MiniInfoCell
          before={<Icon20Info />}
          onClick={() => textService.copyText(`hash=${report.wall.hash}`)}
        >
          id{report.id} (hash: {report.wall.hash})
        </MiniInfoCell>
      </>
    </Group>
  );
};
