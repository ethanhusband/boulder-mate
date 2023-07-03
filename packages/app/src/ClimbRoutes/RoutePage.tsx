import { Route } from "common";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
} from "react-native";

import { useState } from "react";
import { RoutePageHeader } from "./RoutePageHeader";
import { RouteMetadata } from "./RouteMetadata";
import { LinearGradient } from "expo-linear-gradient";
import { RouteDiscussion } from "./RouteDiscussion";

let height = Dimensions.get("screen").height;

// Input refers to page route, not the object
export const RoutePage = ({ route }) => {
  const [selected, updateSelected] = useState("Details");
  var routeObj = route.params.route;
  var headerButton = route.params.headerButton;

  return (
    <View style={styles.container}>
      <LinearGradient start={{ x: 0.5, y: 0.5 }} colors={["#FFF", "#EEE"]}>
        <RoutePageHeader route={routeObj}>{headerButton()}</RoutePageHeader>
        
        <SectionSelector selected={selected} updateSelected={updateSelected} />
        {selected === "Disc" ? <RouteDiscussion /> : <RouteMetadata />}
      </LinearGradient>
    </View>
  );
};

const SectionSelector = ({ selected, updateSelected }) => {
  return (
    <View style={styles.selector}>
      <TouchableHighlight
        style={
          selected === "Details"
            ? styles.selected
            : [
                styles.selection,
                { borderBottomRightRadius: 15, borderRightWidth: 0.5 },
              ]
        }
        onPress={() => updateSelected("Details")}
      >
        <Text
          style={
            selected === "Details" ? styles.selectionText : styles.selectedText
          }
        >
          Details
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={
          selected === "Disc"
            ? styles.selected
            : [
                styles.selection,
                { borderBottomLeftRadius: 15, borderLeftWidth: 0.5 },
              ]
        }
        onPress={() => updateSelected("Disc")}
      >
        <Text
          style={
            selected === "Disc" ? styles.selectionText : styles.selectedText
          }
        >
          Discussion
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "scroll",
    height,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 45,
  },
  selectedText: {
    fontSize: 15,
    fontFamily: "Lexend",
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    color: "white",
  },
  selectionText: {
    fontSize: 15,
    fontFamily: "Lexend",
  },
  selection: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3131",
    borderBottomWidth: 0.5,
  },
  selected: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
