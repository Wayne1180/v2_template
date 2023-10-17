/*
 * @Author: 王欣磊
 * @Date: 2021-06-25 16:17:20
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-05-31 10:37:36
 * @Description:
 * @FilePath: /bianjian-ship/src/config/ui.config.js
 */
import { getEnumName } from './enum.config'
export const faceStandard = {
  columns: [
    {
      title: '时间',
      dataIndex: 'storageTime',
      key: 'storageTime'
    },
    {
      title: '地点',
      dataIndex: 'snapPos',
      key: 'snapPos'
    },
    {
      title: '船名',
      dataIndex: 'shipName',
      key: 'shipName'
    },
    {
      title: '国籍',
      dataIndex: 'nationality',
      key: 'nationality'
    },
    {
      title: '航线类型',
      dataIndex: 'shipRouteType',
      key: 'shipRouteType'
    },
    {
      title: '缩略图',
      dataIndex: 'shipFeatureImgList',
      key: 'shipFeatureImgList',
      align: 'center',
      scopedSlots: { customRender: 'shipFeatureImgList' }
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      fixed: 'right'
    }
  ]
}
export const faceDynamic = {
  columns: [
    {
      title: '时间',
      dataIndex: 'snapTime',
      key: 'snapTime'
    },
    {
      title: '地点',
      dataIndex: 'snapPos',
      key: 'snapPos'
    },
    {
      title: '船名',
      dataIndex: 'rcgShipName',
      key: 'rcgShipName'
    },
    {
      title: '国籍',
      dataIndex: 'nationality',
      key: 'nationality'
    },
    {
      title: '航线类型',
      dataIndex: 'shipRouteType',
      key: 'shipRouteType'
    },
    {
      title: '缩略图',
      dataIndex: 'shipFeatureImgList',
      key: 'shipFeatureImgList',
      align: 'center',
      scopedSlots: { customRender: 'shipFeatureImgList' }
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      fixed: 'right'
    }
  ]
}
export const faceApplication = {
  columns: [
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '船名',
      dataIndex: 'shipName',
      key: 'shipName'
    },
    {
      title: 'MMSI',
      dataIndex: 'mmsi',
      key: 'mmsi'
    },
    {
      title: '国籍',
      dataIndex: 'nationality',
      key: 'nationality'
    },
    {
      title: '航线类型',
      dataIndex: 'shipRouteType',
      key: 'shipRouteType'
    },
    {
      title: '船长/宽（m）',
      dataIndex: 'shipLength',
      key: 'shipLength',
      scopedSlots: { customRender: 'lenWidth' }
    },
    {
      title: '船主信息',
      dataIndex: 'shipOwner',
      key: 'shipOwner',
      scopedSlots: { customRender: 'ownerInfo' }
    },
    {
      title: '吨位',
      dataIndex: 'grossTon',
      key: 'grossTon'
    },
    {
      title: '缩略图',
      dataIndex: 'shipFeatureImgList',
      key: 'shipFeatureImgList',
      align: 'center',
      scopedSlots: { customRender: 'shipFeatureImgList' }
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      fixed: 'right'
    }
  ]
}

