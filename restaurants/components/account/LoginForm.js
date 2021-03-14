import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import Loading from "../Loading";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../utils/helpers";
import { isEmpty } from "lodash";
import { loginWithEmailAndPassword } from "../../utils/actions";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onChange = (event, type) => {
    setFormData({ ...formData, [type]: event.nativeEvent.text });
  };

  const doLogin = async () => {
    if (!validateData()) {
      return;
    }

    setLoading(true);

    const result = await loginWithEmailAndPassword(
      formData.email,
      formData.password
    );

    setLoading(false);

    if (!result.statusResponse) {
      setErrorEmail(result.error);
      setErrorPassword(result.error);

      return;
    }

    navigation.navigate("account");
  };

  const validateData = () => {
    setErrorEmail("");
    setErrorPassword("");

    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail("Invalid email address");
      isValid = false;
    }

    if (isEmpty(formData.password)) {
      setErrorPassword("Password is required");
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.container}>
      <Input
        containerStyle={styles.input}
        placeholder="Email address"
        onChange={(e) => onChange(e, "email")}
        keyboardType="email-address"
        errorMessage={errorEmail}
        defaultValue={formData.email}
      />
      <Input
        containerStyle={styles.input}
        placeholder="Password"
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
      <Button
        title="Login"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={doLogin}
      />
      <Loading isVisible={loading} text="Sign in" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
