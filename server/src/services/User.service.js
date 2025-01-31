const {User} = require('../db/models')

class UserService {

    static async create(data) {
        return await User.create(data); 
      }

      static async getByEmail(email) {
        return await User.findOne({where: { email }}); 
      }
}

module.exports = UserService