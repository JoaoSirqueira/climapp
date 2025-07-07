import { StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'

export default function Index() {
  return (
    <LinearGradient
      colors={["#00457D", "#05051F"]}
      style={styles.container}
    >
      <Image source={require("../assets/images/Logo.png")}/>
      <Image source={require("../assets/images/Weather.png")}></Image>
      <Text>Boas-vindas!</Text>

      <TouchableOpacity>
        <Text>Entrar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
