import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CityDetails = () => {
    const router = useRouter();
    const searchParams = useLocalSearchParams();
    const [cityDetails, setCityDetails] = useState(null)

    const handleData = async () => {
        try {
            const response = await fetch('https://climapp-api.vercel.app/api')
            const responseJSON = await response.json();

            const city = responseJSON.find(
                (cityData) => cityData.city === searchParams.cityName
            );

            setCityDetails(city);
        } catch (e) {
            console.log(e)
        }
    }

    const handleWeekday = (date) => {
        switch (date) {
            case "Seg":
                return "Segunda";
            case "Ter":
                return "Terça-feira";
            case "Qua":
                return "Quarta-feira";
            case "Qui":
                return "Quinta-feira";
            case "Sex":
                return "Sexta-feira";
            case "Sab":
                return "Sábado";
            case "Dom":
                return "Domingo";
        }
    };

    useEffect(() => {
        handleData()
    }, [])

    if (!cityDetails) {
        return (
            <LinearGradient colors={["#00457d", "#05051f"]} style={styles.container} />
        );
    }

    return (
        <LinearGradient
            colors={["#00457D", "#05051F"]}
            style={styles.container}
        >
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => { router.back() }} style={styles.headerIcon}>
                    <MaterialIcons
                        name="chevron-left"
                        size={24} color={'#FFF'}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{cityDetails.city}</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderTitle}>Hoje</Text>
                    <Text style={styles.cardHeaderTitle}>{cityDetails.date}</Text>
                </View>

                <View style={styles.cardBox}>
                    <Image style={styles.cardImage} source={require('../assets/images/Clouds.png')} />
                    <View>
                        <Text style={styles.cardTemperature}>{cityDetails.temp}º</Text>
                        <Text style={styles.cardDescription}>{cityDetails.description}</Text>
                    </View>
                </View>
                <View style={styles.rowBox}>
                    <View style={styles.row}>
                        <Image source={require('../assets/icons/Humidity1.png')} />
                        <Text style={styles.rowTitle}>Humidity:</Text>
                        <Text style={styles.rowValue}>{cityDetails.humidity}%</Text>
                    </View>

                    <View style={styles.row}>
                        <Image source={require('../assets/icons/Temperature1.png')} />
                        <Text style={styles.rowTitle}>Min/Max:</Text>
                        <Text style={styles.rowValue}>{cityDetails.forecast[0].min}/{cityDetails.forecast[0].max}º</Text>

                    </View>
                </View>
            </View>
                <View style={styles.footer}>
                    {cityDetails.forecast.slice(1, 4).map((item, index) => (
                        <View key={item.day} style={styles.footerCard}>
                            <View>
                                <Text style={styles.footerCardTitle}>
                                    {index === 0 ? "Amanhã" : handleWeekday(item.weekday)}
                                </Text>
                                <Text style={styles.footerCardSubTitle}>{item.date}</Text>
                            </View>
                            <Image
                                source={require("../assets/images/Clouds.png")}
                                style={styles.footerCardImage}
                            />

                            <Text style={styles.footerCardTemperature}>
                                {item.min}/{item.max}º
                            </Text>
                        </View>
                    ))}
                </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 40,
        gap: 40,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    headerIcon: {
        position: 'absolute',
        left: 0,
        zIndex: 10,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'Montserrat_600SemiBold',
        textAlign: 'center'
    },
    card: {
        width: '100%',
        borderRadius: 24,
        backgroundColor: "#4463D5",
        padding: 16,
        gap: 24,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    cardHeaderTitle: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
    },
    cardImage: {
        width: 72,
        height: 64,
    },
    cardTemperature: {
        color: '#FFF',
        fontSize: 43,
        fontFamily: 'Montserrat_700Bold',
        textAlign: 'center',
    },
    cardDescription: {
        color: '#FFF',
        fontSize: 13,
        fontFamily: 'Montserrat_400Regular',
        textAlign: 'center',
    },
    cardBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    rowTitle: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
    },
    rowValue: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        marginLeft: 'auto',
    },
    rowBox: {
        gap: 8,
    },
    footer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 8,
    },
    footerCard: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 8,
        alignItems: "center",
        gap: 16,
        flex: 1,
    },
    footerCardTitle: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        fontFamily: "Montserrat_500Medium",
    },
    footerCardSubTitle: {
        fontSize: 13,
        color: "#fff",
        textAlign: "center",
        fontFamily: "Montserrat_500Medium",
    },
    footerCardTemperature: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
        fontFamily: "Montserrat_600SemiBold",
    },
    footerCardImage: {
        width: 26,
        height: 26,
    },
})

export default CityDetails;