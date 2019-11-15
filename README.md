# Restaurant List_CRUD_part1

餐廳列表\_CRUD_part1

### Installing

1. 安裝 [node](https://nodejs.org/en/) 環境
2. 安裝 [MongoDB Community Server](https://www.mongodb.com/download-center/community)
3. 把 MongoDB Community Server 解壓縮後，資料夾改名為 mongodb
4. 把 mongodb 資料夾移到 /Users/[你的使用者名稱]
5. 在同個位置 (/Users/[你的使用者名稱])，新增 mongodb-data 資料夾
6. CMD -> \$ cd ~/mongodb/bin/ 切換到 mongodb 目錄
7. CMD -> ./mongod --dbpath /Users/[你的使用者名稱]/mongodb-data
8. 安裝 [Robo 3T](https://robomongo.org/)（GUI 工具）
9. 建立 restaurant 資料庫
   ![https://ithelp.ithome.com.tw/upload/images/20191116/201116172oV0oGotGz.png](https://ithelp.ithome.com.tw/upload/images/20191116/201116172oV0oGotGz.png)
10. 在專案資料夾 CMD -> npm i
11. 設定靜態資料 CMD -> npm run set_seeds
12. 啟動專案 CMD -> npm run dev
13. 瀏覽器輸入 http://localhost:3000

### Features

- 餐廳列表呈現
- 餐廳內容詳細介紹
- 搜尋現有餐廳
- 結合 CRUD 操作功能

### Note

- router 順序注意
- redirect 帶資料
- 圖片上傳機制
- 前端驗證
- mongodb 數字欄位 1.2 -> Double; 1.0 -> Int32
- 載不到圖片 server 會有錯誤
