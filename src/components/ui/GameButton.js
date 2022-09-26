import { View, Pressable, Image, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';

function GameButton({ buttonPress, item}) {
    function onPressHandler() {
        buttonPress(item.soundsUrls);
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [styles.apretable, pressed && styles.pressed]}
                onPress={onPressHandler}
            >
                <View style={[styles.imageContainer, item.estilos]}>
                    {item.imageUrl && <Image style={styles.image} source={item.imageUrl} />}
                </View>
            </Pressable>
        </View>
    );
}

export default GameButton;

const styles = StyleSheet.create({
    apretable: {
        borderWidth: .5,
        flex: 1,
    },
    pressed: {
        opacity: 0.7,
    },
    image: {
        width: 85,
        height: 85,
    },
    container: {
        flex: 1
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
    }
});