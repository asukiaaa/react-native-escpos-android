import * as React from 'react';
import { StyleSheet, View, Button, ScrollView } from 'react-native';
import EscposAndroid from 'react-native-escpos-android';
export default function App() {
    return (React.createElement(View, { style: styles.container },
        React.createElement(ScrollView, null,
            React.createElement(Button, { title: "permit", onPress: async () => {
                    const permitted = await EscposAndroid.requestPermission();
                    console.log({ permitted });
                } }),
            React.createElement(Button, { title: "text", onPress: async () => {
                    const result = await EscposAndroid.write({
                        text: "[C]================================\n" +
                            "[L]\n" +
                            "[L]<font size='tall'>Customer :</font>\n" +
                            "[L]Raymond DUPONT\n" +
                            "[L]5 rue des girafes\n" +
                            "[L]31547 PERPETES\n" +
                            "[L]Tel : +33801201456\n" +
                            "[L]"
                    });
                    console.log({ result });
                } }),
            React.createElement(Button, { title: "cut", onPress: async () => {
                    const result = await EscposAndroid.write({ cut: true });
                    console.log({ result });
                } }),
            React.createElement(Button, { title: "write and cut", onPress: async () => {
                    const result = await EscposAndroid.write({ text: "[C]\n[L]sample text", cut: true });
                    console.log({ result });
                } }),
            React.createElement(Button, { title: "raw", onPress: async () => {
                    const result = await EscposAndroid.write({ raw: [
                            0x1b, 0x40,
                            0x1D, 0x56, 0x01,
                        ] });
                    console.log({ result });
                } }),
            React.createElement(Button, { title: "raw text", onPress: async () => {
                    const result = await EscposAndroid.write({ raw: [
                            0x1b, 0x40,
                            0x41, 0x42, 0x43,
                            0x1b, 0x64, 0x03,
                            0x1D, 0x56, 0x01,
                        ] });
                    console.log({ result });
                } }),
            React.createElement(Button, { title: "raw kanji", onPress: async () => {
                    const raw = [
                        0x1b, 0x40,
                        0x0a,
                        0x0a,
                        0x0a,
                        0x1c, 0x43, 0x01,
                        0x1b, 0x64, 0x02,
                        0x0a,
                        // 0x1b, 0x1c, 0x26, // kanji mode
                        0x82, 0xA0, 0x82, 0xA2, 0x82, 0xA4,
                        0x0a,
                        0x8a, 0xbf, 0x8e, 0x9a,
                        0x0a,
                        0x1b, 0x64, 0x02,
                        0x1D, 0x56, 0x01,
                    ];
                    const result = await EscposAndroid.write({ raw });
                    console.log({ result });
                } }))));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    boutton: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
});
