const bcrypt = require("bcrypt");
const UserService = require("../services//User.service");
const formatResponse = require("../utils/formatResponse");
const UserValidator = require("../utils/User.validator");
const cookiesConfig = require("../config/cookiesConfig");
const generateTokens = require("../utils/generateTokens");

class UserController {
  static async refreshTokens(req, res) {
    try {
      const { user } = res.locals;

      const { accessToken, refreshToken } = generateTokens({ user });

      res.status(200).cookie("refreshToken", refreshToken, cookiesConfig).json(
        formatResponse(200, "Successfully generated new tokens", {
          user,
          accessToken,
        })
      );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async signUp(req, res) {
    const { email, username, password } = req.body;
    console.log(11111, req.body);
    const { isValid, error } = UserValidator.validateSignUp({
      email,
      username,
      password,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    const normalizedEmail = email.toLowerCase();

    try {
      const userFound = await UserService.getByEmail(normalizedEmail);

      if (userFound) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "A user with this email already exists",
              null,
              "A user with this email already exists"
            )
          );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserService.create({
        email: normalizedEmail,
        username,
        password: hashedPassword,
      });

      const plainUser = newUser.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });
      res
        .status(201)
        .cookie("refreshToken", refreshToken, cookiesConfig)
        .json(
          formatResponse(201, "Login successful", {
            user: plainUser,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;

    const { isValid, error } = UserValidator.validateSignIn({
      email,
      password,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    const normalizedEmail = email.toLowerCase();

    try {
      const user = await UserService.getByEmail(normalizedEmail);

      if (!user) {
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              "User with this email not found",
              null,
              "User with this email not found"
            )
          );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json(
            formatResponse(401, "Invalid password.", null, "Invalid password.")
          );
      }

      const plainUser = user.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });
      res
        .status(200)
        .cookie("refreshToken", refreshToken, cookiesConfig)
        .json(
          formatResponse(200, "Login successful", {
            user: plainUser,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async signOut(req, res) {
    console.log(req.cookies);
    try {
      res
        .clearCookie("refreshToken")
        .json(formatResponse(200, "Logout successful"));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = UserController;
