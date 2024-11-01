import * as path from 'path';
import * as fs from 'fs';

/**
 * uniapp版本控制器
 */
// 指定的版本
const newVersion = '3.0.0-4020920240930001';

// 读取package.json文件
const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// 更新dependencies版本
for (const [key, value] of Object.entries(packageJson.dependencies)) {
  if (key.startsWith('@dcloudio/') && key !== '@dcloudio/types' && key !== '@dcloudio/uni-ui') {
    packageJson.dependencies[key] = newVersion;
  }
}

// 更新devDependencies版本
for (const [key, value] of Object.entries(packageJson.devDependencies)) {
  if (key.startsWith('@dcloudio/') && key !== '@dcloudio/types' && key !== '@dcloudio/uni-ui') {
    packageJson.devDependencies[key] = newVersion;
  }
}

// 将修改后的内容写回package.json文件
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
