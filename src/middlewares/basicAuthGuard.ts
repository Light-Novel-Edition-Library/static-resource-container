/* 简单身份验证守卫中间件 */
import { Request, Response, NextFunction } from "express";

import CONFIG from "../config";

export async function basicAuthGuardMiddleware(req: Request, res: Response, next: NextFunction) {
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

    if (username === CONFIG['USERNAME'] && password === CONFIG['PASSWORD']) {
        next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.status(401).json({ status: 'UNAUTHORIZED' });
    }
}

export default basicAuthGuardMiddleware;