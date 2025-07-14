import { StyleSheet, View, Text } from "react-native"
import { LinearGradient } from 'expo-linear-gradient'
import citiesData from '../data/cities.json'

const Cities = () => {
    return (
        <LinearGradient 
            colors={["#00457D", "#05051F"]} 
            style={styles.container}
        >
            {
                citiesData.map(city => (
                    <View style={styles.listItem}>
                        <Text style={styles.cityName}>{city.city}</Text>
                    </View>
                ))
            }
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        gap: 16,
    },
    listItem: {
        height: 63,
        width: '100%',
        backgroundColor: "rgba(255,255,255, 0.15)",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },
    cityName: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Montserrat_500Medium'
    },
})

export default Cities;