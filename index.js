"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mineflayer_1 = __importDefault(require("mineflayer"));
const bot = mineflayer_1.default.createBot({
    host: 'SMEDcccccccc.aternos.me',
    port: 63403,
    username: 'test',
});
bot.once('spawn', () => {
    bot.chat("Sniper bot joined !");
});
