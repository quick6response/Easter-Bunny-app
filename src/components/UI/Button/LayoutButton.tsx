import { Cell, Platform, TabbarItem, usePlatform } from '@vkontakte/vkui';
import { FC, ReactNode } from 'react';
import { useRouterActions, useRouterSelector } from 'react-router-vkminiapps';

type LayoutButtonProperties = {
  story: string;
  before: ReactNode;
  children: ReactNode;
  disable?: boolean;
};

export const LayoutButton: FC<LayoutButtonProperties> = ({
  story,
  before,
  children,
  disable = false,
}) => {
  const platform = usePlatform();
  const { activeView, activePanel } = useRouterSelector();
  const { toView, toPanel, toBack } = useRouterActions();
  const selected = story === activeView;

  return platform === Platform.VKCOM ? (
    <Cell
      key={story}
      before={before}
      disabled={disable}
      style={
        selected
          ? {
              backgroundColor: 'var(--vkui--color_background_secondary_alpha)',
              borderRadius: 8,
            }
          : {}
      }
      onClick={() => toView(story)}
    >
      {children}
    </Cell>
  ) : (
    <TabbarItem
      key={story}
      selected={selected}
      disabled={disable}
      text={children}
      onClick={() => toView(story)}
    >
      {before}
    </TabbarItem>
  );
};
