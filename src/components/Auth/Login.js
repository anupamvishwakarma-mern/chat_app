import React, { useState, version } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from "@react-navigation/native";

export const Login = () => {

  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const navigation = useNavigation()

  const signInWithPhoneNumber = async () => {
    try {
      //validate phone number format
      const phoneRegex = /$/;
      if (!phoneRegex.test(phoneNumber)) {
        alert("Invalid phone number format. Please enter a valid number.")
        return;
      }
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation)
    } catch (error) {
      alert("Error sending code. Please try again later.");
      console.log("Error sending code: ", error)
    }
  };

  const confirmCode = async () => {
    try {
      //validate code format
      if (!code || code.length !== 6) {
        alert("Invalid code. Please enter valid 6-digit code")
        return;
      }

      const userCredential = await confirm.confirm(code);
      const user = userCredential.user

      //check if the user is new or existing
      const userDocument = await firestore().collection("users").doc(user.uid).get();

      if (userDocument.exists) {
        //user is existing, navigate to dashboard
        navigation.navigate("Dashboard");
      } else {
        navigation.navigate("Detail", { uid: user.uid });
      }
    } catch (error) {
      alert("Invalid code. Please enter the correct code.")
      console.log("Invalid code. ", error)
    }
  }


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        position: "relative"
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '25%'
        }}>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#ADD8E6",
          padding: 20,
          borderTopLeftRadius: 100,
          position: "absolute",
          top: '25%',
          left: 0,
          right: 0,
          bottom: 0
        }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: 40,
            marginTop: 20,
            textAlign: 'center'
          }}>
          Chatter App
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: 'center',
            marginBottom: 30
          }}>
          <Image
            source={require("../../../assets/favicon.png")}
            style={{
              width: 150,
              height: 150,
              borderRadius: 50
            }}
          />
        </View>
        {
          !confirm ? (
            <>
              <Text
                style={{
                  marginBottom: 20,
                  fontSize: 18,
                  color: "#808080"
                }}>
                Enter your number with country code:
              </Text>
              <TextInput
                style={{

                  height: 50,
                  width: "100%",
                  borderColor: "black",
                  borderWidth: 1,
                  marginBottom: 30,
                  paddingHorizontal: 10,
                  borderRadius: 10
                }}
                placeholder="e.g., +91 000-000-0000"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad" />
              <TouchableOpacity
                onPress={signInWithPhoneNumber}
                style={{
                  backgroundColor: "#007BFF",
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 20,
                  alignItems: 'center'
                }} >

                <Text
                  style={{
                    color: "white",
                    fontSize: 22,
                    fontWeight: "bold"
                  }}>
                  Verify Phone Number
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text
                style={{
                  marginBottom: 20,
                  fontSize: 18,
                  color: "#808080"
                }}>
                Enter the code sent to your phone:
              </Text>
              <TextInput
                style={{
                  height: 50,
                  width: "100%",
                  borderColor: "black",
                  borderWidth: 1,
                  marginBottom: 30,
                  paddingHorizontal: 10,
                  borderRadius: 10
                }}
                placeholder="Enter code"
                value={code}
                onChangeText={setCode}
                keyboardType="phone-pad" />
              <TouchableOpacity
                onPress={confirmCode}
                style={{
                  backgroundColor: "#007BFF",
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 20,
                  alignItems: "center"
                }} >
                <Text
                  style={{
                    color: "white",
                    fontSize: 22,
                    fontWeight: "bold"
                  }}>
                  Confirm Code
                </Text>
              </TouchableOpacity>
            </>
          )
        }
      </View>
    </View>
  )

}