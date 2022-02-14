# keys-to-password

### Generate and recover passwords via private and public keys.

</br>

## Features
* Use of the private and public key concept to secure password recovery only by the private key owner.
* Generate passwords with unlimited length.
* Randomly generate passwords.
* Password can be modified easily in advance (see examples below).
* Option for using patterns (see more details below).

</br>

## Browser Support

<img src="https://i.ibb.co/6rk85xy/Chrome.png" alt="Chrome" width="48" height="48"> | <img src="https://i.ibb.co/F7xMNnF/Firefox.png" alt="Firefox" width="48" height="48"> | <img src="https://i.ibb.co/yF2VTZn/Safari.png" alt="Safari" width="48" height="48"> | <img src="https://i.ibb.co/0YXJfry/Opera.png" alt="Opera" width="48" height="48"> | <img src="https://i.ibb.co/Y02pTm1/Edge.png" alt="Edge" width="48" height="48"> |
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

</br>

## Installation

[<img src="https://i.ibb.co/LPfBxgW/NPM.png" alt="NPM" width="100">](https://www.npmjs.com/package/keys-to-password)

```js
npm i keys-to-password
```

[<img src="https://i.ibb.co/ZKNx1W9/Yarn.png" alt="Yarn" width="100">](https://yarnpkg.com/package/keys-to-password)

```js
yarn add keys-to-password
```
</br>

## import

CommonJS
```js
const { Password } = require("keys-to-password");
```

ES6
```js
import { Password } from "keys-to-password";
```

</br>

## Default usage

```js
const password = new Password("your-private-key");
password.setKeyboard(); // Password can contain all keyboard characters
password.generate(); // Default password-length = 12
password.getPassword(); // => '?gj39?GdA_gkf'

const publicKey = password.getPublicKey(); // save into user storage
const passwordRecover = new Password("your-private-key", publicKey);
passwordRecover.setKeyboard();
passwordRecover.generate();
passwordRecover.getPassword(); // => '?gj39?GdA_gkf'
```

</br>

## Visual Demonstration Of The Package Concept

<img src="https://i.ibb.co/jzy0FQD/workflow.png" alt="workflow">

</br>

## Generic example

### 1) Generate password

```js
const password = new Password("your-private-key");
password.setKeyboard();
password.generate({ passLength: 20 });
password.getPassword(); // => 'QS'-Z+8Z,:^1c%56`6h7'
```

### 2) Get password's public-key from the generated password

```js
const publicKey = password.getPublicKey();
```

### 3) Recover password by the private and public keys

```js
const passwordRecover = new Password("your-private-key", publicKey);
passwordRecover.setKeyboard();
passwordRecover.generate({ passLength: 20 });
```

### 4) Retrieve the password

```js
passwordRecover.getPassword(); // => 'QS'-Z+8Z,:^1c%56`6h7'
```

</br>

## Modify password using arguments

### 1) Modify keyboard
```js
const password = new Password('your-private-key');
// The keyboard holds the characters from which you can generate passwords
const keyboardConfig = {
    avoidChars: "1a$",  // Characters 1,a,$ will not be in the generated password
    isContainDigits: true,
    isContainUpperCase: false, // Uppercase letters will not be in the generated password
    isContainLowerCase: true,
    isContainSymbols: true,
    mustContainChars: "d3", // Assign d,3 characters to the keyboard
}

password.setKeyboard(keyboardConfig);
```

### 2) Extra generation options
```js
const generateConfig = {
  passLength: 20,
  passStartsWith: "abc", // Generated password will start with the string 'abc'
  passEndsWidth: "xyz" // Generated password will end with the string 'abc'
}

password.generate(generateConfig);
```

### 3) Retrieve the password

```js
password.getPassword(); // => 'abc3s:#dfs$2kl~d3xyz'
```

### 4) To recover your password keep your config objects as well as your public-key stored

```js
const publicKey = password.getPublicKey();
```

### 5) Recover the password

```js
const passwordRecover = new Password("your-private-key", publicKey);
passwordRecover.setKeyboard(keyboardConfig);
passwordRecover.generate(generateConfig);
passwordRecover.getPassword(); // => 'abc3s:#dfs$2kl~d3xyz'
```

</br>

## Modify password using pattern function only

```js
const password = new Password("your-private-key");
password.generateFromPattern("A_\\d{10}-PASS");
password.getPassword(); // => 'A_2563495820-PASS'
```

- To recover your password keep your pattern string as well as your public-key stored.

### Pattern's syntax options:

- All keyboard characters.
- \\d{n}  =>  assigns n digits to the password.
- \\u{n}  =>  assigns n uppercase letters to the password.
- \\l{n}  =>  assigns n lowercase letters to the password.
- \\s{n}  =>  assigns n symbol characters to the password.