# expireStorage
localStorage、sessionStorageの各データに有効期限を設定するためのラッパーです。

# how to use
```
<script src="/path/to/expire-storage.js"></script>
```

## instance
```
// クラス名(Storage)はファイル内で変更できます。
var storage = new Storage( "storage_name", {
  type: 1,  // 0=localStorage(default) / 1=sessionStorage
  maxSize: 90000, // max byte(このサイズを超えたらデータはリセットされる)
} );
```

## set (not with expire)
```
storage.set("key_name", "value");
```

## set (with expire)
```
// 60 second
storage.set("key_name", "value", 60);
```

## get
```
// return null if value not exists
storage.get("key_name");
```

## remove
```
storage.remove("key_name");
```

# attention
有効期限を設定した時、内部のデータは次の構造になります。`e`と`v`は予約語のため、オブジェクト形式の値では使わないで下さい。この予約語は、ファイル内で変更できます。
```
{
  e: 60000,
  v: "value",
}
```
