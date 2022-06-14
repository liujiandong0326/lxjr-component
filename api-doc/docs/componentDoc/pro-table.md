# pro-table

### 代码

```vue
<template>
  <pro-table
    ref="tableRef"
    :columns="columns"
    :request="request"
    :tool-bar-options="toolBarOptions"
    :rowKey="(record, index) => index"
    :index-options="{ title: '#' }"
    :pagination="{ pageSize: 5 }"
    :showSelection="showSelection"
  >
    <template #action="{ tableRow }">
      <a-tooltip style="margin-right: 8px">
        <template slot="title">查看详情</template>
        <a
          @click="
            $router.push({
              name: 'project-detail',
              query: { id: tableRow.projectId },
            })
          "
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconchaxunxiangqing" />
          </svg>
        </a>
      </a-tooltip>
      <a-tooltip v-if="tableRow.resolutionStatus === '1'">
        <template slot="title">决议变更</template>
        <a @click="handleClickResolutionBtn(tableRow)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconbiangeng" />
          </svg>
        </a>
      </a-tooltip>
    </template>
  </pro-table>
</template>
```

### Attribtes

| 参数              | 说明                                          | 类型                                                           | 是否必要 | 默认值 |
| ----------------- | --------------------------------------------- | -------------------------------------------------------------- | -------- | ------ |
| columns           | 列定义                                        | 具体参照 columns 表                                            | true     | -      |
| searchFormOptions | 是否显示查询项以及查询项配置                  | Object(未处理)/Boolean                                         | false    | -      |
| rowKey            | 同 antd vue 使用相同，会影响 selection 和 key | String/() =>                                                   | false    | -      |
| tableOption       | 添加的配置会直接赋值给 antd table 组件        | 具体参照 antd 文档                                             | false    | -      |
| toolBarOptions    | 设置表格头部工具栏                            | 具体参照 toolBarOptions 表                                     | false    | -      |
| request           | 获取表格数据                                  | (params?: {pageSize,current}) => Promise<{data,success,total}> | true     | -      |
| pagination        | 是否显示分页或者分页配置项                    | Boolean/参照 antd 文档                                         | false    | -      |
| scroll            | x 轴多少像素出现滚动条                        | {x: 1200}                                                      | false    | -      |
| indexOptions      | 第一列是否显示序号                            | Boolean/{title: 表头名字}                                      | false    | -      |
| showSelection     | 是否显示选择框                                | Boolean                                                        | false    | -      |

### 方法

| 参数                 | 说明                           | 返回值 |
| -------------------- | ------------------------------ | ------ |
| getSearchParams      | 获取参数值                     | Object |
| reload               | 重新获取数据                   | -      |
| reset                | 重置 searchForm 并重新获取数据 | -      |
| getSelectedRowKeys   | 获取选择框选中的值             | []     |
| clearSelectedRowKeys | 清空选中的值                   | -      |

#### columns

| 参数         | 说明                                      | 类型                                   | 是否必要 | 默认值 |
| ------------ | ----------------------------------------- | -------------------------------------- | -------- | ------ |
| title        | 表头                                      | String                                 | true     | -      |
| dataIndex    | 数据索引，会影响 searchForm 和 table 渲染 | String                                 | true     | -      |
| hideInSearch | 隐藏 searchForm 表单项                    | Boolean                                | false    | -      |
| hideInTable  | 隐藏 table 列                             | Boolean                                | false    | -      |
| valueType    | searchForm 渲染的表单 type                | text/select/dateRange/date             | false    | text   |
| valueEnum    | select 下拉选项 或 反显 table 字段        | []{text: String, value: String/Number} | false    | -      |
| scopedSlots  | 用法和 antd vue 一样                      | -                                      | false    | -      |

#### toolBarOptions

| 参数     | 说明         | 类型                                                                    | 是否必要 | 默认值 |
| -------- | ------------ | ----------------------------------------------------------------------- | -------- | ------ |
| text     | 表格左侧标题 | String                                                                  | false    | -      |
| toolList | 工具列表     | []{icon: "add"/"download", btnStyle: "primary" /"link", text: 按钮文字} | false    | -      |
