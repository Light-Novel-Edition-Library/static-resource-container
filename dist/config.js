"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ini_1 = __importDefault(require("ini"));
exports.CONFIG = ini_1.default.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../config.ini'), 'utf-8'));
exports.default = exports.CONFIG;
