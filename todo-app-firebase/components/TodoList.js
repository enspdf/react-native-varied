import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";

import colors from "../Colors";
import TodoModal from "./TodoModal";

const TodoList = ({ list, updateList }) => {
  const [showListVisible, setShowListVisible] = useState(false);
  const [count, setCount] = useState({
    completed: 0,
    remaining: 0,
  });

  useEffect(() => {
    if (list && list.todos) {
      const completedCount = list.todos.filter((todo) => todo.completed).length;
      const remainingCount = list.todos.length - completedCount;

      setCount({ completed: completedCount, remaining: remainingCount });
    }
  }, [list, updateList]);

  const toggleListModal = () => setShowListVisible(!showListVisible);

  return (
    <View>
      <Modal
        animationType="slide"
        visible={showListVisible}
        onRequestClose={toggleListModal}
      >
        <TodoModal
          list={list}
          closeModal={toggleListModal}
          updateList={updateList}
        />
      </Modal>
      <TouchableOpacity
        style={[styles.listContainer, { backgroundColor: list.color }]}
        onPress={toggleListModal}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>
        <View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{count.remaining}</Text>
            <Text style={styles.subTitle}>Remaining</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{count.completed}</Text>
            <Text style={styles.subTitle}>Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 40,
    fontWeight: "200",
    color: colors.white,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
});

export default TodoList;
