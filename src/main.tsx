import { store } from '@store/index';
import bridge from '@vkontakte/vk-bridge';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui-tokens/themes/vkCom/cssVars/declarations/onlyVariables.css';
import '@vkontakte/vkui-tokens/themes/vkComDark/cssVars/declarations/onlyVariablesLocal.css';
import '@vkontakte/vkui/dist/components.css';
import '@vkontakte/vkui/dist/vkui.css';
import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './app.css';

const app = (
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider isWebView>
        <AdaptivityProvider>
          <AppRoot>
            <App />
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </Provider>
  </StrictMode>
);

// const enhancedBridge = applyMiddleware(logger)(bridge);
bridge.send('VKWebAppInit', {});
// eslint-disable-next-line unicorn/prefer-query-selector
const root: Root = createRoot(document.getElementById('root')!);
root.render(app);
