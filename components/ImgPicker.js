import React, { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import Colors from "../contants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { TouchableOpacity } from "react-native-gesture-handler";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "Please grant camera permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    // console.log(image.uri);
    setPickedImage(image.uri);
    props.onImageTake(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <TouchableOpacity onPress={takeImageHandler}>
            <Text>Capture an image</Text>
          </TouchableOpacity>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
