import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  Button,
  Divider,
  Layout,
  ListItem,
  TopNavigation,
  Text,
  List,
  useTheme,
  CheckBox,
} from '@ui-kitten/components';
import { User } from '../classes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserContext } from '../context/user.context';
import { getUsers } from '../services';

export const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const { user, setLoggedUser, token } = useContext(UserContext);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);
  const handleCreateAccount = () => {
    console.log('Create account button clicked!');
  };

  async function loadUsers() {
    setLoading(true);
    setError(null);
    try {
      // throw new Error("Super Errpr")
      setUsers(await getUsers());
    } catch (e) {
      console.log(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const renderItem = ({ item, index }: { item: any; index: number }): React.ReactElement => (
    <>
      <ListItem
        title={item.firstName + ' ' + item.lastName}
        description={item.email}
        accessoryLeft={(props): any => (
          <MaterialCommunityIcons name='account' size={18} color={theme['color-info-400']} />
        )}
        onPress={() => {
          if (item.id == user?.id) {
            setLoggedUser(null);
          } else {
            setLoggedUser(item);
          }
        }}
        accessoryRight={
          <CheckBox
            checked={user?.id == item.id}
            onChange={(checked) => {
              if (checked) {
                setLoggedUser(item);
              } else {
                setLoggedUser(null);
              }
            }}
          />
        }
      />
      <Divider></Divider>
    </>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Select a user account' alignment='center' />
      <Divider />
      <Layout style={{ height: '100%', padding: 4 }}>
        <Text>Choose a User to Sign In:</Text>
        <List style={styles.container} data={users} renderItem={renderItem} />
        <View>
          <View style={styles.beforeElement} />
          <Text style={styles.orLabel}>Or</Text>
          <View style={styles.afterElement} />
        </View>

        <Button onPress={handleCreateAccount}>Create Account</Button>
        {error && (
          <View style={styles.errorMsg}>
            <Text>{error}</Text>
          </View>
        )}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 190,
    overflow:"scroll",
    backgroundColor: 'transparent',
  },
  beforeElement: {
    position: 'absolute',
    top: 17,
    left: 0,
    width: '45%',
    height: 1,
    backgroundColor: 'white',
    content: '',
  },
  afterElement: {
    position: 'absolute',
    top: 17,
    right: 0,
    width: '45%',
    height: 1,
    backgroundColor: 'white',
    content: '',
  },
  errorMsg: {
    position: 'absolute',
    left: 0,
    bottom: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '102%',
    height: 50,
    backgroundColor: '#e57373',
    padding: 8,
    color: 'red',
  },
  orLabel: {
    textAlign: 'center',
    margin: 8,
  },
});
