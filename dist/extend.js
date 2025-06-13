"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rmdirRecursive = rmdirRecursive;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// 递归删除目录及其内容
function rmdirRecursive(dirPath) {
    let files = fs_1.default.readdirSync(dirPath);
    for (let file of files) {
        let curPath = path_1.default.join(dirPath, file);
        if (fs_1.default.statSync(curPath).isDirectory()) {
            rmdirRecursive(curPath);
        }
        else {
            fs_1.default.unlinkSync(curPath);
        }
    }
    fs_1.default.rmdirSync(dirPath);
}
