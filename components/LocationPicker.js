import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import Colors from "../contants/Colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [pickedLocation, setpickedLocation] = useState();
  const [isFetching, setisFetching] = useState(false);

  const mapPickedLocation = props.navigation.getParam("pickedLocation");

  const { onLocationPicked } = props;

  useEffect(() => {
    if (mapPickedLocation) {
      setpickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  const verifyPermissions = async () => {
    const result = await Location.requestForegroundPermissionsAsync();

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "Please grant location permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    try {
      setisFetching(true);
      const currentLocation = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });

      //   console.log(`currentLocation`, currentLocation);

      setpickedLocation({
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      });
      props.onLocationPicked({
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      });
    } catch (err) {
      Alert.alert("Could not fetch location!", "Please try again later", [
        { text: "Okay" },
      ]);
    }
    setisFetching(false);
  };

  const pickOnMapHandler = () => {
    // console.log("reached");
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        onPress={pickOnMapHandler}
        style={styles.mapPreview}
        location={pickedLocation}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>Choose a location</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick location on map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    // alignItems: "center",
    width: "100%",
  },
});

export default LocationPicker;
