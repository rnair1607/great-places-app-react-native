import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../contants/Colors";

function MapScreen(props) {
  const initialLocation = props.navigation.getParam("initialLocation");
  const readOnly = props.navigation.getParam("readonly");
  const [selectedLocation, setselectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation.lat || 12.9716,
    longitude: initialLocation.lng || 77.5946,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) return;
    props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  const selectLocationHandler = (event) => {
    // console.log(event);
    if (readOnly) {
      return;
    }
    setselectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
}

MapScreen.navigationOptions = (navData) => {
  const saveFn = navData.navigation.getParam("saveLocation");
  const readOnly = navData.navigation.getParam("readonly");
  if (readOnly) {
    return {};
  }
  return {
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});

export default MapScreen;
