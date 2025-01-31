class CardValidator {
  static validate(data) {
    const { englishWord, russianWord } = data;

    if (
      !englishWord ||
      typeof englishWord !== "string" ||
      englishWord.trim() === ""
    ) {
      return {
        isValid: false,
        error: "englishWord is required and must be a non-empty string.",
      };
    }

    if (
      !russianWord ||
      typeof russianWord !== "string" ||
      russianWord.trim() === ""
    ) {
      return {
        isValid: false,
        error: "russianWord is required and must be a non-empty string.",
      };
     }

    // if (!isLearned || typeof isLearned !== "boolean") {
    //   return {
    //     isValid: false,
    //     error: "isLearned is required and must be a non-empty boolean.",
    //   };
    // }

    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = CardValidator;
