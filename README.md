# keys-to-password

Generate and recover passwords via private and public keys.

[<img src="1200px-Npm-logo.svg.png" width=100>](https://www.npmjs.com/package/keys-to-password)

## Installation

node:

```js
npm install keys-to-password
```

### A general example of generating and recovering a password 
```js
// Generate password
const password = new Password('your-private-key');
password.setKeyboard();
password.generate({passLength: 15});
password.getPassword(); // => 'y$$&TTU+-&ZZ1-0'

// Get password public-key from generated password
const publicKey = password.getPublicKey();

// Recover password from private and public keys
const passwordRecover = new Password('your-private-key', publicKey);
passwordRecover.setKeyboard();
passwordRecover.generate({passLength: 15});
passwordRecover.getPassword() // => 'y$$&TTU+-&ZZ1-0'
```

### Default

```js
const password = new Password('your-private-key');
password.setKeyboard(); // Password can contain all keyboard characters
password.generate(); // Password-length = 12
```

### Modify password using arguments

```js
const password = new Password('your-private-key');
const keyboardConfig = {
    avoidChars = "1a$",  // Characters 1,a,$ will not be in the generated password
    isContainDigits = true,
    isContainUpperCase = false, // Uppercase letters will not be in the generated password
    isContainLowerCase = true,
    isContainSymbols = true,
    mustContainChars = "d3", // Characters d,3 will be in the generated password (not yet implemented)
}
password.setKeyboard(keyboardConfig);

const generateConfig = {
  passLength = 20, 
  passStartsWith = "abc", // Generated password will start with the string 'abc'
  passEndsWidth = "xyz" // Generated password will end with the string 'abc'
}
password.generate(generateConfig);
```

### Modify password using pattern

```js
const password = new Password('your-private-key');
password.generateFromPattern('A\\d{10}-PASS'); // => 'A2563495820-PASS'
```

#### Pattern options:

- All keyboard characters.
- \\d{n} assign n digits.
- \\u{n} assign n uppercase letters.
- \\l{n} assign n lowercase letters.
- \\s{n} assign n symbol characters.

#### Note:
- mustContainChars argument in the keyboard config not yet implemented.