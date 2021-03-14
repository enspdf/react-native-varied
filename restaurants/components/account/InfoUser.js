import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Avatar } from "react-native-elements";
import { uploadImage, updateProfile } from "../../utils/actions";
import { loadImageFromGallery } from "../../utils/helpers";

export default function InfoUser({ user, setLoading, setLoadingText }) {
  const [photoUrl, setPhotoUrl] = useState(user.photoURL);

  const changePhoto = async () => {
    const result = await loadImageFromGallery([1, 1]);

    if (!result.status) return;

    setLoadingText("Updating image...");
    setLoading(true);

    const resultUploadImage = await uploadImage(
      result.image,
      "avatars",
      user.uid
    );

    if (!resultUploadImage.statusResponse) {
      setLoading(false);
      Alert.alert("Something went wrong saving profile photo");

      return;
    }

    const resultUpdateProfile = await updateProfile({
      photoURL: resultUploadImage.url,
    });

    setLoading(false);

    if (resultUpdateProfile.statusResponse) {
      setPhotoUrl(resultUploadImage.url);
    } else {
      Alert.alert("Something went wrong updating profile photo");
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="large"
        onPress={changePhoto}
        source={
          photoUrl
            ? { uri: photoUrl }
            : require("../../assets/avatar-default.jpg")
        }
      />
      <View style={styles.infoUser}>
        <Text style={styles.displayName}>
          {user.displayName ? user.displayName : "Anonymous"}
        </Text>
        <Text>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    paddingVertical: 30,
  },
  infoUser: {
    marginLeft: 20,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
