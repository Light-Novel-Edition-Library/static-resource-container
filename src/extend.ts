import fs from 'fs';
import path from "path";

// 递归删除目录及其内容
export function rmdirRecursive(dirPath: string) {
    let files = fs.readdirSync(dirPath);
    
    for (let file of files) {
        let curPath = path.join(dirPath, file);
        if (fs.statSync(curPath).isDirectory()) {
            rmdirRecursive(curPath);
        } else {
            fs.unlinkSync(curPath);
        }
    }
    fs.rmdirSync(dirPath);
}
