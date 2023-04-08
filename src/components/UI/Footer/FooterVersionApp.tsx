import { appConfig } from '@config/app.config';
import { linkConfig } from '@config/link.config';
import { urlService } from '@services/link/url.service';
import { Footer, Link } from '@vkontakte/vkui';

import { FC } from 'react';

import styles from './footer.module.css';

export const FooterVersionApp: FC = () => {
  return (
    <Footer className={styles.footerVersionText}>
      С любовью и багами, {''}
      <Link
        cellSpacing={10}
        onClick={() => urlService.openTab(linkConfig.groupITHub)}
      >
        ITHube
      </Link>
      <img
        src={`https://srv.apiuser.ru/file/love`}
        alt="❤"
        draggable={false}
        style={{
          height: '1em',
          margin: '0 .05em 0 .1em',
          verticalAlign: '-0.1em',
          width: '1em',
        }}
      />
      <br />v{appConfig.version} {appConfig.versionBuild}
    </Footer>
  );
};
