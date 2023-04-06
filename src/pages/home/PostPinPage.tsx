import { useGetPostInfo } from '@api/posts/hooks/useGetPostInfo';
import { PostPinComponent } from '@components/screens/PostPin/PostPinComponent';
import { PanelHeaderToBack } from '@components/UI/PanelHeader';
import { useParams } from '@itznevikat/router';
import { PanelInterface } from '@routes/interface/panel.interface';
import { Panel, Placeholder, ScreenSpinner } from '@vkontakte/vkui';
import { FC } from 'react';

const PostPinPage: FC<PanelInterface> = ({ nav }) => {
  const { hash } = useParams<{ hash: string }>();
  const { isLoading, data, isError } = useGetPostInfo(hash);

  if (isLoading) return <ScreenSpinner />;
  if (isError)
    return <Placeholder>Ошибка получения данных о записи.</Placeholder>;

  return (
    <Panel nav={nav}>
      <PanelHeaderToBack name={`${data?.pin ? 'Продлить' : 'Закрепить'} `} />
      <PostPinComponent post={data} />
    </Panel>
  );
};
export default PostPinPage;
