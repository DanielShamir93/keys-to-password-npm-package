const hash = require("object-hash");

class Password {
  constructor(privateKey = "", publicKey = hash(Math.random())) {
    this.hashedPrivateKey = hash(privateKey);
    this.publicKey = publicKey;
    this.password = "";
    this.keyboard = [];
  }

  setKeyboard = ({
    avoidChars = "",
    isContainDigits = true,
    isContainUpperCase = true,
    isContainLowerCase = true,
    isContainSymbols = true,
    mustContainChars = "",
  } = {}) => {
    this.validateKeyboard({
      avoidChars,
      isContainDigits,
      isContainUpperCase,
      isContainLowerCase,
      isContainSymbols,
      mustContainChars,
    });

    const symbols = "!\\#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    
    for (let i = 33; i < 127; i++) {
      let char = String.fromCharCode(i);

      if (/[0-9]/.test(char) && !avoidChars.includes(char) && isContainDigits) {
        this.keyboard.push(char);
      } else if (
        /[A-Z]/.test(char) &&
        !avoidChars.includes(char) &&
        isContainUpperCase
      ) {
        this.keyboard.push(char);
      } else if (
        /[a-z]/.test(char) &&
        !avoidChars.includes(char) &&
        isContainLowerCase
      ) {
        this.keyboard.push(char);
      } else if (
        symbols.includes(char) &&
        !avoidChars.includes(char) &&
        isContainSymbols
      ) {
        this.keyboard.push(char);
      }
    }

    // Add specific characters to keyboard
    Array.from(mustContainChars).forEach((char) => {
      if (!this.keyboard.includes(char)) {
        this.keyboard.push(char);
      }
    });
  };

  validateKeyboard = ({
    avoidChars,
    isContainDigits,
    isContainUpperCase,
    isContainLowerCase,
    isContainSymbols,
    mustContainChars,
  }) => {
    if (typeof avoidChars !== 'string') {
      throw new Error("avoidChars parameter must be of type string");
    } else if (typeof isContainDigits !== 'boolean') {
      throw new Error("avoidChars parameter must be of type boolean");
    } else if (typeof isContainUpperCase !== 'boolean') {
      throw new Error("avoidChars parameter must be of type boolean");
    } else if (typeof isContainLowerCase !== 'boolean') {
      throw new Error("avoidChars parameter must be of type boolean");
    } else if (typeof isContainSymbols !== 'boolean') {
      throw new Error("avoidChars parameter must be of type boolean");
    } else if (typeof mustContainChars !== 'string') {
      throw new Error("mustContainChars parameter must be of type string");
    }
  }

  generate = ({passLength = 12, passStartsWith = "", passEndsWidth = ""} = {}) => {
    if (this.keyboard.length > 0) {
      const passwordLength = passLength - (passStartsWith.length + passEndsWidth.length);

      this.password += passStartsWith;
      this.setPasswordByFormula(passwordLength);
      this.password += passEndsWidth;
    }
  };

  generateFromPattern = (pattern = "") => {

    if (typeof pattern !== 'string') {
      throw new Error("pattern parameter must be of type string");
    }

    const matchesArray = this.breakPatternToArray(pattern);

    matchesArray.forEach((match) => {
      let modifier = "";
      let modifierAmount = 0;
      if ((modifier = /\\d{\d+}$/.exec(match)) !== null) {
        // Match a number modifier
        this.password += /.*(?=\\d)/.exec(match).join("");
        modifierAmount = modifier[0].replace(/[^\d]/g, "");
        this.keyboard = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        this.setPasswordByFormula(modifierAmount);
      } else if ((modifier = /\u{\d+}$/.exec(match)) !== null) {
        // Match a uppercase modifier
        this.password += /.*(?=\\u)/.exec(match).join("");
        modifierAmount = modifier[0].replace(/[^\d]/g, "");
        this.keyboard = [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ];
        this.setPasswordByFormula(modifierAmount);
      } else if ((modifier = /\\l{\d+}$/.exec(match)) !== null) {
        // Match a lowercase modifier
        this.password += /.*(?=\\l)/.exec(match).join("");
        modifierAmount = modifier[0].replace(/[^\d]/g, "");
        this.keyboard = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
        ];
        this.setPasswordByFormula(modifierAmount);
      } else if ((modifier = /\\s{\d+}$/.exec(match)) !== null) {
        // Match symbols modifier
        this.password += /.*(?=\\s)/.exec(match).join("");
        modifierAmount = modifier[0].replace(/[^\d]/g, "");
        this.keyboard = [
          "!",
          "\\",
          "#",
          "$",
          "%",
          "&",
          "'",
          "(",
          ")",
          "*",
          "+",
          ",",
          "-",
          ".",
          "/",
          ":",
          ";",
          "<",
          "=",
          ">",
          "?",
          "@",
          "[",
          "]",
          "^",
          "_",
          "`",
          "{",
          "|",
          "}",
          "~",
          '"',
        ];
        this.setPasswordByFormula(modifierAmount);
      } else {
        // The last match
        this.password += match;
      }
    });
  };

  setPasswordByFormula = (passLength = 12) => {
    
    let hashedCombineKeys = "";
    for (let i = 0; i < Math.ceil(passLength / 40); i++) {
      hashedCombineKeys += hash({
        privateKey: this.hashedPrivateKey,
        publicKey: this.publicKey,
        i
      });
    }

    const hashedCombinedKeysSum = Array.from(hashedCombineKeys).reduce(
      (prevVal, currVal) => {
        return prevVal + currVal.charCodeAt(0);
      }, 
    0);

    for (let i = 0; i < Math.min(hashedCombineKeys.length, passLength); i++) {
      let keyBoardIndex = (i + hashedCombineKeys[i].charCodeAt(0) + hashedCombinedKeysSum) % this.keyboard.length;
      this.password += this.keyboard[keyBoardIndex];
    }
  };

  breakPatternToArray = (pattern = "") => {
    const matchesArray = [];
    let str = "";
    let sequence = "";
    const isModifier = (sequence) =>
      /\\[duls]{\d+}/.test(sequence) ? true : false;

    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === "\\") {
        // modifier potential
        sequence += "\\";
        for (i = i + 1; i < pattern.length; i++) {
          if (pattern[i] === "}") {
            sequence += pattern[i];
            if (isModifier(sequence)) {
              matchesArray.push(str + sequence);
              str = "";
              sequence = "";
              break;
            }
          } else {
            sequence += pattern[i];
          }
        }
        str += sequence;
        continue;
      }
      str += pattern[i];
    }

    if (str.length > 0) {
      matchesArray.push(str);
    }

    return matchesArray;
  };

  getPassword = () => {
    return this.password;
  };

  getPublicKey = () => {
    return this.publicKey;
  }
}

module.exports = { Password };