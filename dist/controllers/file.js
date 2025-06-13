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
exports.makeDirController = makeDirController;
exports.uploadFileController = uploadFileController;
exports.deleteFileController = deleteFileController;
/* 本地文件控制器 */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const promises_1 = require("stream/promises");
const log_1 = __importDefault(require("../log"));
const extend_1 = require("../extend");
function makeDirController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let dirpath = path_1.default.join('public', req.path);
        try {
            if (fs_1.default.existsSync(dirpath)) {
                res.status(409).json({ status: 'ALREADY_EXIST' });
                return;
            }
            // 确保目录存在。此处即使目录已经存在，创建时也不会报错。
            fs_1.default.mkdirSync(dirpath, { recursive: true });
            res.status(201).json({ status: 'OK' });
        }
        catch (error) {
            log_1.default.warn(`Directory creation failed: ${error}`);
            res.status(500).json({ status: 'MKDIR_FAILED' });
        }
    });
}
function uploadFileController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let filepath = path_1.default.join('public', req.path);
        let dest = fs_1.default.createWriteStream(filepath, { flags: 'w' });
        try {
            yield (0, promises_1.pipeline)(req, dest);
            res.status(200).json({ status: 'OK' });
        }
        catch (error) {
            log_1.default.warn(`File upload failed: ${error}`);
            res.status(500).json({ status: 'UPLOAD_FAILED' });
        }
        finally {
            dest.close();
        }
    });
}
// 处理文件删除
function deleteFileController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let filepath = path_1.default.join('public', req.path);
        // 防止删除根目录
        if (req.path === '/') {
            res.status(403).json({ status: 'FORBIDDEN' });
            return;
        }
        try {
            let stats = fs_1.default.statSync(filepath);
            if (stats.isDirectory()) {
                (0, extend_1.rmdirRecursive)(filepath);
            }
            else {
                fs_1.default.unlinkSync(filepath);
            }
            res.json({ status: 'OK' });
        }
        catch (error) {
            log_1.default.warn(`File deletion failed: ${error}`);
            res.status(500).json({ status: 'DELETE_FAILED' });
        }
    });
}
