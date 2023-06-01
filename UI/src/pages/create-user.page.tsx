import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Divider, TopNavigation, Text } from '@ui-kitten/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { Button, Input, Layout } from '@ui-kitten/components';
import { createNewUser } from '../services';
import { UserContext } from '../context/user.context';

export const CreateUser = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setLoggedUser } = useContext(UserContext);

  const navigateBack = () => {
    navigation.goBack();
  };

  const handleRegister = async () => {
    // Logic to handle user registration
    setLoading(true);
    setError(null);
    try {
      let user = await createNewUser({ email, firstName, lastName });
      navigation.navigate('Users');
      setLoggedUser(user);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
    console.log('Registration data:', {
      email,
      firstName,
      lastName,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title='Create User'
        alignment='center'
        accessoryLeft={() => (
          // <Icon name='arrow-back' onPress={navigateBack} style={styles.backIcon} />
          <MaterialCommunityIcons
            onPress={navigateBack}
            style={styles.backIcon}
            name='arrow-left'
            size={24}
          />
        )}
      />
      <Divider />
      <Layout style={styles.container}>
        <Input label='Email' value={email} onChangeText={setEmail} placeholder='Enter your email' />
        <Input
          label='First Name'
          value={firstName}
          onChangeText={setFirstName}
          placeholder='Enter your first name'
        />
        <Input
          label='Last Name'
          value={lastName}
          onChangeText={setLastName}
          placeholder='Enter your last name'
        />
        <Button onPress={handleRegister}>Register</Button>
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
    flex: 1,
    padding: 16,
    rowGap: 16,
    width: '100%',
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    color: 'white',
    top: -4,
    left: 8,
  },
  errorMsg: {
    position: 'absolute',
    left: 0,
    bottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '110%',
    height: 50,
    backgroundColor: '#e57373',
    padding: 8,
    color: 'red',
  },
  
});
