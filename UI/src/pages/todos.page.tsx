import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import TodoItem from '../components/todo';
import { deleteTodo, getTodos, toggleTodo } from '../services';
import { UserContext } from '../context/user.context';
import { TopNavigation, Divider, Layout, Text, List, Button } from '@ui-kitten/components';
import { Todo } from '../classes';

const TodoList = ({ navigation }) => {
  const [taskList, setTaskList] = useState([]);
  const { token } = useContext(UserContext);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (token) {
        fetchTodos();
      } else {
        setTaskList([]);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const fetchTodos = async () => {
    try {
      const todos = await getTodos(token);
      setTaskList(todos);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      setError(error.message);
    }
  };

  const handleDelete = async (todo: Todo) => {
    await deleteTodo(token, todo);
    await fetchTodos();
  };

  const handleToggle = async (todo: Todo) => {
    await toggleTodo(token, todo);
    await fetchTodos();
  };

  const renderItem = ({ item }) => (
    <TodoItem todo={item} onDelete={handleDelete} onToggle={handleToggle} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='List of todos' alignment='center' />
      <Divider />
      <Layout style={styles.container}>
        <List
          style={styles.container}
          data={taskList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        {error && (
          <View style={styles.errorMsg}>
            <Text>{error}</Text>
          </View>
        )}

        <Button onPress={() => navigation.navigate('CREATE TODO')}>Create New Todo</Button>
      </Layout>
    </SafeAreaView>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
