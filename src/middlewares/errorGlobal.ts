/* 全局错误处理中间件（注册项目入口） */
import { Request, Response, NextFunction } from "express"; // 导入请求、响应和下一个中间件的类型

import logger from "../log";

export async function errorGlobalMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    if(err instanceof SyntaxError){
        res.status(400).json({status: 'BAD_REQUEST'});
    }else{
        logger.warn(err.stack); // 输出错误日志
        res.status(500).json({status: 'INTERNAL_ERROR'});
    }
}

export default errorGlobalMiddleware; // 导出中间件