## 配置

```shell
1.安装pnpm
npm install -g pnpm

2.安装依赖
pnpm install

3.项目打包
pnpm build:mp-xxx

4.项目打包后将dist/build目录下的文件复制到dist/dev目录下

5.项目运行
pnpm dev:mp-xxx
```

---

## 更新uniapp版本

```shell
1. cd 至项目根目录

2. 运行编译ts命令
tsc .\uniVersionController.ts

3.直接运行编译后的js文件
```

---

## tips:

1. ***更新时更改/src目录下的manifest.json中的versionName和versionCode***
2. @dcloudio/types版本需单独更新
3. font-weight不生效，小于等于345为thin，大于等于550为bold