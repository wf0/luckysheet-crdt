# Sequelize 文件必读

## 连接数据库

```ts
this._sequelize = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  logging: (sql: string) => logger.debug(sql),
});
```

## 创建模型表

```ts
class WorkerBooksModel extends Model {}

// 都需要导出一个 register 方法，用于注册模型
function register(sequelize: Sequelize) {
  WorkerBooksModel.init(
    {
      gridKey: {
        type: DataTypes.STRING, // 类型
        allowNull: false, // 非空
        comment: "gridKey", // 描述
        primaryKey: true, // 主键
        defaultValue: DataTypes.UUIDV4, // 默认使用 uuid 作为 gridKey
      },
      title: {
        type: DataTypes.STRING, // 类型
        allowNull: false, // 非空
        comment: "工作簿名称", // 描述
        defaultValue: "未命名工作簿", // 默认值
      },
      // ... 更多字段，根据项目实际情况添加
    },
    {
      sequelize, // 将模型与 Sequelize 实例关联
      tableName: "WorkerBooks", // 直接式提供数据库表名
    }
  );
}
```

## 同步模型表

```ts
// 方式一:
User.sync(); // 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)

// 方式二:
User.sync({ force: true }); // 将创建表,如果表已经存在,则将其首先删除

// 方式三:
User.sync({ alter: true }); // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
```

## WorkerBooks 工作簿模型表结构

- `gridKey`
  - 类型：String
  - 描述：表格唯一标识，默认使用 uuid 生成，**与 fileid 作用一致**
  - 主键

- `title`
  - 类型：String
  - 描述：工作簿名称
  - 默认值：未命名工作簿

- `lang`
  - 类型：String
  - 描述：表格语言
  - 默认值：zh


~~将不再提供 fileid 作为关联文件字段，详细介绍请查阅下列说明：~~
```js
1. luckysheet 数据结构中，并无fileid字段，而是通过 gridKey 关联文件；
2. fileid 字段，是为了用户在系统中关联 excel 文件，实现自定义文件标记；
3. gridkey 字段，是作为官方文件标识，可以自定义文件标识，方便用户查找；
4. 因此，本表设计中，将不再提供 fileid 字段，而是使用 gridKey 字段，实现文件标识关联。
```

## WorkerSheets 工作表模型表结构

- `worker_sheet_id`
  - 类型：String
  - 描述：工作表唯一标识，默认使用 uuid 生成,与 index 字段作用一致，均标识表唯一字段，因 sql index 关键字，特转用于该字段。
  - 主键

- `gridKey`
  - 类型：String
  - 描述：工作簿唯一标识，默认使用 uuid 生成
  - 外键，关联 WorkerBooks 表

- `name`
  - 类型：String
  - 描述：工作表名称

- `order`
  - 类型：Number
  - 描述：工作表排序

- `status`
  - 类型：Number
  - 描述：工作表激活状态，仅有一个激活状态的工作表，其他工作表为 0

- `hide`
  - 类型：Boolean
  - 描述：工作表隐藏状态，0为不隐藏，1为隐藏

- `row`
  - 类型：Number
  - 描述：行数

- `column`
  - 类型：Number
  - 描述：列数

- `defaultRowHeight`
  - 类型：Number
  - 描述：默认行高

- `defaultColWidth`
  - 类型：Number
  - 描述：默认列宽

## CellDatas 单元格数据模型表结构

... 更多表模型结构，请查阅 [CellDatasModel](./Model/CellDatas.ts)

## ConfigMerges 合并单元格模型表结构
... 更多表模型结构，请查阅 [ConfigMergesModel](./Model/ConfigMerges.ts)

## ConfigBorderInfos 合并单元格模型表结构
... 更多表模型结构，请查阅 [ConfigBorderInfosModel](./Model/ConfigBorderInfos.ts)

## ConfigHiddens 行列隐藏状态模型表结构
... 更多表模型结构，请查阅 [ConfigHiddensModel](./Model/ConfigHiddens.ts)

