import { useRouterPanel } from '@hooks/useRouterPanel';
import { Cell, Platform, TabbarItem, usePlatform } from '@vkontakte/vkui';
import { FC, ReactNode, useMemo } from 'react';

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
}) => {
  const platform = usePlatform();
  const { toView, view } = useRouterPanel();
  const selected = useMemo(() => story === view, [story, view]);

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
      data-story={story}
      text={children}
      // controls={selected}
      onClick={() => toView(story)}
      aria-controls={'tabbar'}
    >
      {before}
    </TabbarItem>
  );
};
