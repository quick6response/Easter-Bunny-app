import { UserVkModel } from '@models/user.vk.model';
import { dateService } from '@services/date/date.service';
import { Avatar, RichCell } from '@vkontakte/vkui';
import { FC } from 'react';

export const RichCellUserSendReport: FC<{
  id_vk: number;
  user: UserVkModel;
  date: string;
}> = ({ id_vk, user, date }) => {
  return (
    <RichCell
      subhead="Оставил жалобу"
      after={<Avatar src={user.photo} />}
      caption={dateService.convertDateAndTimeToFormat(date)}
    >
      {user.last_name} {user.first_name}
    </RichCell>
  );
};
