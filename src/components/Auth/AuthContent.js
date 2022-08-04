import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AuthForm from './AuthForm';
import { Colors } from '../../constants/styles';

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false
  });

  function submitHandler(credentials) {
    let { email, password } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length >= 6;

    if ( !emailIsValid || !passwordIsValid ) {
      navigation.navigate({
        name: 'Modal',
        params: { mensajeError: 'Error: Datos inválidos.'}
      });
      
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid
      });

      return;
    }

    onAuthenticate({ email, password });
  }

  return (
    <>
      <View style={styles.authContent}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
      </View>
    </>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    flex: 1,
      backgroundColor: Colors.primary800,
      justifyContent: 'center',
      padding: 50
    
  },
  buttons: {
    marginTop: 8,
  },
});
