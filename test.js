const { Password } = require('./index.js');

const password = new Password("your-private-key");
password.setKeyboard({isContainDigits: "fds"}); // Password can contain all keyboard characters
password.generate({ passLength: 50 }); // Default password-length = 12
password.getPassword(); // => '?gj39?GdA_gkf'
console.log(password.getPassword());

const publicKey = password.getPublicKey(); // save into user storage
const passwordRecover = new Password("your-private-key", publicKey);
passwordRecover.setKeyboard();
passwordRecover.generate({ passLength: 50 });
passwordRecover.getPassword(); // => '?gj39?GdA_gkf'
console.log(passwordRecover.getPassword());