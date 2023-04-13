import { ReportCommentModel } from '@api/admin/report/types/report.comments.response.interface';
import { ButtonGroupModeration } from '@components/screens/AdminModerationReport/Button/ButtonGroupModeration';
import { RichCellUserSendReport } from '@components/screens/AdminModerationReport/RichCell/RichCellUserSendReport';
import { ModerationReportComponentType } from '@components/screens/AdminModerationReport/types/moderation.report.component.type';
import { RichCellComment } from '@components/UI/Comment/RichCellComment';
import styles from '@components/UI/Post/post.module.css';
import { textService } from '@services/text/text.service';
import { Icon20Info } from '@vkontakte/icons';
import { Group, MiniInfoCell } from '@vkontakte/vkui';
import { clsx } from 'clsx';
import { FC, useState } from 'react';

export const ReportCommentComponent: FC<{
  report: ReportCommentModel;
  onClickButton: ModerationReportComponentType['onClickButton'];
  onClickAvatarUser: (id_vk: number) => void;
}> = ({ onClickButton, report, onClickAvatarUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClickButtonVote = async (status: boolean) => {
    setIsLoading(true);
    const onClick = await onClickButton({ id: report.id, status });
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
        <RichCellComment
          comment={report.comment}
          onClickAvatar={onClickAvatarUser}
          isViewButtonReport={false}
        />
        <ButtonGroupModeration
          isLoading={isLoading}
          onClick={onClickButtonVote}
        />
        <RichCellUserSendReport
          user={report.user}
          id_vk={report.vk_id}
          date={report.date}
        />
        <MiniInfoCell
          before={<Icon20Info />}
          onClick={() =>
            textService.copyText(
              `id${report.id} (commentId: ${report.comment_id})`,
            )
          }
        >
          id{report.id} (commentId: {report.comment_id})
        </MiniInfoCell>
      </>
    </Group>
  );
};
