import bridge from '@vkontakte/vk-bridge';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RouterProvider from 'react-router-vkminiapps';
import App from './App';
import structure from './structure.navigate';
import '@vkontakte/vkui/dist/vkui.css';
import './app.css';
import '@vkontakte/vkui-tokens/themes/vkCom/cssVars/declarations/onlyVariables.css';
import '@vkontakte/vkui-tokens/themes/vkComDark/cssVars/declarations/onlyVariablesLocal.css';
import '@vkontakte/vkui/dist/components.css';

bridge.send('VKWebAppInit', {});

createRoot(document.querySelector('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider structure={structure}>
      <ConfigProvider appearance="dark">
        <AdaptivityProvider>
          <AppRoot>
            <App />
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </RouterProvider>
  </StrictMode>,
);
