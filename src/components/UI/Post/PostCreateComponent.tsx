import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { postCreateActions } from '@store/post/post.create.slice';
import { Icon24Camera } from '@vkontakte/icons';
import { File, FormItem, Group, Textarea } from '@vkontakte/vkui';
import {
  ChangeEvent,
  createRef,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from 'react';

interface IPostCreateComponent {
  photo: [
    File | null | undefined,
    Dispatch<SetStateAction<File | null | undefined>>,
  ];
}

export const PostCreateComponent: FC<IPostCreateComponent> = ({
  photo: files,
}) => {
  const inputReference = createRef<HTMLTextAreaElement>();
  const postCreate = useAction(postCreateActions);
  const text = useAppSelector((state) => state.postCreate.text);

  const [file, setFile] = files;
  const [dragOver, setDragOver] = useState<boolean>(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setDragOver(false);
  };
  const handleDrop = async (
    event: React.DragEvent<HTMLDivElement>,
  ): Promise<void> => {
    event.preventDefault();
    const photo = event.dataTransfer.files.item(0);
    if (!photo) return;
    setFile(photo);
    setDragOver(false);
  };
  const onChangeInputImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const photo = event?.target?.files?.item(0);
    if (!photo) return;
    setFile(photo);
  };

  return (
    <Group>
      <FormItem top="Содержание поста">
        <Textarea
          getRef={inputReference}
          value={text}
          onChange={(event) =>
            postCreate.setText({
              text: event.target?.value?.replace(/\s+/g, ' ')?.trim(),
            })
          }
          placeholder="Содержание вашего поста. (минимум 5 символов)"
        />
      </FormItem>

      <FormItem top="Загрузите фотографию">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: dragOver ? '2px dashed blue' : '2px solid black',
            borderRadius: '10px',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          {!file ? (
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
                onClick={() => setFile(null)}
                style={{ position: 'absolute', top: '0', right: '0' }}
              >
                X
              </button>
              <img
                src={URL.createObjectURL(file)}
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
