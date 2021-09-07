import React from "react";
import { StyleSheet, Text, View } from "react-native";

function PlaceDetailScreen(props) {
  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
}

PlaceDetailScreen.navigationOptions = (data) => {
  return {
    headerTitle: data.navigation.getParam("placeTitle"),
  };
};
const styles = StyleSheet.create({});

export default PlaceDetailScreen;
