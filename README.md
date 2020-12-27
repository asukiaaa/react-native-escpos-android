# react-native-escpos-android

A library to use escpos on android with using [ESCPOS-ThermalPrinter-Android](https://github.com/DantSu/ESCPOS-ThermalPrinter-Android).

## Installation

```sh
npm install react-native-escpos-android
```

## Usage

Write formatted text. The fromat is supplied by [ESCPOS-ThermalPrinter-Android](https://github.com/DantSu/ESCPOS-ThermalPrinter-Android#formatted-text--syntax-guide).
```js
import EscposAndroid from "react-native-escpos-android";

var text =
  "[C]================================\n" +
  "[L]\n" +
  "[L]<b>BEAUTIFUL SHIRT</b>[R]9.99e\n" +
  "[L]  + Size : S\n" +
  "[L]\n" +
  "[L]<b>AWESOME HAT</b>[R]24.99e\n" +
  "[L]  + Size : 57/58\n" +
  "[L]\n" +
  "[C]--------------------------------\n" +
  "[R]TOTAL PRICE :[R]34.98e\n" +
  "[R]TAX :[R]4.23e\n" +
  "[L]\n" +
  "[C]================================\n" +
  "[L]\n" +
  "[L]<font size='tall'>Customer :</font>\n" +
  "[L]Raymond DUPONT\n" +
  "[L]5 rue des girafes\n" +
  "[L]31547 PERPETES\n" +
  "[L]Tel : +33801201456\n" +
  "[L]\n" +
  "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
  "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>"
await EscposAndroid.write({ text , cut: true });
```

You can write raw data.
```js
let raw = [
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
await EscposAndroid.write({ raw });
```

## License

MIT
