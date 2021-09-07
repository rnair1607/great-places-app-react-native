import React from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";

function PlacesListScreen(props) {
  const places = useSelector((state) => state.places.places);

  // console.log(places);

  return (
    <View>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={(data) => (
          <PlaceItem
            image={data.item.imageUri}
            title={data.item.title}
            address={null}
            onSelect={() => {
              props.navigation.navigate("PlaceDetails", {
                placeTitle: data.item.title,
                placeId: data.item.id,
              });
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

PlacesListScreen.navigationOptions = (nav) => {
  return {
    headerTitle: "All Places",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            nav.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default PlacesListScreen;
