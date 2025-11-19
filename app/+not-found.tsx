import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
    <Stack.Screen options={{ title: 'Oops! Not Found' }} />
    <View style={styles.container}>
        <Link href="/" style={styles.button}>
        Go to home screen!</Link>
      <Text>NotFoundScreen</Text>
    </View>
    </>    
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9acd32',
  },
  button:{
    backgroundColor: '#808000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  } 
});