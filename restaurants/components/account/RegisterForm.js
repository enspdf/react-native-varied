import { size, isEqual } from "lodash";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { validateEmail } from "../../utils/helpers";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../../utils/actions";
import Loading from "../Loading";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onChange = (event, type) => {
    setFormData({ ...formData, [type]: event.nativeEvent.text });
  };

  const doRegisterUser = async () => {
    if (!validateData()) {
      return;
    }

    setLoading(true);

    const result = await registerUser(formData.email, formData.password);

    setLoading(false);

    if (!result.statusResponse) {
      setErrorEmail(result.error);
      return;
    }

    navigation.navigate("account");
  };

  const validateData = () => {
    setErrorConfirm("");
    setErrorEmail("");
    setErrorPassword("");

    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail("Email is invalid or required");
      isValid = false;
    }

    if (size(formData.password) < 6) {
      setErrorPassword("Password must have at least 6 characters");
      isValid = false;
    }

    if (size(formData.confirm) < 6) {
      setErrorConfirm("Password confirm must have at least 6 characters");
      isValid = false;
    }

    if (!isEqual(formData.password, formData.confirm)) {
      setErrorPassword("Password and confirmation don't match");
      setErrorConfirm("Password and confirmation don't match");
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.form}>
      <Input
        containerStyle={styles.input}
        placeholder="Your email"
        onChange={(e) => onChange(e, "email")}
        keyboardType="email-address"
        errorMessage={errorEmail}
        defaultValue={formData.email}
      />
      <Input
        containerStyle={styles.input}
        placeholder="Your password"
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errorPassword}
        defaultValue={formData.password}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        containerStyle={styles.input}
        placeholder="Confirm your password"
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "confirm")}
        errorMessage={errorConfirm}
        defaultValue={formData.confirm}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Register New User"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={doRegisterUser}
      />
      <Loading isVisible={loading} text="Creating account..." />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
  },
  input: {
    width: "100%",
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#442484",
  },
  icon: {
    color: "#C1C1C1",
  },
});
