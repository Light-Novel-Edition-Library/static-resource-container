# static-resource-container 静态资源容器

此文档部分由语言模型生成，未经完全仔细校对，可能有细节错误。

## 項目簡介
static-resource-container 是一個基於 TypeScript 和 Express.js 開發的 Web 應用，提供靜態文件的上傳、下載和刪除功能。通過簡單的身份驗證保護 PUT 和 DELETE 操作，確保文件管理的安全性。

## 關鍵特性
- 靜態文件服務：使用 express.static 將 public 目錄掛載為根目錄。
- 異步處理：所有控制器和中間件都使用。 express-async-handler 包裝，自動處理異步錯誤。
- 身份驗證：PUT 和 DELETE 操作需要 Basic Auth 驗證。
- 目錄創建：PUT 操作會自動創建不存在的目錄。
- 文件刪除：DELETE 操作刪除文件。
- 錯誤處理：全局錯誤處理中間件捕獲所有未處理的錯誤。

## 目錄結構

```
static-resource-container/
├── package.json                    # 項目配置和依賴管理
├── tsconfig.json                   # TypeScript 編譯配置
├── src/                           # 源代碼目錄
│   ├── index.ts                   # 應用程序入口點
│   ├── controllers/               # 控制器目錄
│   └── middlewares/                # 中間件目錄
├── public/                        # 靜態文件根目錄
│   └── (用戶上傳和訪問的文件)
├── dist/                          # TypeScript 編譯輸出目錄
│   └── (編譯後的 JavaScript 文件)
└── node_modules/                  # 依賴包目錄
```

## 使用說明
- GET 方法：訪問 public 目錄下的靜態文件。
- PUT 方法：上傳文件，需通過簡單身份驗證，支持自動創建目錄。
- DELETE 方法：刪除文件，需通過簡單身份驗證。
- MKCOL 方法

## 更新记录

### 1.0.1 Preview 20250614

1. 修复了路径字符未经反转义的缺陷。
2. 修复了文件控制器的路径遍历漏洞。

### 1.0.0 Preview 20250613

- 实现了第一个版本。