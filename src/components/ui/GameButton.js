import { View, Pressable, Image, StyleSheet } from 'react-native';

function GameButton(props) {    
    function onPressHandler() {
        props.buttonPress(props.item.soundsUrls);
    }

    return (
        <View>
            <Pressable style={[styles.apretable, props.item.estilos]} onPress={onPressHandler}>
                {props.item.imageUrl && <Image style={styles.image} source={props.item.imageUrl} />}
            </Pressable>
        </View>
    );
}

export default GameButton;

const styles = StyleSheet.create({
    apretable: {
        flexDirection: 'row',
        justifyContent:'center',
        borderWidth: 1,
    },
    image: {
        width: 85,
        height: 85,
        margin: 25,
    },
});