import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { default as theme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/navigator';
import UserProvider from './src/context/user.context';

export default function App() {
  return (
    <>
      <UserProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
          <AppNavigator />
        </ApplicationProvider>
      </UserProvider>
    </>
  );
}
