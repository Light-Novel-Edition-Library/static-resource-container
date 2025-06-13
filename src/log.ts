import winston from 'winston';

import CONFIG from './config';

export var logger = winston.createLogger({
    defaultMeta: {label: 'static-resource-container'},
    level: CONFIG['LOG_LEVEL'], // 生产环境建议修改`config.ini`中的`LOG_LEVEL`为`warn`。
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(function({timestamp, level, message, label}){ // 自定义输出格式
            return `${timestamp} ${level.toUpperCase()} ${label}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // 控制台输出
        // 也可以使用其他传输，例如将日志写入文件。
        // new transports.File({ filename: 'combined.log' })
    ],
});

export default logger;