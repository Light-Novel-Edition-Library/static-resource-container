"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
/* 根路由 */
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const basicAuthGuard_1 = __importDefault(require("./middlewares/basicAuthGuard"));
const file_1 = require("./controllers/file");
exports.route = (0, express_1.default)();
exports.route.mkcol('/{*path}', basicAuthGuard_1.default, (0, express_async_handler_1.default)(file_1.makeDirController)); // 创建目录
exports.route.put('/{*path}', basicAuthGuard_1.default, (0, express_async_handler_1.default)(file_1.uploadFileController)); // 上传文件
exports.route.delete('/{*path}', basicAuthGuard_1.default, (0, express_async_handler_1.default)(file_1.deleteFileController)); // 删除文件
exports.route.use(express_1.default.static('public')); // 挂载静态资源
// 注册未命中控制器
const miss_1 = __importDefault(require("./controllers/miss"));
exports.route.use((0, express_async_handler_1.default)(miss_1.default));
exports.default = exports.route;