export const warn = {
  columns: [
    {
      title: '时间',
      dataIndex: 'snapTime',
      key: 'time'
    },
    {
      title: '辖区/地点',
      dataIndex: 'address',
      key: 'address',
      customRender: (text, record) => `${record.orgName ? record.orgName + '/' : ''}${record.snapPos || ''}`
    },
    {
      title: '船名',
      dataIndex: 'rcgShipName',
      key: 'rcgShipName'
    },
    {
      title: '预警标识',
      dataIndex: 'shipWarnLabels',
      key: 'shipWarnLabels',
      customRender: (text, record) =>
        (text || [])
          .map((_) => getEnumName('warn.type', _))
          .filter((_) => !!_)
          .join('、')
    },
    {
      title: '航线类型',
      dataIndex: 'shipRouteType',
      key: 'shipRouteType'
    },
    {
      title: '缩略图',
      dataIndex: 'imgUrls',
      key: 'imgUrls',
      align: 'center',
      scopedSlots: { customRender: 'imgUrls' }
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      fixed: 'right'
    }
  ]
}
export const duty = {
  columns: [
    {
      title: '时间',
      dataIndex: 'snapTime',
      key: 'snapTime'
    },
    {
      title: '辖区/地点',
      dataIndex: 'address',
      key: 'address',
      customRender: (text, record) => `${record.orgName ? record.orgName + '/' : ''}${record.snapPos || ''}`
    },
    {
      title: '船名',
      dataIndex: 'rcgShipName',
      key: 'rcgShipName'
    },
    {
      title: '提示类型',
      dataIndex: 'dutyTypes',
      key: 'dutyTypes',
      customRender: (text, record) => (text || []).join('、')
    },
    {
      title: '航线类型',
      dataIndex: 'shipRouteType',
      key: 'shipRouteType'
    },
    {
      title: '航向',
      dataIndex: 'shipCourse',
      key: 'shipCourse',
      scopedSlots: { customRender: 'shipCourse' }
    },
    {
      title: '缩略图',
      dataIndex: 'imgUrls',
      key: 'imgUrls',
      align: 'center',
      scopedSlots: { customRender: 'imgUrls' }
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      fixed: 'right'
    }
  ]
}
export const org = {
  columns: [
    {
      title: '直属机构名称',
      dataIndex: 'rootOrgName',
      key: 'rootOrgName'
    },
    {
      title: '机构名称',
      dataIndex: 'orgName',
      key: 'orgName'
    },
    {
      title: '机构简称',
      dataIndex: 'shortOrgName',
      key: 'shortOrgName'
    },
    {
      title: '机构地址',
      dataIndex: 'orgAddress',
      key: 'orgAddress'
    },
    {
      title: '机构联系电话',
      dataIndex: 'orgPhone',
      key: 'orgPhone'
    },
    {
      title: '行政区划代码',
      dataIndex: 'areaCode',
      key: 'areaCode'
    },
    {
      title: '下属点位',
      dataIndex: 'addressList',
      key: 'addressList',
      scopedSlots: { customRender: 'address-list' }
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      fixed: 'right'
    }
  ]
}
export const user = {
  columns: [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname'
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '警号',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '直属部门',
      dataIndex: 'orgName',
      key: 'orgName'
    },
    {
      title: '根级部门',
      dataIndex: 'rootOrgName',
      key: 'rootOrgName'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: '更新者',
      dataIndex: 'updateBy',
      key: 'updateBy'
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      fixed: 'right'
    }
  ]
}
export const log = {
  columns: [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '操作人',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '操作类型',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip'
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime'
    }
  ]
}
export const control = {
  image: {
    columns: [
      { title: '布控时间', dataIndex: 'snapTime', key: 'snapTime' },
      {
        title: '辖区/地点',
        dataIndex: 'address',
        key: 'address',
        customRender: (text, record) => `${record?.orgName ? record.orgName + '/' : ''}${record?.snapPos || ''}`
      },
      { title: '船名', dataIndex: 'shipName', key: 'shipName' },
      {
        title: '布控标识',
        dataIndex: 'controlSignEnum',
        key: 'controlSignEnum'
      },
      {
        title: '缩略图',
        dataIndex: 'shipFeatureImgList',
        key: 'shipFeatureImgList',
        align: 'center',
        scopedSlots: { customRender: 'shipFeatureImgList' }
      },
      { title: '操作', dataIndex: 'id', key: 'action', scopedSlots: { customRender: 'action' }, fixed: 'right' }
    ]
  },
  manual: {
    columns: [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '布控方案',
        dataIndex: 'controlRuleName',
        key: 'controlRuleName'
      },
      {
        title: '布控时间',
        dataIndex: 'controlStartTime',
        key: 'controlStartTime'
      },
      {
        title: '辖区/地点',
        dataIndex: 'snapPos',
        key: 'snapPos',
        customRender: (text, record) => `${record.orgName ? record.orgName + '/' : ''}${record.snapPos || ''}`
      },
      {
        title: '布控开关',
        dataIndex: 'isControl',
        key: 'isControl',
        scopedSlots: { customRender: 'switch' }
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        fixed: 'right'
      }
    ]
  },
  result: {
    columns: [
      {
        title: '布控时间',
        dataIndex: 'snapTime',
        key: 'snapTime'
      },
      {
        title: '辖区/地点',
        dataIndex: 'snapPos',
        key: 'snapPos',
        customRender: (text, record) => `${record.orgName ? record.orgName + '/' : ''}${record.snapPos || ''}`
      },
      {
        title: '识别船名',
        dataIndex: 'rcgShipName',
        key: 'rcgShipName'
      },
      {
        title: '布控标识',
        dataIndex: 'controlRuleName',
        key: 'controlRuleName'
      },
      {
        title: '缩略图',
        dataIndex: 'imgUrls',
        key: 'imgUrls',
        align: 'center',
        scopedSlots: { customRender: 'imgUrls' }
      },
      {
        title: '操作',
        dataIndex: 'shipImgMetaId',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        fixed: 'right'
      }
    ]
  }
}
export const drag = {
  shipInfoWindow: [
    [
      { label: 'MMSI', value: 'mmsi' },
      { label: '船籍', value: 'mmsi' }
    ],
    [
      { label: '船名', value: 'mmsi' },
      { label: '船种', value: 'mmsi' }
    ],
    [
      { label: '船长', value: 'mmsi' },
      { label: '船宽', value: 'mmsi' }
    ],
    [
      { label: '总吨', value: 'mmsi' },
      { label: '载重', value: 'mmsi' }
    ],
    [
      { label: '航向', value: 'mmsi' },
      { label: '航速', value: 'mmsi' }
    ],
    [
      { label: '船主', value: 'mmsi' },
      { label: '联系方式', value: 'mmsi' }
    ],
    [{ label: '更新时间', value: 'mmsi', valueSpan: 3 }]
  ],
  entryPort: [
    [{ label: '进港计划停靠港', value: 'mmsi', labelWidth: 172 }],
    [{ label: '进港计划时间', value: 'mmsi', labelWidth: 172 }],
    [{ label: '进港计划停靠码头', value: 'mmsi', labelWidth: 172 }],
    [{ label: '出港计划时间', value: 'mmsi', labelWidth: 172 }],
    [{ label: '出港计划停靠港', value: 'mmsi', labelWidth: 172 }]
  ],
  warningWindow: [
    { label: '时间', value: 'createTime' },
    { label: '地点', value: 'snapPos' },
    { label: '船舶', valueArr: ['shipNameCn', 'rcgShipName', 'aisShipName'] },
    { label: '事件', value: 'warn' }
  ],
  hydrologySwitcher: [
    {
      label: '水文',
      options: [
        { label: '表面流速', value: 'mmsi' },
        { label: '水面流速', value: 'mmsi' },
        { label: '水下流速', value: 'mmsi' },
        { label: '位高', value: 'mmsi' }
      ]
    },
    {
      label: '气象',
      options: [
        { label: '风俗', value: 'mmsi' },
        { label: '风向', value: 'mmsi' }
      ]
    }
  ]
}
