"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const models_1 = require("../models");
class User {
    static async findAll() {
        return await this.model.find();
    }
    static async search(search) {
        if (!search) {
            return await this.findAll();
        }
        return await this.model.find({
            $text: {
                $search: search,
                $caseSensitive: false,
            },
        });
    }
}
exports.User = User;
User.model = models_1.User;
