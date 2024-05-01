"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.get('/', user_controller_1.getAllUsers);
router.post('/', user_controller_1.createUser);
router.post('/login', user_controller_1.loginUser);
router.get('/:userId', user_controller_1.getUserById);
router.put('/:userId', user_controller_1.updateUserById);
module.exports = router;
