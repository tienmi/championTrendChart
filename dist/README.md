# Vue3 冠軍走勢組件

走勢組件是一個用於展示開獎結果走勢的輕量級 Vue 組件。它可以顯示從第一名到第十名的每一名的走勢圖，適用於需要分析開獎數據的應用程序。

## 特性

-   支持展示 1 到 10 名的走勢圖。
-   簡單易用，僅需兩個 props：type 和 data。
-   靈活的數據結構，適應各種獎項系統。

## 安裝

```
npm install champion-trend-chart
```

## 使用方法

### 首先導入組件，然後在您的 Vue 應用程序中使用它。

```
import ChampionTrendChart from 'champion-trend-chart';
```

### 參數 Props

-   type (Number): 預設為 1。一個介於 1 到 10 之間的數字，表示要顯示的名次的走勢。
-   data (Array): 必需。包含開獎結果的陣列。每個對象應包含以下屬性：
    -   lotteryNum (String): 期號。
    -   results (Array): 一個包含該期開獎結果的數字陣列。

Example

```
const type = 1; // 1 ~ 10 的數字，表示獎次。
const data = [
        {
            "lotteryNum": "202401300659",
            "results": [5, 7, 4, 6, 8, 2, 1, 10, 9, 3]
        },
        {
            "lotteryNum": "202401300658",
            "results": [3, 5, 2, 9, 8, 4, 7, 1, 6, 10]
        }
]
```

### 使用組件

```
<ChampionTrendChart :type="type" :data="data" />
```
