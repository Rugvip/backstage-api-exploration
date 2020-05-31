// @ts-nocheck

export const PluginA = createPlugin({
  id: 'a',
  register({ router, featureFlags }) {
    if (featureFlags.enabled('enable-a')) {
      router.registerRoute('/a', ComponentA);
    }

    featureFlags.register('enable-a');
  },
});
