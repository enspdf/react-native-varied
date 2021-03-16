import { isEmpty } from "lodash";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { updateProfile } from "../../utils/actions";
import { validateEmail } from "../../utils/helpers";

export default function ChangeEmailForm({
  email,
  setShowModal,
  toastRef,
  setReloadUser,
}) {
  const [newEmail, setNewEmail] = useState(email);
  const [password, setPassword] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    // setLoading(true);

    // const result = await updateProfile({ displayName: newDisplayName });

    // setLoading(false);

    // if (!result.statusResponse) {
    //   setError("Error updating name and last name, try again later");
    //   return;
    // }

    // setReloadUser(true);
    // toastRef.current.show("Name and last name was updated successfully", 300);
    // setShowModal(false);
  };

  const validateForm = () => {
    setErrorEmail(null);
    setErrorPassword(null);

    let isValid = true;

    if (!validateEmail(newEmail)) {
      setErrorEmail("Must be a valid email");
      isValid = false;
    }

    if (newEmail === email) {
      setErrorEmail("Can not be the same");
      isValid = false;
    }

    if (isEmpty(password)) {
      setErrorPassword("Password is required");
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Type the new email"
        containerStyle={styles.input}
        defaultValue={email}
        keyboardType="email-address"
        onChange={(e) => setNewEmail(e.nativeEvent.text)}
        errorMessage={errorEmail}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
      />
      <Input
        placeholder="Type your password"
        containerStyle={styles.input}
        defaultValue={password}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        errorMessage={errorPassword}
        password={true}
        secureTextEntry={!showPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={{ color: "#c2c2c2" }}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Update Email"
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
