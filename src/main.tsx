import { DevSupport } from '@react-buddy/ide-toolbox';
import { store } from '@store/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
import { ComponentPreviews, useInitial } from './dev';

const queryClient = new QueryClient();
const app = (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ConfigProvider isWebView>
          <AdaptivityProvider>
            <AppRoot>
              <DevSupport
                ComponentPreviews={ComponentPreviews}
                useInitialHook={useInitial}
              >
                <App />
              </DevSupport>
              <ReactQueryDevtools initialIsOpen={false} />
            </AppRoot>
          </AdaptivityProvider>
        </ConfigProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);

// const enhancedBridge = applyMiddleware(logger)(bridge);
// eslint-disable-next-line unicorn/prefer-query-selector

const root: Root = createRoot(document.querySelector('#root')!);
bridge.send('VKWebAppInit', {});
root.render(app);
