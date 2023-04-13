import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPanel } from '@hooks/useRouterPanel';
import { PanelInterface } from '@routes/interface/panel.interface';
import { PanelTypes } from '@routes/structure.navigate';
import { adminModerationSliceActions } from '@store/moderation/admin.moderation.slice';
import { Icon20Info } from '@vkontakte/icons';
import {
  CellButton,
  Checkbox,
  Group,
  MiniInfoCell,
  Panel,
  PanelHeader,
  Separator,
} from '@vkontakte/vkui';
import { FC } from 'react';

const AdminHomePage: FC<PanelInterface> = ({ nav }) => {
  const { toPanel } = useRouterPanel();
  const isConfirm = useAppSelector((state) => state.adminModeration.isConfirm);
  const adminModerAction = useAction(adminModerationSliceActions);

  const onClickOnConfirmActionModeration = () => {
    adminModerAction.setIsConfirm(!isConfirm);
  };

  return (
    <Panel nav={nav}>
      <PanelHeader>Меню</PanelHeader>
      <Group>
        <CellButton onClick={() => toPanel(PanelTypes.ADMIN_MODERATION)}>
          Модерация
        </CellButton>
        <CellButton
          onClick={() =>
            toPanel(PanelTypes.ADMIN_MODER_REPORTS, { tab: 'walls' })
          }
        >
          Жалобы
        </CellButton>
        <Separator />
        <Checkbox
          checked={isConfirm}
          onChange={onClickOnConfirmActionModeration}
        >
          {isConfirm ? 'Выключить' : 'Включить'} подтверждение
        </Checkbox>
        <MiniInfoCell before={<Icon20Info />} textWrap="short">
          {isConfirm
            ? 'Включено подтверждение каждого действия. Все просто :)'
            : 'Каждую минуту вы будете подтверждать свое действие, чтобы продлевать это время.'}
        </MiniInfoCell>
      </Group>
    </Panel>
  );
};

export default AdminHomePage;
