
export const radioDecideList = [
    { label: '是', value: true },
    { label: '否', value: false }
];

export const radioDecideDigitList = [
    { label: '是', value: 1 },
    { label: '否', value: 0 }
];

export const radioInsurTypeColumnList = [
    { label: '入院病房', value: 'RYBF' },
    { label: '医疗付款方式', value: 'YLFKFS' },
    { label: '其它', value: '0' }
];

export const radioInsurTypeList = [
    { label: '未指定', value: true },
    { label: '卫统4医保类型标准', value: false },
    // { label: '未指定', value: '0' },
    // { label: '城镇职工基本医疗保险', value: '01' },
    // { label: '城镇居民基本医疗保险', value: '02' },
    // { label: '新型农村合作医疗', value: '03' },
    // { label: '贫困救助', value: '04' },
    // { label: '商业医疗保险', value: '05' },
    // { label: '全公费', value: '06' },
    // { label: '全自费', value: '07' },
    // { label: '其他社会保险', value: '08' },
    // { label: '其他', value: '99' },
];

export const radioTableTypeList = [
    { label: '卫统四（西医）', value: 0 },
    { label: '卫统四（中医）', value: 1 },
    { label: '上海版卫统四（西医）', value: 2 },
    { label: '上海版卫统四（中医）', value: 3 },
    { label: '转科数据表', value: 4 },
    { label: 'HQMS_NEW(西医)', value: 5 },
    // { label: '云南省医疗费用结算单表9', value: 9 },
    // { label: '德清县医疗费用结算单', value: 10 },
    { label: '未指定', value: 999 },
];

export const radioImportDataTypeList = [
    { label: '病案首页', value: 0 },
    { label: '转科数据', value: 1 },
    // { label: '医保结算数据', value: 2 },
];

export const radioImportTypeList = [
    { label: '文件上传', value: 0 },
    { label: '数据接口', value: 1 }
];

export const radioMedTeamColumnList = [
    { label: '进修医生 "JXYS"', value: 'JXYS' },
    { label: '实习医师 "SXYS"', value: 'SXYS' }
];

export const radioValidOperRuleList = [
    { label: '操作类型为“介入治疗”或“手术”', value: 0 },
    { label: '手术级别不为0', value: 1 }
];

export const radioPersonalIdColumnList = [
    { label: '病案号', value: 'BAH' },
    { label: '健康卡号', value: 'JKKH' },
    { label: '身份证号', value: 'SFZH' },
];
