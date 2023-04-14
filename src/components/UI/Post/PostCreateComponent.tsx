import { postConfig } from '@config/post.config';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { postCreateActions } from '@store/post/post.create.slice';
import {
  Icon24Camera,
  Icon36Done,
  Icon56DocumentOutline,
} from '@vkontakte/icons';
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
import { ChangeEvent, createRef, FC, useMemo, useState } from 'react';
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
  isError,
  refPhoto,
}) => {
  const inputReference = createRef<HTMLTextAreaElement>();
  const isAdmin = useAppSelector((state) => state.user.admin);
  const text = useAppSelector((state) => state.postCreate.text);
  const postCreate = useAction(postCreateActions);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [photo, setPhoto] = useState<File | null>();
  const [errorPhoto, setErrorPhoto] = useState(errorPhotoApi);
  const [preview, setPreview] = useState<string | null>('');

  // useEffect(() => {
  // //   if (errorPhotoApi) {
  // //     setErrorPhoto(errorPhotoApi);
  // //     // setPhoto(null);
  // //   }
  // // }, [errorPhotoApi]);

  const inputPercentage = useMemo(
    () =>
      (text?.replace(/\s+/g, ' ').trim()?.length / postConfig.maxLength) * 100,
    [text],
  );

  // useEffect(() => {
  //   inputReference.current?.focus();
  // }, []);

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
      // alert('Разрешены только файлы с изображениями');
      setErrorPhoto('Можно загрузить только фото.');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      // alert('Максимальный размер фотографии 10 МБ');
      setErrorPhoto('Извините, но максимальный размер фотографии 10 МБ.');
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

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    console.log('paste');
    const items = event.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.includes('image')) {
        const blob = item.getAsFile();
        if (!checkPhotoDownload(blob)) return;
        setPhotoInput(blob);
        break;
      }
    }
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
        <Placeholder icon={<Icon36Done />}>
          Запись отправлена на модерацию. В ближайшее время она будет проверена
          и опубликована.
        </Placeholder>
      </Group>
    );

  return (
    <Group>
      <FormItem
        top={`Содержание поста (минимум ${postConfig.minLength} символов)`}
        bottom={errorPost ?? ''}
        status={!errorPost ? 'default' : 'error'}
      >
        <Textarea
          getRootRef={inputReference}
          getRef={inputReference}
          value={text}
          maxLength={postConfig.maxLength}
          onChange={onChangeText}
          placeholder={`Ваш текст...`}
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
            <div onPaste={handlePaste}>
              <input
                onPaste={handlePaste}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  opacity: 0,
                }}
              />
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
              {!photo.type.includes('tiff') ? (
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
              ) : (
                <Icon56DocumentOutline />
              )}
            </div>
          )}
        </div>
      </FormItem>
    </Group>
  );
};
