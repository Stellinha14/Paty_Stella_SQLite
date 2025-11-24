import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#414141',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 20,
        textAlign: 'center',
    },
    p: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#FFD700',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        color: '#fff',
        fontSize: 15,
        width: '100%'
    },
    button: {
        backgroundColor: '#014991',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFD700',
        marginBottom: 20,
        width: '100%'
    },
    buttonImg: {
        width: '50%',
        backgroundColor: '#014991',
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFD700',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    buttonTextImg: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
    },
    form: {
        alignItems: 'center',
        width: '100%',
        padding: 15,
        //backgroundColor:'#e5fec5',
        paddingBottom: 25,
        marginTop: 50,
        borderRadius: 5
    },
    hr: {
        height: 1,
        backgroundColor: '#ddd',
        width: '100%',
        marginVertical: 15
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 5,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#FFD700',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#1e1e1e',
        padding: 10,
        marginVertical: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FFD700',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        width: 350,
        alignSelf: 'center',
    },
    cardImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 15,
    },
    cardInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    cardName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFD700',
    },
    cardDetail: {
        fontSize: 16,
        color: '#fff',
        marginTop: 2,
    },
});

export default styles;