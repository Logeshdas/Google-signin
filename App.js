// 653363631332-mrngtgmnk6ojj7fq6g7bfrcfmo2bkd1e.apps.googleusercontent.com

import React, { Component,useState,useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button
} from 'react-native';

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    configureGoogleSign();
  }, []);

  function configureGoogleSign() {
    GoogleSignin.configure({
      webClientId: '653363631332-mrngtgmnk6ojj7fq6g7bfrcfmo2bkd1e.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }

  async function signIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      setError(null);
      setIsLoggedIn(true);
    } catch (error) {
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // when user cancels sign in process,
      //   Alert.alert('Process Cancelled');
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   // when in progress already
      //   Alert.alert('Process in progress');
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // when play services not available
      //   Alert.alert('Play services are not available');
      // } else {
      //   // some other error
      //   Alert.alert('Something else went wrong... ', error.toString());
      //   setError(error);
      // }
      console.warn(error)
    }
  }

  async function signOut() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert('Something else went wrong... ', error.toString());
    }
  }

  console.log('userinfo',userInfo)
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 18, color:'purple'}}>Hi Logesh! </Text>
      <GoogleSigninButton
        style={styles.signInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() => signIn()}
      />
      <View style={styles.status}>
        {isLoggedIn === false ? (
          <Text style={styles.loggedinMessage}>You must sign in!</Text>
        ) : (
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <Image source={{uri: userInfo.user.photo}} style={{width:100,height:100}}/>
          <Text>{userInfo.user.name}</Text>
          <Text>{userInfo.user.email}</Text>
          <Button onPress={() => signOut()} title="Sign out" color="#332211" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButton: {
    width: 200,
    height: 50,
  },
});
