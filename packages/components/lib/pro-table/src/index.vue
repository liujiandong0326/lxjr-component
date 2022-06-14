<template>
  <div class="pro-table">
    <a-card class="pro-table-card" v-if="showSearchForm">
      <a-form layout="horizontal" :model="tableForm">
        <a-row :gutter="24" ref="rows">
          <template v-for="(item, index) in searchFormList">
            <template v-if="showItem(index)">
              <a-col :span="8" :key="item.dataIndex">
                <a-form-model-item
                  :labelCol="{
                    style: 'width: 100px;',
                  }"
                  :wrapperCol="{ flex: 1 }"
                >
                  <!-- label 超出4个字显示省略号 -->
                  <template v-if="item.title.length <= 4" slot="label">
                    {{ item.title }}
                  </template>
                  <template v-else slot="label">
                    {{ item.title.substring(0, 2) }}
                    <a-tooltip placement="top">
                      <template slot="title">
                        <span>{{ item.title }}</span>
                      </template>
                      <span style="cursor: pointer">...</span>
                    </a-tooltip>
                    {{ item.title.substring(item.title.length - 1) }}
                  </template>

                  <a-input
                    v-model="tableForm[item.dataIndex]"
                    v-if="!item.valueType"
                    :placeholder="item.placeholder || `请输入${item.title}`"
                  />
                  <a-select
                    v-model="tableForm[item.dataIndex]"
                    v-if="item.valueType === 'select'"
                    :allowClear="item.allowClear || true"
                    :placeholder="item.placeholder || `请选择${item.title}`"
                  >
                    <a-select-option
                      v-for="item in item.valueEnum"
                      :value="item.value"
                      :key="item.value"
                    >
                      {{ item.text }}
                    </a-select-option>
                  </a-select>
                  <a-range-picker
                    v-model="tableForm[item.dataIndex]"
                    v-if="item.valueType === 'dateRange'"
                    format="YYYY-MM-DD"
                    valueFormat="YYYY-MM-DD"
                  />
                  <a-date-picker
                    style="width: 100%"
                    v-model="tableForm[item.dataIndex]"
                    v-if="item.valueType === 'date'"
                    format="YYYY-MM-DD"
                    valueFormat="YYYY-MM-DD"
                  />
                </a-form-model-item>
              </a-col>
            </template>
          </template>
          <a-col v-if="!expand" :span="8" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit" @click="handleRequest">
              查询
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="reset">
              重置
            </a-button>
            <a
              :style="{ marginLeft: '8px', fontSize: '12px' }"
              v-if="searchFormList.length > 5"
              @click="toggle"
            >
              展开
              <a-icon :type="expand ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-if="expand" :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit" @click="handleRequest">
              查询
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="reset">
              重置
            </a-button>
            <a
              :style="{ marginLeft: '8px', fontSize: '12px' }"
              v-if="searchFormList.length > 5"
              @click="toggle"
            >
              关闭
              <a-icon :type="expand ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-spin :spinning="tableLoading">
      <a-card class="pro-table-card">
        <div class="tool-bar-container">
          <span class="title">
            {{ (toolBarOptions && toolBarOptions.title) || '' }}
          </span>
          <div class="tool-list" v-if="toolBarOptions">
            <a-button
              type="link"
              v-for="(item, index) in toolBarOptions.toolList"
              :key="index"
              @click="item.click()"
            >
              <svg class="icon" aria-hidden="true">
                <use
                  :xlink:href="
                    item.icon === 'add' ? '#iconxinzeng' : '#iconxiazai'
                  "
                />
              </svg>
              {{ item.text }}
            </a-button>
          </div>
        </div>
        <div class="table-container">
          <a-table
            ref="tableRef"
            :size="size"
            :rowKey="rowKey || 'id'"
            :columns="mergeColumns"
            :data-source="tableData"
            :scroll="scroll"
            :pagination="paginationOptions"
            :rowSelection="rowSelection"
            v-bind="tableOption"
            @change="handleClickPage"
          >
            <!--自定义列内容渲染项-->
            <template
              v-for="colCustom in columnsCustom"
              :slot="colCustom.customRender"
              slot-scope="text, record, index, column"
            >
              <slot
                :name="colCustom.customRender"
                :tableRow="record"
                :index="index"
                :text="text"
                :column="column"
                v-bind:item="text"
              ></slot>
            </template>
          </a-table>
        </div>
      </a-card>
    </a-spin>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'pro-table',
  props: {
    size: {
      type: String,
      default: 'default',
    },
    /**
     * 设置整个组件渲染
     * [
     *  {
     *    title: '',
     *    dataIndex: '', // 数据索引，会影响 searchForm 和 table 渲染
     *    hideInSearch: boolean, 隐藏搜索项
     *    valueType: 'text | select ',
     *    valueEnum: select 下拉选项 或 反显 table 字段（或者使用 scopedSlots: { customRender: } 传递相关方法）
     *    scopedSlots:
     *  }
     * ]
     */
    columns: {
      type: Array,
      required: true,
    },
    /*
     * 是否显示查询项以及查询项配置
     * */
    searchFormOptions: {
      type: [Object, Boolean],
      default: () => ({}),
    },
    rowKey: {
      type: [String, Function],
    },
    params: {
      type: Object,
      default: () => {},
    },
    tableOption: {
      type: Object,
      default: () => {},
    },
    /**
     * toolBarOptions 设置表格头部工具栏
     * 参数:
     * {
     *    text: string
     *    toolList: [
     *      {
     *        icon: add | download
     *        btnStyle: primary | link
     *        text: string
     *      }
     *    ]
     * }
     */
    toolBarOptions: {
      type: Object,
      default: () => {},
    },
    /**
     * request 获取表格数据
     * 参数：(params?: {pageSize,current}) => Promise<{data,success,total}>
     */
    request: {
      type: Function,
      required: true,
    },
    pagination: {
      type: [Boolean, Object],
      default: true,
    },
    scroll: {
      type: Object,
      default: () => ({
        x: 1200,
      }),
    },
    /**
     * Boolean | Object
     * Object: {
     *   title: String
     * }
     */
    indexOptions: {
      type: [Boolean, Object],
      default: true,
    },
    /**
     * 显示选择框
     */
    showSelection: {
      type: Boolean,
      default: false,
    },
  },
  // watch: {
  //   params: {
  //     deep: true,
  //     handler(newValue) {
  //       if (newValue) {
  //         this.handleRequest()
  //       }
  //     },
  //   },
  // },
  computed: {
    // 是否显示搜索表单
    showSearchForm() {
      return !(
        typeof this.searchFormOptions === 'boolean' &&
        this.searchFormOptions === false
      )
    },
    columnsCustom() {
      return this.columns
        .filter(item => item.scopedSlots)
        .map(item => item.scopedSlots)
    },
    //
    // 查询表单要显示的表单项
    searchFormList() {
      return this.columns.filter(item => !item.hideInSearch)
    },
    // 合并 table 的 columens
    mergeColumns() {
      let columns = cloneDeep(this.columns.filter(item => !item.hideInTable))
      if (this.indexOptions) {
        let title = ''
        if (Object.keys(this.indexOptions).length) {
          title = this.indexOptions.title
        }
        columns.unshift({
          width: 60,
          title: title || '#',
          dataIndex: 'index',
        })
      }
      return columns
    },
    // 分页配置
    paginationOptions() {
      if (this.pagination === false) return false

      const { total, current, pageSize } = this
      const defaultOptions = {
        total,
        current,
        pageSize,
        showQuickJumper: true,
        showSizeChanger: true,
      }

      if (
        typeof this.pagination === 'object' &&
        Object.keys(this.pagination).length
      ) {
        return {
          ...defaultOptions,
          ...this.pagination,
        }
      }
      return defaultOptions
    },
    rowSelection() {
      const { selectedRowKeys } = this

      if (this.showSelection) {
        return {
          selectedRowKeys,
          onChange: this.onSelectChange,
          hideDefaultSelections: true,
          onSelection: this.onSelection,
        }
      }

      return null
    },
  },
  async created() {
    await this.handleRequest()
  },
  data() {
    return {
      tableForm: {},
      expand: false,
      tableData: [],
      total: 0,
      pageSize: 10,
      current: 1,
      timer: null,
      endTime: true,
      tableLoading: true,
      selectedRowKeys: [],
    }
  },
  methods: {
    // ------------------  对外暴露方法  ------------------
    // 获取 searchFrom 的值
    getSearchParams() {
      return { ...this.tableForm, ...this.params }
    },
    // 重新获取数据
    async reload() {
      await this.handleRequest()
    },
    // 重置 searchFrom 内容
    reset() {
      this.tableForm = {}
      this.handleRequest()
    },
    // 获取选中的值
    getSelectedRowKeys() {
      return [...this.selectedRowKeys]
    },
    clearSelectedRowKeys() {
      this.selectedRowKeys = []
    },
    // ------------------  组件内部方法  ------------------
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    // 设置按下 shift 的值
    setKeyStatus(keyCode, status) {
      switch (keyCode) {
        case 16:
          if (this.onShift === status) return
          this.onShift = status
          break
      }
    },
    // table 横向滚动事件监听
    handleScroll() {
      if (!this.onShift && this.endTime) {
        this.endTime = false
        clearTimeout(this.timer)
        this.$message.warning(
          '按住【Shift】滚动鼠标滑轮，可以快速滑动横向滚动条',
          5,
        )
        this.timer = setTimeout(() => {
          this.endTime = true
        }, 5500)
      }
    },
    showItem(index) {
      if (this.expand) {
        return true
      } else {
        return index < 5
      }
    },
    async handleRequest() {
      let searchForm = { ...this.tableForm, ...this.params }
      if (this.pagination) {
        const { current, pageSize } = this
        searchForm = { ...searchForm, current, pageSize }
      }
      const res = await this.request({ ...searchForm })
      this.tableLoading = false
      this.tableData = this.formatTableData(res.data)

      this.total = res.total || 0
    },
    formatTableData(data) {
      const tableData = [...data]
      // 如果传递了 valueEnum 选项，需要在展示的时候过滤出来相关的 value 值
      const isFormat = this.columns.filter(item => item.valueEnum)
      for (let i = 0; i < tableData.length; i++) {
        const item = tableData[i]
        for (let j = 0; j < isFormat.length; j++) {
          Object.keys(item).forEach(key => {
            if (key === isFormat[j].dataIndex) {
              item[key] = isFormat[j].valueEnum.filter(
                enumItem => enumItem.value === item[key],
              )[0]?.text
            }
          })
        }
      }
      // 如果需要编号，默认添加 index 索引
      if (this.indexOptions) {
        return tableData.map((item, index) => ({
          ...item,
          index: (this.current - 1) * this.pageSize + index + 1,
        }))
      }
      return tableData
    },
    toggle() {
      this.expand = !this.expand
    },
    handleClickPage({ current, pageSize }) {
      this.current = current
      this.pageSize = pageSize
      this.handleRequest()
    },
    // 处理键盘按下事件
    handleKeyDown(e) {
      this.setKeyStatus(e.keyCode, true)
    },
    // 处理键盘抬起事件
    handleKeyUp(e) {
      this.setKeyStatus(e.keyCode, false)
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)

    this.dom = document.querySelector('.ant-table-body')
    this.dom.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
    this.dom.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
