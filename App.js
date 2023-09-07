import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const addTask = () => {
    if (text.trim() !== '') {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Math.random().toString(), text, completed: false },
      ]);
      setText('');
    }
  };

  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    setTaskToDelete(taskToDelete);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirmed = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setDeleteModalVisible(false);
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Lista de Tareas</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Agregar una tarea"
        value={text}
        onChangeText={setText}
        placeholderTextColor="black"
      />
      <Button title="Agregar" onPress={addTask} color="#007AFF" />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={item.completed ? styles.completedTaskText : styles.taskText}>{item.text}</Text>
            <TouchableOpacity onPress={() => toggleTask(item.id)}>
              <Text style={styles.toggleText}>Completado</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal isVisible={isDeleteModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>¿Estás seguro de eliminar este ítem?</Text>
          <Button
            title="Cancelar"
            onPress={() => {
              setDeleteModalVisible(false);
              setTaskToDelete(null);
            }}
            color="#007AFF"
          />
          <Button
            title="Eliminar"
            onPress={() => {
              handleDeleteConfirmed(taskToDelete.id);
              setTaskToDelete(null);
            }}
            color="red"
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  titleContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 28, 
    marginBottom: 10,
    color: 'white',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'beige',
    fontSize: 18, 
    color: 'black', 
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: 'white', 
  },
  taskText: {
    fontSize: 20, 
    color: 'black', 
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    fontSize: 20,
    color: 'gray',
  },
  toggleText: {
    color: 'blue',
    marginLeft: 10,
    fontSize: 18, 
  },
  deleteText: {
    color: 'red',
    marginLeft: 10,
    fontSize: 18, 
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24, 
    marginBottom: 10,
  },
});

