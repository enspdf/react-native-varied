import { isEmpty } from "lodash";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { updateProfile } from "../../utils/actions";

export default function ChangeDisplayNameForm({
  displayName,
  setShowModal,
  toastRef,
  setReloadUser,
}) {
  const [newDisplayName, setNewDisplayeName] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const result = await updateProfile({ displayName: newDisplayName });

    setLoading(false);

    if (!result.statusResponse) {
      setError("Error updating name and last name, try again later");
      return;
    }

    setReloadUser(true);
    toastRef.current.show("Name and last name was updated successfully", 300);
    setShowModal(false);
  };

  const validateForm = () => {
    setError(null);

    if (isEmpty(newDisplayName)) {
      setError("Name and last name are required");
      return false;
    }

    if (newDisplayName === displayName) {
      setError("Name and last name can not be equal");
      return false;
    }

    return true;
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Type your name & last name"
        containerStyle={styles.input}
        defaultValue={displayName}
        onChange={(e) => setNewDisplayeName(e.nativeEvent.text)}
        errorMessage={error}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
      />
      <Button
        title="Update name & last name"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingVertical: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    width: "95%",
  },
  btn: {
    backgroundColor: "#442484",
  },
});
