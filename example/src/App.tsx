import * as React from 'react';

import { StyleSheet, View, Button, ScrollView } from 'react-native';
import EscposAndroid from 'react-native-escpos-android';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Button title="permit" onPress={async () => {
          const permitted = await EscposAndroid.requestPermission()
          console.log({ permitted })
        }} />
        <Button title="text" onPress={async () => {
          const result = await EscposAndroid.write({
            text: "[C]================================\n" +
              "[L]\n" +
              "[L]<font size='tall'>Customer :</font>\n" +
              "[L]Raymond DUPONT\n" +
              "[L]5 rue des girafes\n" +
              "[L]31547 PERPETES\n" +
              "[L]Tel : +33801201456\n" +
              "[L]"
          })
          console.log({ result })
        }} />
        <Button title="cut" onPress={async () => {
          const result = await EscposAndroid.write({ cut: true })
          console.log({ result })
        }} />
        <Button title="write and cut" onPress={async () => {
          const result = await EscposAndroid.write({ text: "[C]\n[L]sample text", cut: true })
          console.log({ result })
        }} />
        <Button title="raw" onPress={async () => {
          const result = await EscposAndroid.write({ raw: [
            0x1b, 0x40, // initialize
            0x1D, 0x56, 0x01, // cut
          ] })
          console.log({ result })
        }} />
        <Button title="raw text" onPress={async () => {
          const result = await EscposAndroid.write({ raw: [
            0x1b, 0x40, // initialize
            0x41, 0x42, 0x43, // abc in ascii
            0x1b, 0x64, 0x03, // feed
            0x1D, 0x56, 0x01, // cut
          ] })
          console.log({ result })
        }} />
        <Button title="raw kanji" onPress={async () => {
          const raw = [
            0x1b, 0x40, // initialize
            0x0a, // change line
            0x0a, // change line
            0x0a, // change line
            0x1c, 0x43, 0x01, // set shift-jis
            0x1b, 0x64, 0x02, // feed
            0x0a, // change line
            // 0x1b, 0x1c, 0x26, // kanji mode
            0x82, 0xA0, 0x82, 0xA2, 0x82, 0xA4, // あいう in shift-jis
            0x0a, // change line
            0x8a, 0xbf, 0x8e, 0x9a,　// 漢字 in shift-jis
            0x0a, // change line
            0x1b, 0x64, 0x02, // feed
            0x1D, 0x56, 0x01, // cut
          ]
          const result = await EscposAndroid.write({ raw })
          console.log({ result })
        }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
