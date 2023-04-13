import { ReportSendInterface } from '@api/report/types/report.send.interface';
import { HorizontalScroll, Tabs, TabsItem } from '@vkontakte/vkui';
import { FC, ReactNode } from 'react';

interface ICategoryModeration {
  name: string;
  type: ReportSendInterface['type'];
  icon?: ReactNode;
}
const arrayCategoryModeration: ICategoryModeration[] = [
  {
    name: 'Записи',
    type: 'walls',
  },
  {
    name: 'Фотографии',
    type: 'photos',
  },
  {
    name: 'Комментарии',
    type: 'comments',
  },
];

interface ITabsModeration {
  onClick: (type: ReportSendInterface['type']) => void;
  activeTab: ReportSendInterface['type'];
}

export const TabsModeration: FC<ITabsModeration> = ({ activeTab, onClick }) => {
  return (
    <Tabs>
      <HorizontalScroll arrowSize="m">
        {arrayCategoryModeration.map((categoryModeration) => (
          <TabsItem
            key={categoryModeration.type}
            selected={categoryModeration.type === activeTab}
            disabled={categoryModeration.type === activeTab}
            onClick={() => onClick(categoryModeration.type)}
          >
            {categoryModeration.name}
          </TabsItem>
        ))}
      </HorizontalScroll>
    </Tabs>
  );
};
