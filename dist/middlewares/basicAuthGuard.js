"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuthGuardMiddleware = basicAuthGuardMiddleware;
const config_1 = __importDefault(require("../config"));
function basicAuthGuardMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // 获取Authorization头
        let authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            // 设置 WWW-Authenticate 标头以触发浏览器的登录对话框
            // 如果客户端是浏览器，会显示用户名密码输入框
            res.setHeader('WWW-Authenticate', 'Basic');
            res.status(401).json({ status: 'UNAUTHORIZED' });
            return;
        }
        // 解码并验证
        let base64Credentials = authHeader.split(' ')[1];
        let credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        let [username, password] = credentials.split(':');
        if (username === config_1.default['USERNAME'] && password === config_1.default['PASSWORD']) {
            next();
        }
        else {
            res.setHeader('WWW-Authenticate', 'Basic');
            res.status(401).json({ status: 'UNAUTHORIZED' });
        }
    });
}
exports.default = basicAuthGuardMiddleware;
