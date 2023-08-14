import { useApp } from "@realm/react";
import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Alert,
} from "react-native";
import { LoginTemplate } from "./LoginTemplate";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { gql, useLazyQuery } from "@apollo/client";
import * as Progress from "react-native-progress";

const GET_EMAIL = gql`
  query GetUser($username: String) {
    getUser(username: $username) {
      email
    }
  }
`;

export const UserLogin = () => {
  const [user, updateUser] = useState(""); // This is email or username!
  const [password, updatePassword] = useState("");
  const [getUser, getUserResult] = useLazyQuery(GET_EMAIL, {
    fetchPolicy: "no-cache",
    // When email is queried, retry
    onCompleted: (data) => login(password, undefined, data.getUser.email),
  });
  const app = useApp();

  async function login(
    password: string,
    email?: string,
    queriedEmail?: string
  ) {
    // Log in user - first try with email, then username

    if (email) {
      try {
        await app.logIn(Realm.Credentials.emailPassword(email, password));
      } catch (err) {
        // Retry, treating the supposed email as a username instead
        // When getUser completes it will rerun this function
        console.log("Failed. Trying to query email");
        await getUser({
          variables: {
            username: email,
          },
        });
      }
    } else if (queriedEmail) {
      try {
        console.log("Retrying with queried email", queriedEmail);
        await app.logIn(
          Realm.Credentials.emailPassword(queriedEmail, password)
        );
      } catch (err) {
        // Queried email failed. User must not exist
        Alert.alert(
          "Sorry!",
          "We couldn't find a user with that email or username"
        );
      }
    }
  }

  return (
    <LoginTemplate text="Enter your account details">
      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <FontAwesome5Icon
            name={"user-alt"}
            size={18}
            style={{ opacity: 0.8 }}
          />
          <TextInput
            onChangeText={(text) => updateUser(text)}
            placeholder="Email or Username"
            placeholderTextColor={"#999"}
          />
        </View>
        <View style={styles.fieldContainer}>
          <FontAwesome5Icon name={"key"} size={18} style={{ opacity: 0.8 }} />
          <TextInput
            onChangeText={(text) => updatePassword(text)}
            placeholder="Password"
            placeholderTextColor={"#999"}
          />
        </View>
        {/* This needs to be updated so that the loading effect handles the recall of login */}
        <AuthoriseButton onPress={() => login(password, user)} />
      </View>
    </LoginTemplate>
  );
};

export const AuthoriseButton = ({ onPress }) => {
  const [waiting, updateWaiting] = useState(false);

  return (
    <TouchableHighlight
      style={styles.loginButton}
      onPress={async () => {
        updateWaiting(true);
        await onPress();
        updateWaiting(false);
      }}
    >
      {waiting ? (
        <Progress.Circle color={"white"} size={25} indeterminate />
      ) : (
        <>
          <Text style={styles.loginText}>Start Climbing</Text>
          <MaterialIcons name="double-arrow" size={18} color="white" />
        </>
      )}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 15,
    width: 300,
  },
  textFields: {
    backgroundColor: "white",
    borderColor: "#AAA",
    borderWidth: 0.5,
    borderRadius: 5,
    width: 275,
    paddingVertical: 2,
    paddingHorizontal: 5,
    fontSize: 16,
  },
  fieldLabel: {
    color: "red",
    fontFamily: "Lexend",
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#FF3131",
    borderWidth: 0.5,
    height: 45,
    gap: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
    backgroundColor: "#FF3131",
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 5,
    height: 40,
  },
  loginText: {
    fontSize: 18,
    color: "white",
  },
});
