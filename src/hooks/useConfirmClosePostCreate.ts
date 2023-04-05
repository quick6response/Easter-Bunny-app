import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { back } from '@itznevikat/router';
import { PopoutTypes } from '@routes/structure.popout';
import { useCallback, useState } from 'react';

export const useConfirmClosePostCreate = () => {
  const { pushParameter } = useRouterPopout();
  const postText = useAppSelector((state) => state.postCreate.text);
  const postIsPhoto = useAppSelector((state) => state.postCreate.isPhoto);
  const [settlingHeight, setSettlingHeight] = useState(100);

  const backPostCreate = useCallback(() => {
    console.log('text, photo');
    if (postText || postIsPhoto) {
      setSettlingHeight(100);
      return pushParameter('popout', PopoutTypes.PostCreateConfirmWindowClose);
    }
    return back();
  }, [postText, postIsPhoto]);

  return {
    backPostCreate,
    settlingHeight,
  };
};
