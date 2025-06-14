/* 本地文件控制器 */
import fs from 'fs';
import path from "path";
import { pipeline } from 'stream/promises';
import { Request, Response } from "express"; // 导入请求、响应的类型

import logger from "../log";
import { rmdirRecursive } from '../extend';

export async function makeDirController(req: Request, res: Response) {
    let dirpath = path.join('public', path.normalize(decodeURI(req.path)));

    try {
        if (fs.existsSync(dirpath)) {
            res.status(409).json({ status: 'ALREADY_EXIST' });
            return;
        }
        // 确保目录存在。此处即使目录已经存在，创建时也不会报错。
        fs.mkdirSync(dirpath, { recursive: true });
        res.status(201).json({ status: 'OK' });
    } catch (error) {
        logger.warn(`Directory creation failed: ${error}`);
        res.status(500).json({status: 'MKDIR_FAILED'});
    }
}

export async function uploadFileController(req: Request, res: Response){
    let filepath = path.join('public', path.normalize(decodeURI(req.path)));
    let dest = fs.createWriteStream(filepath, { flags: 'w' });

    try {
        await pipeline(req, dest);
        res.status(200).json({status: 'OK'});
    } catch (error) {
        logger.warn(`File upload failed: ${error}`);
        res.status(500).json({status: 'UPLOAD_FAILED'});
    } finally {
        dest.close();
    }
}

// 处理文件删除
export async function deleteFileController(req: Request, res: Response) {
    let filepath = path.join('public', path.normalize(decodeURI(req.path)));

    // 防止删除根目录
    if (req.path === '/') {
        res.status(403).json({ status: 'FORBIDDEN' });
        return;
    }

    try {
        let stats = fs.statSync(filepath);
        
        if (stats.isDirectory()) {
            rmdirRecursive(filepath);
        } else {
            fs.unlinkSync(filepath);
        }
        
        res.json({ status: 'OK' });
    } catch (error) {
        logger.warn(`File deletion failed: ${error}`);
        res.status(500).json({status: 'DELETE_FAILED'});
    }
}

