import { postConfig } from '@config/post.config';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { postCreateActions } from '@store/post/post.create.slice';
import { Icon24Camera, Icon36Done } from '@vkontakte/icons';
import {
  File,
  FormItem,
  Group,
  Placeholder,
  Progress,
  Spinner,
  Textarea,
} from '@vkontakte/vkui';
import { clsx } from 'clsx';
import {
  ChangeEvent,
  createRef,
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './post.module.css';

interface IPostCreateComponent {
  errorPhoto?: string;
  errorPost?: string;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  refPhoto: React.MutableRefObject<File | undefined>;
}

export const PostCreateComponent: FC<IPostCreateComponent> = ({
  errorPhoto: errorPhotoApi,
  errorPost,
  isLoading,
  isSuccess,
  refPhoto,
}) => {
  const inputReference = createRef<HTMLTextAreaElement>();
  const text = useAppSelector((state) => state.postCreate.text);
  const postCreate = useAction(postCreateActions);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [photo, setPhoto] = useState<File | null>();
  const [errorPhoto, setErrorPhoto] = useState(errorPhotoApi);

  const inputPercentage = useMemo(
    () =>
      (text?.replace(/\s+/g, ' ').trim()?.length / postConfig.maxLength) * 100,
    [text],
  );

  useEffect(() => {
    inputReference.current?.focus();
  }, []);

  const onChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    postCreate.setText({
      text: event.target?.value,
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setDragOver(false);
  };

  const setPhotoInput = (file: File) => {
    refPhoto.current = file;
    setPhoto(file);
    postCreate.setIsPhoto(true);
  };

  const deletePhotoInput = () => {
    setPhoto(null);
    postCreate.setIsPhoto(false);
    refPhoto.current = undefined;
  };

  /**
   * Проверка на фото
   * @param file
   */
  const checkPhotoDownload = (file?: File | null): file is File => {
    if (!file || file.type.indexOf('image') !== 0) {
      alert('Разрешены только файлы с изображениями');
      setErrorPhoto('Можно загрузить только фото.');
      return false;
    }
    setErrorPhoto('');
    return true;
  };

  const handleDrop = async (
    event: React.DragEvent<HTMLDivElement>,
  ): Promise<void> => {
    event.preventDefault();
    const photoItem = event.dataTransfer.files.item(0);
    if (!checkPhotoDownload(photoItem)) return;
    setPhotoInput(photoItem);
    setDragOver(false);
  };

  const onChangeInputImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const photoItem = event?.target?.files?.item(0);
    if (!checkPhotoDownload(photoItem)) return;
    setPhotoInput(photoItem);
  };

  if (isLoading)
    return (
      <Group>
        <Spinner></Spinner>
      </Group>
    );

  if (isSuccess)
    return (
      <Group>
        <Placeholder icon={<Icon36Done />}>Запись опубликована</Placeholder>
      </Group>
    );

  return (
    <Group>
      <FormItem
        top="Текст поста"
        bottom={errorPost ?? ''}
        status={!errorPost ? 'default' : 'error'}
      >
        <Textarea
          getRootRef={inputReference}
          getRef={inputReference}
          value={text}
          maxLength={postConfig.maxLength}
          onChange={onChangeText}
          placeholder={`Содержание записи. (минимум ${postConfig.minLength} символов)`}
        />
        <Progress
          aria-labelledby="progresslabel"
          value={inputPercentage}
          style={{
            borderRadius: '30px',
            width: '95%',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      </FormItem>

      <FormItem
        top={!photo ? 'Выберите фотографию' : 'Фотография готова'}
        bottom={errorPhoto ?? ''}
        status={!errorPhoto ? 'default' : 'error'}
      >
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={clsx(styles.createDiv, {
            [styles.createDivOk]: photo,
          })}
          style={{
            border: dragOver ? '2px dashed blue' : '2px solid black',
            borderRadius: '10px',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          {!photo ? (
            <div>
              <p>Перетяните фотографию сюда</p>
              <p>или</p>
              <File
                name="photo"
                accept="image/*"
                before={<Icon24Camera role="presentation" />}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onChange={onChangeInputImage}
                size="m"
              >
                Выберите из галереи
              </File>
              <div />
              <br />
            </div>
          ) : (
            <div style={{ position: 'relative', margin: '10px' }}>
              <button
                onClick={() => deletePhotoInput()}
                style={{ position: 'absolute', top: '0', right: '0' }}
              >
                X
              </button>
              <img
                src={URL.createObjectURL(photo)}
                alt="uploaded"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  borderRadius: '10px',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}
        </div>
      </FormItem>
    </Group>
  );
};
