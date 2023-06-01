import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Divider, Input, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createTodo } from '../services';
import { UserContext } from '../context/user.context';

const CreateTodo = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { token } = useContext(UserContext);

  const handleCreateTodo = async () => {
    const newTodo = {
      title,
      description,
    };
    setError(null);
    try {
      console.log(await createTodo(newTodo, token));
      navigation.navigate('Todo');
    } catch (e) {
      setError(e.message);
    }
  };

  const navigateBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title='Create Todo'
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
        <View style={styles.formContainer}>
          <Input
            label='Title'
            value={title}
            onChangeText={setTitle}
            placeholder='Enter the title'
          />
          <Input
            label='Description'
            value={description}
            onChangeText={setDescription}
            placeholder='Enter the description'
            multiline
            textStyle={styles.descriptionInput}
          />
          <Button onPress={handleCreateTodo}>Create Todo</Button>
        </View>
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
  },
  formContainer: {
    marginTop: 4,
    flex: 1,
    rowGap: 16,
  },
  descriptionInput: {
    minHeight: 100,
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
  backIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    color: 'white',
    top: -4,
    left: 8,
  },
});

export default CreateTodo;
