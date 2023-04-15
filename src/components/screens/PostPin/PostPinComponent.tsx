import { useGetProducts } from '@api/shop/hooks/useGetProducts';
import { ErrorSnackbar, SuccessSnackbar } from '@components/UI/Snackbar';
import { linkConfig } from '@config/link.config';
import { usePinPostUser } from '@hooks/usePinPostUser';
import { useSnackbar } from '@hooks/useSnackbar';
import { back } from '@itznevikat/router';
import { PostModel } from '@models/post.model';
import { errorTransformService } from '@services/error/errorTransform.service';
import { urlService } from '@services/link/url.service';
import { utilsService } from '@services/utils/utils.service';
import { Icon16InfoCirle, Icon20Pin } from '@vkontakte/icons';
import {
  Button,
  Card,
  CardGrid,
  Div,
  FixedLayout,
  Group,
  Link,
  MiniInfoCell,
  Placeholder,
  Spinner,
  Subhead,
  Title,
} from '@vkontakte/vkui';
import { clsx } from 'clsx';
import { FC, useState } from 'react';
import styles from './post.pin.module.css';

export const PostPinComponent: FC<{ post: PostModel }> = ({
  post: { id: postId, hash, pin },
}) => {
  const { setSnackbar } = useSnackbar();
  const { isLoading, isError, error, data } = useGetProducts();
  const [selectItem, setSelectItem] = useState('');
  const {
    onClickBuy,
    isLoading: isLoadingBuy,
    error: errorBuy,
  } = usePinPostUser(postId.toString(), hash);

  if (isLoading)
    return (
      <Group>
        <Spinner />
      </Group>
    );
  if (isError)
    return (
      <Group>
        <Placeholder>
          {errorTransformService.getMessageError(error)}
        </Placeholder>
      </Group>
    );

  const onSelectItem = (itemId: string) => {
    if (selectItem === itemId) {
      return setSelectItem('');
    }
    return setSelectItem(itemId);
  };

  const onClickButtonBuy = async () => {
    const buy = await onClickBuy(selectItem);
    if (!buy) return setSnackbar(<ErrorSnackbar>{errorBuy}</ErrorSnackbar>);
    if (buy) {
      setSnackbar(
        <SuccessSnackbar>Запись успешно закреплена!</SuccessSnackbar>,
      );
      back();
      return back();
    }
  };

  return (
    <>
      <Group>
        {pin && (
          <MiniInfoCell before={<Icon20Pin />} textWrap="short">
            {!pin.forever
              ? 'Вы продлеваете закрепление записи'
              : 'Ваша запись уже закреплена навсегда, но Вы можете нас поддержать купив продление'}
          </MiniInfoCell>
        )}
        <CardGrid size="m">
          {data.map((product) => (
            <Card
              key={product.item}
              onClick={() => onSelectItem(product.item)}
              className={clsx(styles.content, {
                [styles.content_select]: selectItem === product.item,
                ['itemDisable']: pin?.forever === 1,
              })}
            >
              {/*<div>*/}
              <img
                src={product.photo_url}
                alt={product.title}
                className={styles.img}
                loading="lazy"
              />
              {product.discount !== 0 && (
                <div className={styles.discountBadge}>
                  {Math.round((product.discount / product.price) * 100)}%
                </div>
              )}
              <Title className={styles.title} level="2">
                {product.title}
              </Title>
              <Subhead className={styles.price}>
                <>
                  <div
                    className={clsx({
                      [styles.discount]: product.discount !== 0,
                    })}
                  >
                    {utilsService.declOfNum(product.price, [
                      'голос',
                      'голоса',
                      'голосов',
                    ])}
                  </div>
                  {product.discount !== 0 &&
                    utilsService.declOfNum(product.price - product.discount, [
                      'голос',
                      'голоса',
                      'голосов',
                    ])}
                </>
              </Subhead>
              {/*</div>*/}
            </Card>
          ))}
        </CardGrid>
        <MiniInfoCell before={<Icon16InfoCirle />} textWrap="short">
          Нажимая кнопку «Купить» вы соглашаетесь с{' '}
          <Link onClick={() => urlService.openTab(linkConfig.rulesShop)}>
            правилами
          </Link>{' '}
          покупки товаров.
        </MiniInfoCell>
        <Div></Div>
        <FixedLayout filled vertical="bottom">
          <Button
            stretched
            disabled={!selectItem}
            size="m"
            loading={isLoadingBuy}
            onClick={onClickButtonBuy}
          >
            Купить
          </Button>
        </FixedLayout>
      </Group>
    </>
  );
};
