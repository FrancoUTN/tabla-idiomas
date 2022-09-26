import { ActivityIndicator, View } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import { useState, useEffect, useContext } from 'react';
import { Audio } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation'

import GameButton from '../components/ui/GameButton';
import { AuthContext } from '../store/auth-context';
import { Colors } from '../constants/styles';
import LoadingOverlay from '../components/ui/LoadingOverlay';


function GameScreen() {
	const authCtx = useContext(AuthContext);
	const [orientacion, setOrientacion] = useState();

	useEffect(
		() => {
			ScreenOrientation.getOrientationAsync().then(orientacion => {
				if (orientacion == ScreenOrientation.Orientation.LANDSCAPE_LEFT) {
					console.log("Izquierda")
					setOrientacion('izquierda');
				}
				else if (orientacion == ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
					console.log("Derecha")
					setOrientacion('derecha');
				}
				else {
					console.log("Vertical o UNKNOWN")
					setOrientacion('vertical');
				}
			});

			return ScreenOrientation.addOrientationChangeListener(
				objeto => {
					const orientacion = objeto.orientationInfo.orientation;
					if (orientacion == ScreenOrientation.Orientation.LANDSCAPE_LEFT) {
						console.log("Izquierda")
						setOrientacion('izquierda');
					}
					else if (orientacion == ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
						console.log("Derecha")
						setOrientacion('derecha');
					}
					else {
						console.log("Vertical o UNKNOWN")
						setOrientacion('vertical');
					}
				}
			).remove
		},
	[])

	const animales = [
		{
			id: 0,
			imageUrl: require('../../assets/animales/elefante.png'),
			soundsUrls: [
				require('../../assets/sonidos/es/elephant.mp3'),
				require('../../assets/sonidos/en/elephant.mp3'),
				require('../../assets/sonidos/pt/elephant.mp3'),
			]
		},
		{
			id: 1,
			imageUrl: require('../../assets/animales/leon.png'),
			soundsUrls: [
				require('../../assets/sonidos/es/lion.mp3'),
				require('../../assets/sonidos/en/lion.mp3'),
				require('../../assets/sonidos/pt/lion.mp3'),
			]
		},
		{
			id: 2,
			imageUrl: require('../../assets/animales/gato.png'),
			soundsUrls: [
				require('../../assets/sonidos/es/cat.mp3'),
				require('../../assets/sonidos/en/cat.mp3'),
				require('../../assets/sonidos/pt/cat.mp3'),
			]
		},
		{
			id: 3,
			imageUrl: require('../../assets/animales/oveja.png'),
			soundsUrls: [
				require('../../assets/sonidos/es/sheep.mp3'),
				require('../../assets/sonidos/en/sheep.mp3'),
				require('../../assets/sonidos/pt/sheep.mp3'),
			]
		},
		{
			id: 4,
			imageUrl: require('../../assets/animales/pez.png'),
			soundsUrls: [
				require('../../assets/sonidos/es/fish.mp3'),
				require('../../assets/sonidos/en/fish.mp3'),
				require('../../assets/sonidos/pt/fish.mp3'),
			]
		},
	]

	const numeros = [
		{
			id: 0,
			imageUrl: require('../../assets/numeros/1.png'),
			soundsUrls: [
				require('../../assets/sonidos/es/1.mp3'),
				require('../../assets/sonidos/en/1.mp3'),
				require('../../assets/sonidos/pt/1.mp3'),
			]
		},
		{
			id: 1,
			imageUrl: require('../../assets/numeros/2.png'),
			soundsUrls: [
				require('../../assets/sonidos/es/2.mp3'),
				require('../../assets/sonidos/en/2.mp3'),
				require('../../assets/sonidos/pt/2.mp3'),
			]
		},
		{
			id: 2,
			imageUrl: require('../../assets/numeros/3.png'),
			soundsUrls: [
				require('../../assets/sonidos/es/3.mp3'),
				require('../../assets/sonidos/en/3.mp3'),
				require('../../assets/sonidos/pt/3.mp3'),
			]
		},
		{
			id: 3,
			imageUrl: require('../../assets/numeros/4.png'),
			soundsUrls: [
				require('../../assets/sonidos/es/4.mp3'),
				require('../../assets/sonidos/en/4.mp3'),
				require('../../assets/sonidos/pt/4.mp3'),
			]
		},
		{
			id: 4,
			imageUrl: require('../../assets/numeros/5.png'),
			soundsUrls: [
				require('../../assets/sonidos/es/5.mp3'),
				require('../../assets/sonidos/en/5.mp3'),
				require('../../assets/sonidos/pt/5.mp3'),
			]
		},
	]

	const colores = [
		{
			id: 0,
			soundsUrls: [
				require('../../assets/sonidos/es/red.mp3'),
				require('../../assets/sonidos/en/red.mp3'),
				require('../../assets/sonidos/pt/red.mp3'),
			],
			estilos: {
				backgroundColor: 'red'
			}
		},
		{
			id: 1,
			soundsUrls: [
				require('../../assets/sonidos/es/yellow.mp3'),
				require('../../assets/sonidos/en/yellow.mp3'),
				require('../../assets/sonidos/pt/yellow.mp3'),
			],
			estilos: {
				backgroundColor: 'yellow'
			}
		},
		{
			id: 2,
			soundsUrls: [
				require('../../assets/sonidos/es/green.mp3'),
				require('../../assets/sonidos/en/green.mp3'),
				require('../../assets/sonidos/pt/green.mp3'),
			],
			estilos: {
				backgroundColor: 'green'
			}
		},
		{
			id: 3,
			soundsUrls: [
				require('../../assets/sonidos/es/blue.mp3'),
				require('../../assets/sonidos/en/blue.mp3'),
				require('../../assets/sonidos/pt/blue.mp3'),
			],
			estilos: {
				backgroundColor: 'blue'
			}
		},
		{
			id: 4,
			soundsUrls: [
				require('../../assets/sonidos/es/gray.mp3'),
				require('../../assets/sonidos/en/gray.mp3'),
				require('../../assets/sonidos/pt/gray.mp3'),
			],
			estilos: {
				backgroundColor: 'gray'
			}
		},
	];

	const temas = [
		{
			icon: require("../../assets/temas/colores.png"),
			name: "colores",
			position: 1,
			color: Colors.terciary,
		},
		{
		  icon: require("../../assets/temas/numeros.png"),
		  name: "numeros",
		  position: 2,
		  color: Colors.terciary,
		},
		{
		  icon: require("../../assets/temas/animales.png"),
		  name: "animales",
		  position: 3,
		  color: Colors.terciary,
		}
	];

	const idiomas = [
		{
			icon: require("../../assets/banderas/spain.png"),
			name: "español",
			position: 1,
			color: Colors.terciary,
		},
		{
		  icon: require("../../assets/banderas/uk.png"),
		  name: "ingles",
		  position: 2,
		  color: Colors.terciary,
		},
		{
		  icon: require("../../assets/banderas/portugal.png"),
		  name: "portugues",
		  position: 3,
		  color: Colors.terciary,
		}
	];

	const opciones = [
		{
			icon: require("../../assets/power-off.png"),
			name: "poweroff",
			position: 1,
			color: Colors.error500
		}
	]

	// Idioma
	const [idioma, setIdioma] = useState(0);
	const [iconoIdioma, setIconoIdioma] = useState(require("../../assets/banderas/españa.png"));

	function cambiarIdioma(lang) {
		switch(lang) {
			case "español":
				setIdioma(0);
				setIconoIdioma(require("../../assets/banderas/españa.png"));
				break;
			case "ingles":
				setIdioma(1);
				setIconoIdioma(require("../../assets/banderas/reino-unido.png"));
				break;
			case "portugues":
				setIdioma(2);
				setIconoIdioma(require("../../assets/banderas/portugal2.png"));
				break;
		}
	}

	// Tema
	const [items, setItems] = useState(animales);
	const [iconoTema, setIconoTema] = useState(temas[2].icon);

	function cambiarTema(categoria) {
		switch(categoria) {
			case "colores":
				setItems(colores);
				setIconoTema(temas[0].icon);
				break;
			case "numeros":
				setItems(numeros);
				setIconoTema(temas[1].icon);
				break;
			case "animales":
				setItems(animales);
				setIconoTema(temas[2].icon);
				break;
		}
	}

	// Sonidos
	const [sound, setSound] = useState();

	async function playSound(sonido) {
		// console.log('Loading Sound');
		const { sound } = await Audio.Sound.createAsync(
			sonido
		);
		setSound(sound);
		// console.log('Playing Sound');
		await sound.playAsync();
	}

	useEffect(() => {
		return sound
			? () => {
				// console.log('Unloading Sound');
				sound.unloadAsync(); }
			: undefined;
		}, [sound]);


	function buttonPressHandler(sUrls) {
		playSound(sUrls[idioma]);
	}

	if (orientacion == 'vertical') {
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 1}}>
					{items.map(item => <GameButton key={item.id} item={item} buttonPress={buttonPressHandler}/>)}
				</View>
				<FloatingAction
					// actions={opciones}
					onPressMain={authCtx.logout}
					floatingIcon={require("../../assets/power-off.png")}
					color='#eeeeee'
					position="left"
					// distanceToEdge={{vertical: 570, horizontal: 30}}
					distanceToEdge={{vertical: 260, horizontal: 30}} // ME RINDO.
					iconWidth={16}
				/>
				<FloatingAction
					actions={idiomas}
					onPressItem={name => cambiarIdioma(name)}
					floatingIcon={iconoIdioma}
					color='white'
					iconWidth={20}
					position="left"
				/>
				<FloatingAction
					actions={temas}
					onPressItem={name => cambiarTema(name)}
					floatingIcon={iconoTema}
					color='white'
				/>
			</View>
		);
	}
	else if (orientacion == 'derecha' || orientacion == 'izquierda') {
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 1, flexDirection: 'row'}}>
					{items.map(item => <GameButton key={item.id} item={item} buttonPress={buttonPressHandler}/>)}
				</View>
				<FloatingAction
					onPressMain={authCtx.logout}
					floatingIcon={require("../../assets/power-off.png")}
					color='#eeeeee'
					iconWidth={16}
					position="left"
					distanceToEdge={{vertical: 260, horizontal: 30}}
				/>
				<FloatingAction
					actions={idiomas}
					onPressItem={name => cambiarIdioma(name)}
					floatingIcon={iconoIdioma}
					color='white'
					iconWidth={20}
					position="left"
				/>
				<FloatingAction
					actions={temas}
					onPressItem={name => cambiarTema(name)}
					floatingIcon={iconoTema}
					color='white'
				/>
			</View>
		);
	}
	else {
		return (
			<View style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: Colors.secondary
			}}>
				<ActivityIndicator size='large' color='white' />
			</View>
		);
	}
}

export default GameScreen;