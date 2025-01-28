class TopicValidator {
  static validate(data) {
    const { name } = data;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return {
        isValid: false,
        error: "name is required and must be a non-empty string.",
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = TopicValidator;
