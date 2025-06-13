"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* 项目入口 */
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const log_1 = __importDefault(require("./log"));
const route_1 = __importDefault(require("./route"));
const errorGlobal_1 = __importDefault(require("./middlewares/errorGlobal"));
var app = (0, express_1.default)();
app.set('view engine', 'ejs'); // 设置视图模板引擎
app.use(route_1.default); // 注册根路由
app.use(errorGlobal_1.default); // 注册全局错误处理中间件：必须放在最后一个注册，并且放在顶层以确保覆盖所有路由。
app.listen(Number(config_1.default['PORT']));
log_1.default.info('HTTP server started.');
// 不要显式指定退出逻辑，因为会意外输出退出日志但实际上没有退出，或者在毫无预兆和日志输出的情况下自动退出，原因不明。
