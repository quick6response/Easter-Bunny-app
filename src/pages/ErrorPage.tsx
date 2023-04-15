import { PanelHeaderToBack } from '@components/UI/PanelHeader';
import { linkConfig } from '@config/link.config';
import { PanelInterface } from '@routes/interface/panel.interface';
import { urlService } from '@services/link/url.service';
import { Group, Link, Panel, Placeholder } from '@vkontakte/vkui';
import { FC } from 'react';

export const ErrorPage: FC<PanelInterface> = ({ nav }) => {
  return (
    <Panel nav={nav}>
      <PanelHeaderToBack name="Ошибка произошла" />
      <Group>
        <Placeholder>
          Нам очень жаль, что произошла ошибка. Если подобное повторяется -
          сообщите{' '}
          <Link onClick={() => urlService.openTab(linkConfig.groupApp)}>
            нам
          </Link>
          !
        </Placeholder>
      </Group>
    </Panel>
  );
};
