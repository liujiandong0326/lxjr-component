<template>
  <pro-table
    :columns="columns"
    :request="request"
    :tool-bar-options="toolBarOptions"
    :rowKey="(record, index) => index"
    :index-options="{ title: '#' }"
    :pagination="{ pageSize: 5 }"
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
          width: 160,
          title: '决议编号',
          dataIndex: 'resolutionId',
        },
        {
          width: 110,
          title: '客户经理',
          dataIndex: 'accountManager',
        },
        {
          width: 110,
          title: '风控主管',
          dataIndex: 'riskControlSupervisor',
        },
        {
          width: 130,
          title: '业务币种',
          dataIndex: 'businessCurrencyId',
          valueType: 'select',
          valueEnum: [],
        },
        {
          width: 210,
          title: '授信额度',
          dataIndex: 'projectCreditAmount',
          hideInSearch: true,
        },
        {
          width: 210,
          title: '授信余额',
          dataIndex: 'projectCreditBalance',
          hideInSearch: true,
        },
        {
          width: 210,
          title: '授信到期日',
          dataIndex: 'projectCreditPeriodEndTime',
          hideInSearch: true,
        },
        {
          width: 110,
          title: '授信天数',
          dataIndex: 'creditDays',
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
          width: 210,
          title: '创建时间',
          dataIndex: 'createTime',
          hideInSearch: true,
        },
        {
          width: 100,
          title: '操作',
          valueType: 'option',
          fixed: 'right',
          align: 'center',
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
    }
  },
  methods: {
    async request() {
      return {
        data: [
          {
            projectId: '6889602823282102272',
            itemNo: 'TB-PT220602008',
            entryName: '666',
            resolutionInfoId: '6889603071060611072',
            resolutionId: 'TB-RS220602005',
            accountManagerId: '1510137194747006977',
            accountManager: '客户经理1',
            riskControlSupervisorId: '1510136762209406977',
            riskControlSupervisor: '风控主管1',
            businessCurrencyId: 'CNY',
            businessCurrency: '人民币',
            projectCreditAmount: '666666.00',
            projectCreditBalance: '666666.00',
            projectCreditPeriodStartTime: '2022-06-01 00:00:00',
            projectCreditPeriodEndTime: '2022-07-28',
            creditDays: '127',
            status: '1',
            resolutionStatus: '1',
            projectApprovalStatus: '1',
            changeStatus: null,
            createTime: '2022-06-13 10:27:28',
          },
          {
            projectId: '6891660845089165312',
            itemNo: 'TB-PT220608001',
            entryName: '测试资金',
            resolutionInfoId: '6891661286539661312',
            resolutionId: 'TB-RS220608001',
            accountManagerId: '1511646703151747073',
            accountManager: '客户经理2',
            riskControlSupervisorId: '1511648028157546497',
            riskControlSupervisor: '风控主管2',
            businessCurrencyId: 'CNY',
            businessCurrency: '人民币',
            projectCreditAmount: '10000.00',
            projectCreditBalance: '5500.00',
            projectCreditPeriodStartTime: '2022-06-08 00:00:00',
            projectCreditPeriodEndTime: '2022-06-30',
            creditDays: '22',
            status: '1',
            resolutionStatus: '1',
            projectApprovalStatus: '3',
            changeStatus: null,
            createTime: '2022-06-08 10:59:36',
          },
          {
            projectId: '6891711078405902336',
            itemNo: 'TB-PT220608002',
            entryName: '6月第8天',
            resolutionInfoId: '6891711758927532032',
            resolutionId: 'TB-RS220608002',
            accountManagerId: '1510137194747006977',
            accountManager: '客户经理1',
            riskControlSupervisorId: '1510136762209406977',
            riskControlSupervisor: '风控主管1',
            businessCurrencyId: 'CNY',
            businessCurrency: '人民币',
            projectCreditAmount: '666666.00',
            projectCreditBalance: '666666.00',
            projectCreditPeriodStartTime: '2022-06-07 00:00:00',
            projectCreditPeriodEndTime: '2022-07-24',
            creditDays: '117',
            status: '1',
            resolutionStatus: '1',
            projectApprovalStatus: '3',
            changeStatus: null,
            createTime: '2022-06-13 10:27:36',
          },
          {
            projectId: '6891394975469277184',
            itemNo: 'TB-PT220607001',
            entryName: '测试流程',
            resolutionInfoId: '6891396001777717248',
            resolutionId: 'TB-RS220607001',
            accountManagerId: '1511646703151747073',
            accountManager: '客户经理2',
            riskControlSupervisorId: '1511648028157546497',
            riskControlSupervisor: '风控主管2',
            businessCurrencyId: 'CNY',
            businessCurrency: '人民币',
            projectCreditAmount: '10000.00',
            projectCreditBalance: '10000.00',
            projectCreditPeriodStartTime: '2022-06-07 00:00:00',
            projectCreditPeriodEndTime: '2022-06-30',
            creditDays: '23',
            status: '1',
            resolutionStatus: '1',
            projectApprovalStatus: '3',
            changeStatus: null,
            createTime: '2022-06-07 17:32:28',
          },
          {
            projectId: '6889169915153092608',
            itemNo: 'TB-PT220601002',
            entryName: 'rmb',
            resolutionInfoId: '6889170332482146304',
            resolutionId: 'TB-RS220601001',
            accountManagerId: '1510137194747006977',
            accountManager: '客户经理1',
            riskControlSupervisorId: '1510136762209406977',
            riskControlSupervisor: '风控主管1',
            businessCurrencyId: 'CNY',
            businessCurrency: '人民币',
            projectCreditAmount: '88888888.00',
            projectCreditBalance: '88888888.00',
            projectCreditPeriodStartTime: '2022-05-31 00:00:00',
            projectCreditPeriodEndTime: '2022-07-22',
            creditDays: '191',
            status: '1',
            resolutionStatus: '1',
            projectApprovalStatus: '3',
            changeStatus: '3',
            createTime: '2022-06-08 18:43:00',
          },
          {
            projectId: '6893466179587936256',
            itemNo: 'TB-PT220613001',
            entryName: '0613lastUSDproject',
            resolutionInfoId: '6893466554969755648',
            resolutionId: 'TB-RS220613001',
            accountManagerId: '1510137194747006977',
            accountManager: '客户经理1',
            riskControlSupervisorId: '1510136762209406977',
            riskControlSupervisor: '风控主管1',
            businessCurrencyId: 'USD',
            businessCurrency: '美元',
            projectCreditAmount: '666666.00',
            projectCreditBalance: '666666.00',
            projectCreditPeriodStartTime: '2022-06-11 00:00:00',
            projectCreditPeriodEndTime: '2022-07-28',
            creditDays: '117',
            status: '1',
            resolutionStatus: '1',
            projectApprovalStatus: '3',
            changeStatus: '3',
            createTime: '2022-06-13 10:34:24',
          },
          {
            projectId: '6893517813324058624',
            itemNo: 'TB-PT220613002',
            entryName: ' 联想（北京）信息技术有限公司 ',
            resolutionInfoId: '6893518158989234176',
            resolutionId: 'TB-RS220613002',
            accountManagerId: '1511646703151747073',
            accountManager: '客户经理2',
            riskControlSupervisorId: '1511648028157546497',
            riskControlSupervisor: '风控主管2',
            businessCurrencyId: 'CNY',
            businessCurrency: '人民币',
            projectCreditAmount: '100000.00',
            projectCreditBalance: '100000.00',
            projectCreditPeriodStartTime: '2022-06-13 00:00:00',
            projectCreditPeriodEndTime: '2022-06-30',
            creditDays: '17',
            status: '1',
            resolutionStatus: '1',
            projectApprovalStatus: '3',
            changeStatus: null,
            createTime: '2022-06-13 13:52:56',
          },
          {
            projectId: '6891004990962405376',
            itemNo: 'TB-PT220606002',
            entryName: 'test20220606-01',
            resolutionInfoId: '6891007340808638464',
            resolutionId: 'TB-RS220606002',
            accountManagerId: '1510137194747006977',
            accountManager: '客户经理1',
            riskControlSupervisorId: '1510136762209406977',
            riskControlSupervisor: '风控主管1',
            businessCurrencyId: 'CNY',
            businessCurrency: '人民币',
            projectCreditAmount: '9999.00',
            projectCreditBalance: '9999.00',
            projectCreditPeriodStartTime: '2022-06-06 00:00:00',
            projectCreditPeriodEndTime: '2022-07-31',
            creditDays: '125',
            status: '1',
            resolutionStatus: '1',
            projectApprovalStatus: '1',
            changeStatus: null,
            createTime: '2022-06-07 11:00:57',
          },
          {
            projectId: '6880777712009613312',
            itemNo: 'TB-PT220509001',
            entryName: '测试审批新流程',
            resolutionInfoId: '6880842007158329344',
            resolutionId: 'TB-RS220509008',
            accountManagerId: '1503280821140721665',
            accountManager: '客户经理',
            riskControlSupervisorId: '1503280278884323330',
            riskControlSupervisor: '风控主管',
            businessCurrencyId: 'CNY',
            businessCurrency: '人民币',
            projectCreditAmount: '11.00',
            projectCreditBalance: '11.00',
            projectCreditPeriodStartTime: '2022-05-19 00:00:00',
            projectCreditPeriodEndTime: '2022-06-24',
            creditDays: '105',
            status: '1',
            resolutionStatus: '1',
            projectApprovalStatus: '1',
            changeStatus: '3',
            createTime: '2022-06-06 16:53:45',
          },
          {
            projectId: '6890983663962558464',
            itemNo: 'TB-PT220606001',
            entryName: '测试决议变更10',
            resolutionInfoId: '6890984109007572992',
            resolutionId: 'TB-RS220606001',
            accountManagerId: '1503280821140721665',
            accountManager: '客户经理',
            riskControlSupervisorId: '1503280278884323330',
            riskControlSupervisor: '风控主管',
            businessCurrencyId: 'CNY',
            businessCurrency: '人民币',
            projectCreditAmount: '11.00',
            projectCreditBalance: '11.00',
            projectCreditPeriodStartTime: '2022-06-16 00:00:00',
            projectCreditPeriodEndTime: '2022-07-28',
            creditDays: '112',
            status: '1',
            resolutionStatus: '1',
            projectApprovalStatus: '1',
            changeStatus: null,
            createTime: '2022-06-06 14:03:50',
          },
        ],
        total: 100,
      }
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
