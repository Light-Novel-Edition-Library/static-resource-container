/* 项目入口 */
import express from 'express';

import CONFIG from './config';
import logger from './log';
import route from './route';
import errorGlobalMiddleware from "./middlewares/errorGlobal";

var app = express();
app.set('view engine', 'ejs'); // 设置视图模板引擎
app.use(route); // 注册根路由
app.use(errorGlobalMiddleware); // 注册全局错误处理中间件：必须放在最后一个注册，并且放在顶层以确保覆盖所有路由。
app.listen(Number(CONFIG['PORT']));
logger.info('HTTP server started.');

// 不要显式指定退出逻辑，因为会意外输出退出日志但实际上没有退出，或者在毫无预兆和日志输出的情况下自动退出，原因不明。