import bridge from '@vkontakte/vk-bridge';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui-tokens/themes/vkCom/cssVars/declarations/onlyVariables.css';
import '@vkontakte/vkui-tokens/themes/vkComDark/cssVars/declarations/onlyVariablesLocal.css';
import '@vkontakte/vkui/dist/components.css';
import '@vkontakte/vkui/dist/vkui.css';
import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import RouterProvider from 'react-router-vkminiapps';
import App from './App';
import './app.css';
import structure from './structure.navigate';

const app = (
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
  </StrictMode>
);

// const enhancedBridge = applyMiddleware(logger)(bridge);
bridge.send('VKWebAppInit', {});
// eslint-disable-next-line unicorn/prefer-query-selector
const root: Root = createRoot(document.getElementById('root')!);
root.render(app);
