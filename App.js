import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import PlacesNavigator from "./navigation/PlacesNavigator";
import placesReducer from "./store/reducers/places";

const rootReducer = combineReducers({
  places: placesReducer,
});

// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
