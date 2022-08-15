<template>
  <div>
    <a-button type="primary" @click="handleClick">切换选择框</a-button>
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
  </div>
</template>

<script>
const PROJECT_APPROVAL_STATUS = [
  {
    text: '待审批',
    value: '0',
  },
  {
    text: '审批中',
    value: '1',
  },
  {
    text: '已驳回',
    value: '2',
  },
  {
    text: '已通过',
    value: '3',
  },
  {
    text: '不通过',
    value: '4',
  },
]

export default {
  data() {
    return {
      columns: [
        {
          width: 200,
          title: '项目编号',
          dataIndex: 'itemNo',
        },
        {
          width: 200,
          title: '项目名称',
          dataIndex: 'entryName',
        },
        {
          width: 200,
          title: '项目名称1',
          dataIndex: 'entryName1',
        },
        {
          width: 200,
          title: '项目名称2',
          dataIndex: 'entryName2',
        },
        {
          width: 200,
          title: '项目名称3',
          dataIndex: 'entryName3',
        },
        {
          width: 200,
          title: '项目名称4',
          dataIndex: 'entryName5',
        },
        {
          width: 200,
          title: '项目名称6',
          dataIndex: 'entryName6',
        },
        {
          width: 160,
          title: '创建时间',
          dataIndex: 'time',
        },
        {
          width: 130,
          title: '业务币种',
          dataIndex: 'businessCurrencyId',
          valueType: 'select',
          valueEnum: [
            {
              text: '人民币',
              value: '0',
            },
            {
              text: '美元',
              value: '1',
            },
          ],
        },
        {
          width: 210,
          title: '授信额度',
          dataIndex: 'projectCreditAmount',
          hideInSearch: true,
        },
        {
          width: 110,
          title: '状态',
          hideInSearch: true,
          customRender(text) {
            const arr = ['到期', '未到期']
            return arr[text.status]
          },
        },
        {
          width: 170,
          title: '项目审批状态',
          dataIndex: 'projectApprovalStatus',
          valueType: 'select',
          valueEnum: PROJECT_APPROVAL_STATUS,
        },
        {
          width: 100,
          title: '操作',
          valueType: 'option',
          fixed: 'right',
          align: 'center',
          hideInSearch: true,
          scopedSlots: { customRender: 'action' },
        },
      ],
      toolBarOptions: {
        title: '项目列表',
        toolList: [
          {
            icon: 'add',
            btnStyle: 'link',
            text: '新增',
            click: this.handleAddClick,
          },
          {
            icon: 'download',
            btnStyle: 'link',
            text: '项目报表',
            click: this.handleDownload,
          },
        ],
      },
      showSelection: true,
    }
  },
  methods: {
    async request() {
      const data = []

      for (let i = 0; i < 20; i++) {
        data.push({
          itemNo: '0000',
          entryName: '666',
          time: '2022-06-09',
          businessCurrencyId: '0',
          status: '1',
          resolutionStatus: '1',
          projectApprovalStatus: '1',
          projectCreditAmount: '1000',
        })
      }

      return {
        data,
        total: 20,
      }
    },
    handleClick() {
      this.showSelection = !this.showSelection
    },
  },
}
</script>

<style lang="less" scoped>
.icon {
  position: relative;
  top: 3px;
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
</style>
