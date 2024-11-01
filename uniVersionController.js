"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
// 指定的版本
var newVersion = '3.0.0-3090920231225001';
// 读取package.json文件
var packageJsonPath = path.resolve(__dirname, 'package.json');
var packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
// 更新dependencies版本
for (var _i = 0, _a = Object.entries(packageJson.dependencies); _i < _a.length; _i++) {
    var _b = _a[_i], key = _b[0], value = _b[1];
    if (key.startsWith('@dcloudio/') && key !== '@dcloudio/types') {
        packageJson.dependencies[key] = newVersion;
    }
}
// 更新devDependencies版本
for (var _c = 0, _d = Object.entries(packageJson.devDependencies); _c < _d.length; _c++) {
    var _e = _d[_c], key = _e[0], value = _e[1];
    if (key.startsWith('@dcloudio/') && key !== '@dcloudio/types') {
        packageJson.devDependencies[key] = newVersion;
    }
}
// 将修改后的内容写回package.json文件
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
