import React, { useEffect } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/actions/places";

function PlacesListScreen(props) {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.places.places);

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, []);

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
