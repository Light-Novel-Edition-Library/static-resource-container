/* 根路由 */
import express from 'express';
import asyncHandler from 'express-async-handler';

import basicAuthGuardMiddleware from './middlewares/basicAuthGuard';
import { 
    makeDirController,
    uploadFileController, 
    deleteFileController,
} from './controllers/file';

export var route = express();


route.mkcol('/{*path}', basicAuthGuardMiddleware, asyncHandler(makeDirController)); // 创建目录
route.put('/{*path}', basicAuthGuardMiddleware, asyncHandler(uploadFileController)); // 上传文件
route.delete('/{*path}', basicAuthGuardMiddleware, asyncHandler(deleteFileController)); // 删除文件
route.use(express.static('public')); // 挂载静态资源


// 注册未命中控制器
import missController from './controllers/miss';
route.use(asyncHandler(missController));


export default route;