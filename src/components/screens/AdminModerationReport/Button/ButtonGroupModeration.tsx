import { Button, ButtonGroup, Div } from '@vkontakte/vkui';
import { FC } from 'react';

export const ButtonGroupModeration: FC<{
  isLoading: boolean;
  onClick: (status: boolean) => void;
}> = ({ onClick, isLoading }) => {
  return (
    <Div>
      <ButtonGroup stretched>
        <Button
          stretched
          mode="secondary"
          appearance="positive"
          loading={isLoading}
          onClick={() => onClick(true)}
        >
          Одобрить
        </Button>
        <Button
          stretched
          mode="secondary"
          appearance="negative"
          loading={isLoading}
          onClick={() => onClick(false)}
        >
          Отклонить
        </Button>
      </ButtonGroup>
    </Div>
  );
};
