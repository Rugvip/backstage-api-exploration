// @ts-nocheck

import { PluginA } from './pluginA';
import { PluginB } from './pluginB';

const builder = ApiRegistry.builder();

const alertApi = builder.add(alertApiRef, new AlertApiForwarder());

builder.add(errorApiRef, new ErrorAlerter(alertApi, new ErrorApiForwarder()));
builder.add(lighthouseApiRef, new LighthouseRestApi('http://localhost:3003'));

const oauthRequestApi = builder.add(oauthRequestApiRef, new OAuthRequestManager());

builder.add(
  googleAuthApiRef,
  GoogleAuth.create({ apiOrigin: 'http://localhost:7000', basePath: '/auth/', oauthRequestApi })
);

const app = createApp({
  apis: builder.build(),
  plugins: [PluginA, PluginB],
});

const AppProvider = app.getProvider();
const AppComponent = app.getRootComponent();

// Not actually how this works, but the data model is similar
const sidebar = [
  { title: 'A', path: '/a' },
  { title: 'B', path: '/b' },
];

const App: FC<{}> = () => (
  <AppProvider>
    <AlertDisplay />
    <OAuthRequestDialog />
    <Router>
      <Root sidebar={sidebar}>
        <AppComponent />
      </Root>
    </Router>
  </AppProvider>
);
