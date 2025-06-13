/* 未命中控制器 */
import { Request, Response } from "express"; // 导入请求、响应的类型

export async function missController(req: Request, res: Response) {
    res.status(404).json({status: 'NOT_FOUND'});
}

export default missController;