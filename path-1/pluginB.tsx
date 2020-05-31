// @ts-nocheck

export const PluginB = createPlugin({
  id: 'b',
  register({ router }) {
    router.registerRoute('/b', ComponentB);
  },
});
