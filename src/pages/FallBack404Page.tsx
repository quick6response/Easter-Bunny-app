import { back } from '@itznevikat/router';
import { PanelInterface } from '@routes/interface/panel.interface';
import {
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
} from '@vkontakte/vkui';
import { FC } from 'react';

export const FallBack404Page: FC<PanelInterface> = ({ nav }) => {
  console.log('404');
  return (
    <Panel nav={nav}>
      <PanelHeader before={<PanelHeaderBack onClick={back} />}>404</PanelHeader>
      <Group>
        <Placeholder>
          Страница не найдена. Не знаем как Вы сюда попали, извините :D
        </Placeholder>
      </Group>
    </Panel>
  );
};
