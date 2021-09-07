import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../contants/Colors";

import * as placesActions from "../store/actions/places";

function NewPlaceScreen(props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(title));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Button
          title="Save place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

export default NewPlaceScreen;
