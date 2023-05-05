"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const services_1 = require("../services");
const router = express_1.default.Router();
exports.userRouter = router;
router.get('/', (_req, res, next) => {
    services_1.User.findAll()
        .then((users) => res.json(users))
        .catch(next);
});
router.post('/search', (req, res, next) => {
    const { search = '' } = req.body;
    services_1.User.search(search)
        .then((users) => res.json(users))
        .catch(next);
});
