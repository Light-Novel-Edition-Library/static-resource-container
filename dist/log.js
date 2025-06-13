"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const config_1 = __importDefault(require("./config"));
exports.logger = winston_1.default.createLogger({
    defaultMeta: { label: 'static-resource-container' },
    level: config_1.default['LOG_LEVEL'], // 生产环境建议修改`config.ini`中的`LOG_LEVEL`为`warn`。
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.default.format.printf(function ({ timestamp, level, message, label }) {
        return `${timestamp} ${level.toUpperCase()} ${label}: ${message}`;
    })),
    transports: [
        new winston_1.default.transports.Console(), // 控制台输出
        // 也可以使用其他传输，例如将日志写入文件。
        // new transports.File({ filename: 'combined.log' })
    ],
});
exports.default = exports.logger;
