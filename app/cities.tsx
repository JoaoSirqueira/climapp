import { StyleSheet, View, Text, Image, ScrollView } from "react-native"
import { LinearGradient } from 'expo-linear-gradient'
import citiesData from '../data/cities.json'

const Cities = () => {
    return (
        <LinearGradient
            colors={["#00457D", "#05051F"]}
            style={styles.container}
        >
            <ScrollView>
                <View style={styles.scrollList}>
                    {
                        citiesData.map(city => (
                            <View key={city.city} style={styles.listItem}>
                                <Image source={require('../assets/images/Clouds.png')} />
                                <Text style={styles.cityName}>{city.city.replace(",", " - ")}</Text>
                                <Text style={styles.cityTemp}>{city.temp}º</Text>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        gap: 16,
    },
    scrollList: {
        gap: 16,
    },
    listItem: {
        height: 63,
        width: '100%',
        backgroundColor: "rgba(255,255,255, 0.15)",
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 16,
        flexDirection: 'row',
        paddingHorizontal: 16,
    },
    cityName: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Montserrat_500Medium'
    },
    cityTemp: {
        color: '#FFF',
        fontSize: 25,
        fontFamily: 'Montserrat_700Bold'
    },
    cityImage: {
        width: 27,
        height: 24,
    }
})

export default Cities;