import fs from 'fs';
import path from 'path';
import ini from 'ini';

export const CONFIG = ini.parse(fs.readFileSync(path.join(__dirname, '../config.ini'), 'utf-8'));

export default CONFIG;