export const appConfig = {
  version: import.meta.env.VITE_APP_CONFIG_VERSION || '0.0',
  versionBuild:
    import.meta.env.VITE_APP_CONFIG_VERSION_BUILD || '(115) Mini-Feature',
  appUrl: 'https://vk.com/app51585569',
  groupId: 212_921_812,
} as const;
