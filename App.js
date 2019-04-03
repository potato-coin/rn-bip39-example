/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { getLanguages, generate, entropy, lang } from 'react-native-rn-bip39';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  
  constructor(props) {
    super(props)
    this.state = {}
  }
  async componentDidMount() {
    const langs = await getLanguages();
    const lang = langs[0];
    const a = Date.now();
    const mnemonic = await generate(lang.zhs, entropy.BIP39_ENTROPY_LEN_128);
    const time = Number(Date.now() - a);
    console.log(time);
    mnemonic.time = time;
    console.log(mnemonic);
    this.setState({...mnemonic })
  }
  render() {
    const { mnemonic } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>{this.state.mnemonic}</Text>
        <Text style={styles.instructions}>{this.state.seedhex}</Text>
        <Text style={styles.instructions}>{this.state.time}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
