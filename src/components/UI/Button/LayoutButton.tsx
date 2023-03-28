import { useRouterPanel } from '@hooks/useRouterPanel';
import { Cell, Platform, TabbarItem, usePlatform } from '@vkontakte/vkui';
import { FC, ReactNode } from 'react';

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
  const { toView, view } = useRouterPanel();
  const selected = story === view;

  return platform === Platform.VKCOM ? (
    <Cell
      key={story}
      before={before}
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
      id={story}
      key={story}
      selected={selected}
      disabled={disable}
      text={children}
      controls={selected}
      aria-label={'children'}
      onClick={() => toView(story)}
    >
      {before}
    </TabbarItem>
  );
};
