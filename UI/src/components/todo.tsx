import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Layout, ListItem, Text, Toggle } from '@ui-kitten/components';
import { Todo, TodoStatus } from '../classes';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TodoItem = ({
  todo,
  onDelete,
  onToggle,
}: {
  todo: Todo;
  onDelete: (id: Todo) => any;
  onToggle: (id: Todo) => any;
}) => {
  const handleDelete = () => {
    onDelete(todo);
  };

  const handleToggle = () => {
    onToggle(todo);
  };

  return (
    <>
      <ListItem
        title={() => (
          <Text style={todo.status.toString() == 'COMPLETED' ? styles.completed : null}>
            {todo.title}
          </Text>
        )}
        description={todo.description}
        accessoryRight={() => (
          <>
            <Toggle checked={todo.status.toString() == 'COMPLETED'} onChange={handleToggle} />
            <Button
              size='tiny'
              style={{ marginLeft: 8, backgroundColor: '#e57373' }}
              onPress={handleDelete}
              accessoryLeft={() => (
                <MaterialCommunityIcons name='delete' size={16} style={{ color: 'white' }} />
              )}
            />
          </>
        )}
      />
      <Divider></Divider>
    </>
  );
};

const styles = StyleSheet.create({
  completed: {
    textDecorationLine: 'line-through',
  },
  todoItem: {
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default TodoItem;
