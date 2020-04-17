import React from 'react';
import { Alert, Collapse, Timeline, Row, Input, Col, Radio, Button, Tooltip } from 'antd';
import { ContainerOutlined, InfoCircleOutlined } from '@ant-design/icons';
import TextLoop from 'react-text-loop';

import HospMsg from '../SettingConfigContentMsg/HospMsg/HospMsg.js'
import MedTeamMsg from '../SettingConfigContentMsg/MedTeamMsg/MedTeamMsg.js'
import CardInfoMsg from '../SettingConfigContentMsg/CardInfoMsg/CardInfoMsg';
// import CustomProcs from '../CustomProcs/CustomProcs'
import DoctorMsg from '../SettingConfigContentMsg/DoctorMsg/DoctorMsg.js'
import OperMsg from '../SettingConfigContentMsg/OperMsg/OperMsg.js'
import InsurMsg from '../SettingConfigContentMsg/InsurMsg/InsurMsg.js'
import RwRangeMsg from '../SettingConfigContentMsg/RwRangeMsg/RwRangeMsg.js'
import SdMsg from '../SettingConfigContentMsg/SdMsg/SdMsg'
import TransferSpecMsg from '../SettingConfigContentMsg/TransferSpecMsg/TransferSpecMsg'
import SqlExecutorMsg from '../SettingConfigContentMsg/SqlExecutorMsg/SqlExecutorMsg'
import DrgsMsg from '../SettingConfigContentMsg/DrgsMsg/DrgsMsg'

import { radioDecideList, radioInsurTypeList } from '../../assets/js/constants'

import _ from 'lodash';

const { Panel } = Collapse;

export default class SettingConfigContent extends React.Component {
  state = {
    usePerfDeptValue: true,
    useWardValue: false,
    fileImportStoredPathValue: "",
    presentationValue: false,
    activeKey: "",
    privatesettingsContent: "",
    presentationsettingsContent: "",
    businesssettingsContent: "",
    onlineDrgsCalApiValue: false,
    onlineDrgsCalValue: false,
    useCustomSdValue: false,
    updateCustomSdProc: "",
    useMetricsSdValue: false,
    useCombinedOperValue: false,
    onDataByHospValue:false,
  };

  onOnlineDrgsCalApiChange = e => {
    this.setState({
      onlineDrgsCalApiValue: e.target.value,
    });
  }

  onOnlineDrgsCalChange = e => {
    this.setState({
      onlineDrgsCalValue: e.target.value,
    });
  }

  onUseCustomSdChange = e => {
    this.setState({
      useCustomSdValue: e.target.value,
    });
  }
  onUpdateCustomSdProcChange = e => {
    this.setState({
      updateCustomSdProc: e.target.value,
    });
  }

  onUseMetricsSdChange = e => {
    this.setState({
      useMetricsSdValue: e.target.value,
    });
  }

  onUseCombinedOperChange = e => {
    this.setState({
      useCombinedOperValue: e.target.value,
    });
  }

  onDataByHospChange = e => {
    this.setState({
      onDataByHospValue: e.target.value,
    });
  }

  onUsePerfDeptChange = e => {
    this.setState({
      usePerfDeptValue: e.target.value,
    });
  }

  onUseWardChange = e => {
    this.setState({
      useWardValue: e.target.value,
    });
  }

  onFileImportStoredPathChange = e => {
    this.setState({
      fileImportStoredPathValue: e.target.value,
    });
  }

  onPresentationChange = e => {
    this.setState({
      presentationValue: e.target.value,
    });
  }

  onCollapseChange = key => {
    this.setState({
      activeKey: key,
    });
  }

  renderOnlineDrgsCalItem() {
    let { onlineDrgsCalValue, onlineDrgsCalApiValue } = this.state;
    if (onlineDrgsCalApiValue) {
      return (
        <Timeline.Item >
          <h4 className="item-title">前置分组页面（需要提供前置分组接口）</h4>
          <Radio.Group options={radioDecideList} onChange={this.onOnlineDrgsCalChange} value={onlineDrgsCalValue}>
          </Radio.Group>
        </Timeline.Item>
      )
    }
  }

  renderUseCustomSdInput() {
    if (this.state.useCustomSdValue) {
      return (
        <Input className=""
          placeholder='请更新扩充重点监控病种的存储过程名，如："XXXX"'
          value={this.state.updateCustomSdProc}
          allowClear
          suffix={
            <Tooltip placement="right" title='请更新扩充重点监控病种的存储过程名，如："XXXX"'>
              <InfoCircleOutlined className="suffixColor" />
            </Tooltip>
          }
          onChange={this.onUpdateCustomSdProcChange} />
      )
    }
  }

  onClick = e => {
    let {
      hospMsg,
      medTeamMsg,
      doctorMsg,
      operMsg,
      insurMsg,
      rwRangeMsg,
      cardInfoMsg,
      sdMsg,
      transferSpecMsg,
      sqlExecutorMsg,
      drgsMsg,
    } = this.refs;

    let {
      usePerfDeptValue,
      useWardValue,
      fileImportStoredPathValue,
      onlineDrgsCalValue,
      onlineDrgsCalApiValue,
      updateCustomSdProc,
      useMetricsSdValue,
      useCombinedOperValue,
      onDataByHospValue,
    } = this.state;

    //医院配置内容
    let hospSate = hospMsg.state,
      hospDataList = hospSate.dataImportsList,
      dataImports = "",
      hospList = [],
      hospCompareClaim = "";

    hospSate.multiHospsValue ? hospList = hospDataList : hospList.push(hospDataList[0]);

    _.map(hospList, hosp => {
      let storedPathStr, hospCodeStr;
      hosp.inputHospCodeValue === "" ? hospCodeStr = `"%"` : hospCodeStr = hosp.inputHospCodeValue;
      hosp.storedPathValue === "" ? storedPathStr = `""` : storedPathStr = hosp.storedPathValue;
      dataImports += `
        &nbsp;&nbsp;{<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;"HospCode": ${hospCodeStr},	<br/>&nbsp;&nbsp;		     
        &nbsp;&nbsp;&nbsp;&nbsp;"ImportType": "${hosp.importTypeValue}",	<br/>&nbsp;&nbsp;		  
        &nbsp;&nbsp;&nbsp;&nbsp;"ImportDataType": "${hosp.importDataTypeValue}",		<br/>&nbsp;&nbsp;	  
        &nbsp;&nbsp;&nbsp;&nbsp;"TableType": "${hosp.tableTypeValue}",		<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;"StoredPath": ${storedPathStr}		<br/>&nbsp;&nbsp;    
        &nbsp;&nbsp;},<br/>&nbsp;&nbsp;
      `;
    })

    hospSate.hospCompareValue ?
      hospCompareClaim = `` :
      hospCompareClaim = `
      &nbsp;&nbsp;&nbsp;&nbsp;//医院拥有多家分院对比使用跨院对比分析,请注释以下行<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;"DrgsAnalysis/Pages/HospCmiStatsCmp",    <br/>&nbsp;&nbsp;
      &nbsp;&nbsp;"DrgsAnalysis/Pages/HospDiseaseStatsCmp",<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;"DrgsAnalysis/Pages/HospSdStatsCmp",<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;"DrgsAnalysis/Pages/HospMetricsSdStatsCmp",<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;"DrgsAnalysis/Pages/HospSdStatsCmp",<br/>&nbsp;&nbsp;
    `;

    //医疗组配置
    let medTeamSate = medTeamMsg.state;

    //医生配置
    let doctorSate = doctorMsg.state;

    //手术配置
    let operSate = operMsg.state;

    //医保配置
    let insurSate = insurMsg.state,
      insurType = "",
      fakeInsurClaim = "";
    if (insurSate.insurTypesValue === 0 || insurSate.distInsurTypesValue === 0) {
      insurType = `
      &nbsp;&nbsp;{<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;  &nbsp;&nbsp;"Code": "0",<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;  &nbsp;&nbsp;"Name": "未指定",<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;},<br/>&nbsp;&nbsp;
      `;
    } else {
      insurType += `
        &nbsp;&nbsp;{<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Code": "0",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Name": "未指定",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;},<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;{<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Code": "01",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Name": "城镇职工基本医疗保险",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;},<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;{<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Code": "02",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Name": "城镇居民基本医疗保险",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;},<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;{<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Code": "03",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Name": "新型农村合作医疗",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;},<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;{<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Code": "04",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Name": "贫困救助",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;},<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;{<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Code": "05",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Name": "商业医疗保险",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;},<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;{<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Code": "06",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Name": "全公费",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;},<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;{<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Code": "07",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Name": "全自费",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;},<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;{<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Code": "08",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Name": "其他社会保险",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;},<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;{<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Code": "99",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;  &nbsp;&nbsp;"Name": "其他",<br/>&nbsp;&nbsp;
        &nbsp;&nbsp;},<br/>&nbsp;&nbsp;
        `;
    }
    insurSate.insurTypesValue === 1 ?
      fakeInsurClaim = `` :
      fakeInsurClaim = `
      &nbsp;&nbsp;&nbsp;&nbsp;//院方使用伪医保支付功能，请注释以下行<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;"InsurAnalysis/Pages/InsurHosp",    <br/>&nbsp;&nbsp;
      &nbsp;&nbsp;"DataQuery/Details/HospSettledCard",<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;"DataQuery/Details/DeptSettledCard",<br/>&nbsp;&nbsp;
    `;

    //RWRanges配置
    let rwRangeSate = rwRangeMsg.state,
      rwRanges = "";
    for (var i of rwRangeSate.rwRangesList) {
      rwRanges += `
      &nbsp;&nbsp;{<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;"Code": "${i.code}",<br/>&nbsp;&nbsp;`

      i.upperBoundValue === 9999 ?
        rwRanges += `&nbsp;&nbsp;&nbsp;&nbsp;"Name": "${i.lowerBoundValue}<=Rw",<br/>&nbsp;&nbsp;` :
        rwRanges += `&nbsp;&nbsp;&nbsp;&nbsp;"Name": "${i.lowerBoundValue}<=Rw<${i.upperBoundValue}",<br/>&nbsp;&nbsp;`

      rwRanges += `
      &nbsp;&nbsp;&nbsp;&nbsp;"LowerBound": "${i.lowerBoundValue}",<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;"UpperBound": "${i.upperBoundValue}",<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;},<br/>&nbsp;&nbsp;`

      if (i.upperBoundValue === 9999) {
        break;
      }
    }

    //病案数据配置
    let cardInfoSate = cardInfoMsg.state;

    //单病种配置
    let sdSate = sdMsg.state,
      metricsSdClaim = "",
      defaultSdClaim = "",
      updateCustomSdProcStr = "";

    useMetricsSdValue ?
      metricsSdClaim = `` :
      metricsSdClaim = `
    &nbsp;&nbsp;&nbsp;&nbsp;//是否使用三级公立医院绩效考核单病种，使用则添加注释，不使用则取消注释<br/>&nbsp;&nbsp;
    &nbsp;&nbsp;"DrgsAnalysis/Pages/HospMetricsSd",    <br/>&nbsp;&nbsp;
    &nbsp;&nbsp;"DrgsAnalysis/Pages/DeptMetricsSd",<br/>&nbsp;&nbsp;
    &nbsp;&nbsp;"DrgsAnalysis/Pages/HospMetricsSdStatsCmp",<br/>&nbsp;&nbsp;
    &nbsp;&nbsp;"DrgsAnalysis/Pages/DeptMetricsSdStatsCmp",<br/>&nbsp;&nbsp;
    &nbsp;&nbsp;"PerfAnalysis/Workload/MetricsSd",<br/>&nbsp;&nbsp;
    &nbsp;&nbsp;"DataQuery/Details/HospMetricsSd",<br/>&nbsp;&nbsp;
    &nbsp;&nbsp;"DataQuery/Details/DeptMetricsSd",<br/>&nbsp;&nbsp;
  `;

    sdSate.useDefaultSdValue ?
      defaultSdClaim = `
      &nbsp;&nbsp;&nbsp;&nbsp;//院方使用重点监控病种，请取消以下行注释<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;"DrgsAnalysis/Pages/HospSd",<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;"DrgsAnalysis/Pages/DeptSd",<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;"DrgsAnalysis/Pages/HospSdStatsCmp",<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;"DrgsAnalysis/Pages/DeptSdStatsCmp",<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;"PerfAnalysis/Workload/Sd",<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;"DataQuery/Details/HospSd",<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;"DataQuery/Details/DeptSd",<br/>&nbsp;&nbsp;`:
      defaultSdClaim = "";

    updateCustomSdProc === "" ?
      updateCustomSdProcStr = `""` :
      updateCustomSdProcStr = updateCustomSdProc;

    //转科数据配置
    let transferSpecSate = transferSpecMsg.state,
      transferClaim = "";

    transferSpecSate.transferEnabledValue ?
      transferClaim = "" :
      transferClaim = `
    &nbsp;&nbsp;&nbsp;&nbsp;//院方使用转科数据，请注释以下行<br/>&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;"DataManipulation/TransferImport/Index",<br/>&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;"DataManipulation/TransferImport/Create",<br/>&nbsp;&nbsp;`;

    //分组器配置
    let drgsSate = drgsMsg.state,
      drgsAddress = drgsSate.drgsAddressValue,
      alternativeAddVal = drgsSate.drgsAlternativeAddressesValue,
      alternativeAddList = alternativeAddVal.split(","),
      alternativeAddStr = `${alternativeAddVal}`,
      concurrency = 0;

    if (drgsAddress !== "") {
      alternativeAddList.length === 1 && alternativeAddList[0] === "" ?
        concurrency = 1 :
        concurrency = alternativeAddList.length + 1;
    } else {
      drgsAddress = `""`;
    }

    //数据上传配置
    let fileImportStoredPathStr = "";
    fileImportStoredPathValue === "" ? fileImportStoredPathStr = `""` : fileImportStoredPathStr = fileImportStoredPathValue;

    //数据库配置
    // let sqlExecutorSate = sqlExecutorMsg.state,
    //   genCustomFeaturesProcs = `${sqlExecutorSate.genCustomFeaturesProcsValue}`;

    //前置分组器页面
    let onlineDrgsCalStr = ``;
    if (!onlineDrgsCalValue || !onlineDrgsCalApiValue) {
      onlineDrgsCalStr = `
      &nbsp;&nbsp;&nbsp;&nbsp;//院方使用在线分组页面，请注释此行<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;"DrgsCalculation/Online/Index",<br/>&nbsp;&nbsp`;
    }

    //医院操作数据分子
    let dataByHospStr = ``;
    if (onDataByHospValue) {
      dataByHospStr = `
      &nbsp;&nbsp;&nbsp;&nbsp;//医院操作数据分组<br/>&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;"Management/Data/Index",<br/>&nbsp;&nbsp`;
    }

    let priJson = `{<br/>&nbsp;&nbsp;
            "ConnectionStrings": {<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"BusinessDbConnection": "data source=.;initial catalog=UniDrgsProtoCore;integrated security=False;MultipleActiveResultSets=True;App=EntityFramework;User Id=sa;Password=17931",<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"IdentityDbConnection": "data source=.;initial catalog=UniDrgsProtoCore_Identity;integrated security=False;MultipleActiveResultSets=True;App=EntityFramework;User Id=sa;Password=17931"<br/>&nbsp;&nbsp;
            &nbsp;&nbsp;},<br/>&nbsp;&nbsp;
          
            "Oauth": {<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"AuthorityAddress": "http://localhost:1234",   &nbsp;&nbsp;&nbsp;&nbsp; // IIS部署端口 <br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"AccessTokenLifetime": 3600 <br/>&nbsp;&nbsp;
               },<br/>&nbsp;&nbsp;
          
          
            "SqlExecutor": {<br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;"Timeout": 600,<br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;"Expire": 300<br/>&nbsp;&nbsp;
            },<br/>&nbsp;&nbsp;
          
            "FileImport": {<br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;"StoredPath": ${fileImportStoredPathStr},		    &nbsp;&nbsp;&nbsp;&nbsp; // 上传数据存储路径，仅对文件数据源有效 <br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;"MaxSize": 200  								&nbsp;&nbsp;&nbsp;&nbsp;//上传数据文件最大限制MB <br/>&nbsp;&nbsp;
            },<br/>&nbsp;&nbsp;
          
            "Security": {<br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;//如果不限网段， 用0.0.0.0/0        <br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;"SafeIpList": ["0.0.0.0/0"],	      <br/>&nbsp;&nbsp;     		            
              &nbsp;&nbsp;&nbsp;&nbsp;"SafeUrlTmplList": [  <br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;   "(?i)/connect/token", <br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;  "(?i)^/API/([a-z]|[A-Z])+Stats/.+", <br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;  "(?i)^/API/MetaData/.+" <br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;]<br/>&nbsp;&nbsp;
            }<br/>
          }`;

    let pttJson = ``;
    if (this.state.presentationValue) {
      pttJson = `{<br/>&nbsp;&nbsp;
                "Presentation":  {<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"HardCodeViewDatas": [<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Path": "DataQuery/Details/HospDrgs",<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ViewDatas": {<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  "AlternativeExportPath": "Export/DataQuery/Details/HospFullCardExportDetail"<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Path": "DataQuery/Details/DeptDrgs",<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ViewDatas": {<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"AlternativeExportPath": "Export/DataQuery/Details/DeptFullCardExportDetail"<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;]<br/>&nbsp;&nbsp;
                }<br/>
                }`;
    } else {
      pttJson = `{<br/>&nbsp;&nbsp;
                "Presentation": {}<br/>
              }`;
    }

    let bsnJson = `
        {<br/>&nbsp;&nbsp;
            "Business": {<br/>&nbsp;&nbsp;
              &nbsp;&nbsp;"SystemInfo": {<br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;"Name": "DRGs院内版",<br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;"ShortName": "DRGs院内版",<br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;"Author": "上海联众网络技术有限公司",<br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;"Description": "",<br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;"CopyRight": "©Copyright 上海联众网络信息有限公司",<br/>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;"Keywords": "DRGs，绩效分析"<br/>&nbsp;&nbsp;
              &nbsp;&nbsp;},<br/>&nbsp;&nbsp;

              "TransferSpec": {<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"Enabled": ${transferSpecSate.transferEnabledValue}, &nbsp;&nbsp;&nbsp;&nbsp; // 是否导入转科数据，默认为false <br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"HisIdFormat": "{0:BAH}-{1:CYSJ}",	&nbsp;&nbsp;&nbsp;&nbsp; // 生成转科数据HisId的格式表达式，默认为"{0:BAH}-{1:CYSJ}" <br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"IsToHour": ${transferSpecSate.transferIsToHourValue},&nbsp;&nbsp;&nbsp;&nbsp;    // 转科数据是否精确到小时，默认为false <br/>&nbsp;&nbsp;  
             },<br/>&nbsp;&nbsp;
          
              "CardSpec": {<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"HisIdFormat": "{0:BAH}-{1:CYSJ}"	&nbsp;&nbsp;&nbsp;&nbsp;// 生成病案数据HisId的格式表达式，默认为"{0:BAH}-{1:CYSJ}"<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"UseWard": ${useWardValue},     &nbsp;&nbsp;&nbsp;&nbsp;  // 是否使用病区，默认为false<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"OutDeptColumn": "CYBF",	&nbsp;&nbsp;&nbsp;&nbsp;// 出院科室对应字段，默认为"CYBF"<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"MedTeamColumn": "${medTeamSate.medTeamColumnValue}",    	&nbsp;&nbsp;&nbsp;&nbsp; // 医疗组对应字段，默认为"JXYS"<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"UseOperGroupSort": ${operSate.useOperGroupSortValue},		  	&nbsp;&nbsp;&nbsp;&nbsp; // 是否使用手术组序号，默认为falseoperGroupSortValue<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"UseExtendedOperCode": ${operSate.useExtendedOperCodeValue},	  &nbsp;&nbsp;&nbsp;&nbsp; // 是否使用手术扩码，默认为false<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"UseCombinedOper": ${useCombinedOperValue},		    &nbsp;&nbsp;&nbsp;&nbsp; // 是否使用联合手术，默认为false<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"UseMultiPrimaryOper": ${operSate.useMultiPrimaryOperValue},	  &nbsp;&nbsp;&nbsp;&nbsp; // 是否使用多台次主手术模式，默认为true<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"UseManualPrimaryOperManipulation":${operSate.useManualPrimaryOperManipulationValue},	&nbsp;&nbsp;&nbsp;&nbsp; // 是否支持手动修改每台手术的主手术，默认为false<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"UseDaySurgery": ${operSate.useDaySurgeryValue},			&nbsp;&nbsp;&nbsp;&nbsp; // 是否使用日间手术，默认为true<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"IsToHour": ${cardInfoSate.isToHourValue},	&nbsp;&nbsp;&nbsp;&nbsp; // 病案数据精确到小时，默认为false<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"InsurTypeColumn": "${insurSate.insurTypeColumnValue}",			&nbsp;&nbsp;&nbsp;&nbsp; //医保类型对应字段，默认为"RYBF"<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"UseDefaultSd": ${sdSate.useDefaultSdValue},		&nbsp;&nbsp;&nbsp;&nbsp; // 是否使用重点监控病种，默认为true<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"UseMetricsSd": ${sdSate.useMetricsSdValue},&nbsp;&nbsp;&nbsp;&nbsp; // 是否使用三级公立医院单病种，默认为false<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"UseCustomSd":  ${sdSate.useCustomSdValue},	&nbsp;&nbsp;&nbsp;&nbsp; // 是否使用自定义单病种，默认为false<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"CmiAttenuator": 1,	&nbsp;&nbsp;&nbsp;&nbsp; // 显示的Cm,Cmi除以该值，默认为 1<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"UpdateCustomSdProc" : ${updateCustomSdProcStr},	&nbsp;&nbsp;&nbsp;&nbsp; // 更新扩充重点监控病种的存储过程名<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"GenCustomFeaturesProcs" : ["",""],	&nbsp;&nbsp;&nbsp;&nbsp;   // 自定义存储过程列表<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"PersonalIdColumn": "${cardInfoSate.personalIdColumnValue}",		&nbsp;&nbsp;&nbsp;&nbsp;// 唯一识别病人（BAH, JKKH, SFZH），默认为“SFZH”<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"ValidOperRule": ${operSate.useValidOperRuleValue},			 	&nbsp;&nbsp;&nbsp;&nbsp;// 手术人次规则：		0：OperType IN (3, 4)	1: OperRate != 0<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"UseHospOperRate": ${operSate.useHospOperRateValue},		&nbsp;&nbsp;&nbsp;&nbsp;// 使用医院填写的手术等级，默认为false<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"UseAdditionalCode": ${cardInfoSate.useAdditionalCodeValue},		&nbsp;&nbsp;&nbsp;&nbsp;// 诊断编码是否使用附加码，默认为false<br/>&nbsp;&nbsp;
              },<br/>&nbsp;&nbsp;
          
              "HospHierarchy": {<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;"UseMultiHosps": ${hospSate.multiHospsValue},	&nbsp;&nbsp;&nbsp;&nbsp;// 是否包含分院，默认为true <br/>&nbsp;&nbsp;
                &nbsp;&nbsp;"UsePerfDept": ${usePerfDeptValue},	&nbsp;&nbsp;&nbsp;&nbsp;// 是否使用绩效科室，如果医院仅提供临床科室则设为false，默认为true<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;"UseMedTeam": ${medTeamSate.useMedTeamValue},	&nbsp;&nbsp;&nbsp;&nbsp; // 是否适用医疗组，默认为false<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;"MedTeamBelongToCliDept": ${medTeamSate.medTeamBelongToCliDeptValue},	&nbsp;&nbsp;&nbsp;&nbsp; 	    // 医疗组是否隶属于临床科室，默认为true<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;"IsDoctorJobNo": ${doctorSate.isDoctorJobNoValue},	&nbsp;&nbsp;&nbsp;&nbsp; 			    // 医生是否填的工号，默认为false<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;"ImportDoctorFromCard": ${doctorSate.importDoctorFromCardValue},	&nbsp;&nbsp;&nbsp;&nbsp;		    // 是否自动从病案数据中导入医生信息，默认为true<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;"WildcardText": "全部",	&nbsp;&nbsp;&nbsp;&nbsp;			    // 医院下拉框all的文字显示，默认为“全部”{<br/>&nbsp;&nbsp;
              },
              <br/>&nbsp;&nbsp;

              "Drgs": {<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;"DrgsVer2019UpgradeDate": "2016-01-01T00:00Z", 	&nbsp;&nbsp;&nbsp;&nbsp;// 2019版分组器启用时间（基于病案出院时间），默认时间2016-01-01 <br/>&nbsp;&nbsp;
                &nbsp;&nbsp;"UDGrpWS": {<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"Address": ${drgsAddress},	&nbsp;&nbsp;&nbsp;&nbsp;	// 部署DRGs分组器地址<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"AlternativeAddresses": [${alternativeAddStr}],&nbsp;&nbsp;&nbsp;&nbsp;	// 其它DRGs分组器地址，地址格式为数组，如["127.0.0.1","192.168.1.1","........"]<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"Concurrency": ${concurrency},		&nbsp;&nbsp;&nbsp;&nbsp; // 并发数，数值为DRGs分组器地址数量，至少为1<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;}<br/>&nbsp;&nbsp;
              },
              <br/>&nbsp;&nbsp;

              "DataImports": [  <br/>&nbsp;&nbsp;
                ${dataImports} <br/>&nbsp;&nbsp;
              ], <br/>&nbsp;&nbsp;
          
              "RwRanges": [<br/>&nbsp;&nbsp;
                ${rwRanges}
              ],
              <br/>&nbsp;&nbsp;

              "InsurTypes": [<br/>&nbsp;&nbsp;
                ${insurType}
              ]<br/>&nbsp;&nbsp;
            },
            <br/>&nbsp;&nbsp;
          
              "HardCodeArgs": [<br/>&nbsp;&nbsp;
              ],<br/>&nbsp;&nbsp;
          
            "ViewModelVisibility": {<br/>&nbsp;&nbsp;
            },<br/>&nbsp;&nbsp;
          
          
            "ClaimInvisible": {<br/>&nbsp;&nbsp;
              &nbsp;&nbsp;"Keywords": [<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"DataManipulation/Review/PrimaryOper",<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"Setting/OperRateSetting/Index",<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"DataManipulation/Review/UnpublishedCard",<br/>&nbsp;&nbsp;
                <br/>
                ${onlineDrgsCalStr}
                <br/>
                ${transferClaim}&nbsp;&nbsp;
                <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;//院方使用医保功能(尚未实现），请注释以下行<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"InsurReport/HospReport/PaySummary",<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"InsurReport/HospReport/DeptPaySummary",<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"DataQuery/Data/InsurDataCnt",<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"DataManipulation/InsurImport/Create",<br/>&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;"DataManipulation/InsurImport/Index",<br/>&nbsp;&nbsp;
                <br/>
                ${fakeInsurClaim}&nbsp;&nbsp;
                <br/>
                ${defaultSdClaim}&nbsp;&nbsp;
                <br/>
                ${metricsSdClaim}&nbsp;&nbsp;
                <br/>
                ${hospCompareClaim}&nbsp;&nbsp;
                <br/>
                ${dataByHospStr}
                <br/>
                &nbsp;&nbsp;]
            }
          }`;

    this.setState({
      activeKey: "1",
      privatesettingsContent: priJson,
      presentationsettingsContent: pttJson,
      businesssettingsContent: bsnJson,
    });

  }

  render() {
    let {
      onlineDrgsCalApiValue,
      onDataByHospValue,
      useCustomSdValue,
      useCombinedOperValue,
      useMetricsSdValue,
      usePerfDeptValue,
      useWardValue,
      fileImportStoredPathValue,
      presentationValue,

      privatesettingsContent,
      presentationsettingsContent,
      businesssettingsContent,
      activeKey,
    } = this.state

    return (
      <div>
        <Row gutter={20}>
          <Col xs={{ span:24 }} lg={{ span: 20, offset: 2 }} xl={{ span: 20, offset: 2 }} xxl={{ span: 20, offset: 2 }}>
            <div className="site-layout-content">
              <h2 className="title">Config 生成向导</h2>

              <div className="alert">
                <Alert
                  banner
                  type="error"
                  message={
                    <TextLoop mask>
                      <div>基本业务需求配置，需与商务部确认才可开放</div>
                    </TextLoop>
                  }
                />
              </div>
              <Timeline>
                <Timeline.Item>
                  <h4 className="item-title">前置分组器接口</h4>
                  <Radio.Group options={radioDecideList} onChange={this.onOnlineDrgsCalApiChange} value={onlineDrgsCalApiValue}>
                  </Radio.Group>
                </Timeline.Item>
                <Timeline.Item>
                  <h4 className="item-title">医保相关配置</h4>
                  <InsurMsg ref="insurMsg"></InsurMsg>
                </Timeline.Item>
                <Timeline.Item>
                  <h4 className="item-title">转科数据配置</h4>
                  <TransferSpecMsg ref="transferSpecMsg"></TransferSpecMsg>
                </Timeline.Item>
              </Timeline>

              <div className="alert">
                <Alert
                  banner
                  message={
                    <TextLoop mask>
                      <div>需与相关领导报备才可开放</div>
                    </TextLoop>
                  }
                />
              </div>
              <Timeline>
                {this.renderOnlineDrgsCalItem()}
                <Timeline.Item >
                  <h4 className="item-title">医院操作数据分组</h4>
                  <Radio.Group 
                  options={radioDecideList} 
                  onChange={this.onDataByHospChange} 
                  value={onDataByHospValue}>
                  </Radio.Group>
                </Timeline.Item>
              </Timeline>

              <div className="alert">
                <Alert
                  banner
                  type="info"
                  message={
                    <TextLoop mask>
                      <div>填写工单</div>
                    </TextLoop>
                  }
                />
              </div>
              <Timeline>
                <Timeline.Item >
                  <h4 className="item-title">自定义单病种</h4>
                  <Row gutter={20}>
                    <Col>
                      <Radio.Group
                        options={radioDecideList}
                        onChange={this.onUseCustomSdChange}
                        value={useCustomSdValue}>
                      </Radio.Group>
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col span={20}>
                      {this.renderUseCustomSdInput()}
                    </Col>
                  </Row>
                </Timeline.Item>
                <Timeline.Item >
                  <h4 className="item-title">联合手术</h4>
                  <Radio.Group 
                    options={radioDecideList} 
                    onChange={this.onUseCombinedOperChange} 
                    value={useCombinedOperValue}>
                  </Radio.Group>
                </Timeline.Item>
                <Timeline.Item >
                  <h4 className="item-title">其他自定义计算结果（如OE值，临床路径）</h4>
                </Timeline.Item>
                <Timeline.Item >
                  <h4 className="item-title">新增自定义上传数据字段</h4>
                </Timeline.Item>
              </Timeline>

              <div className="alert">
                <Alert
                  banner
                  type="info"
                  message={
                    <TextLoop mask>
                      <div>填写工单</div>
                    </TextLoop>
                  }
                />
              </div>
              <Timeline>
                <Timeline.Item >
                  <h4 className="item-title">自定义报表</h4>
                </Timeline.Item>
                <Timeline.Item >
                  <h4 className="item-title">自定义明细</h4>
                </Timeline.Item>
                <Timeline.Item >
                  <h4 className="item-title">导出报表/明细字段配置</h4>
                </Timeline.Item>
                <Timeline.Item >
                  <h4 className="item-title">三级公立医院绩效考核单病种</h4>
                  <Radio.Group
                    options={radioDecideList}
                    onChange={this.onUseMetricsSdChange}
                    value={useMetricsSdValue}>
                  </Radio.Group>
                </Timeline.Item>
                <Timeline.Item >
                  <h4 className="item-title">标杆值</h4>
                </Timeline.Item>
              </Timeline>

              <div className="alert">
                <Alert
                  banner
                  type="success"
                  message={
                    <TextLoop mask>
                      <div>基础配置</div>
                    </TextLoop>
                  }
                />
              </div>

              <Timeline>
                <Timeline.Item dot={<InfoCircleOutlined style={{ fontSize: '16px' }} />}>
                  <h4 className="item-title">医院配置</h4>
                  <HospMsg ref="hospMsg"></HospMsg>
                </Timeline.Item>

                <Timeline.Item>
                  <h4 className="item-title">是否使用绩效科室</h4>
                  <Radio.Group options={radioDecideList} onChange={this.onUsePerfDeptChange} value={usePerfDeptValue}>
                  </Radio.Group>
                </Timeline.Item>

                <Timeline.Item >
                  <h4 className="item-title">是否使用病区</h4>
                  <Radio.Group options={radioDecideList} onChange={this.onUseWardChange} value={useWardValue}>
                  </Radio.Group>
                </Timeline.Item>

                <Timeline.Item dot={<InfoCircleOutlined style={{ fontSize: '16px' }} />}>
                  <h4 className="item-title">医疗组配置</h4>
                  <MedTeamMsg ref="medTeamMsg"></MedTeamMsg>
                </Timeline.Item>

                <Timeline.Item dot={<InfoCircleOutlined style={{ fontSize: '16px' }} />}>
                  <h4 className="item-title">医生配置</h4>
                  <DoctorMsg ref="doctorMsg"></DoctorMsg>
                </Timeline.Item>

                <Timeline.Item dot={<InfoCircleOutlined style={{ fontSize: '16px' }} />}>
                  <h4 className="item-title">手术配置</h4>
                  <OperMsg ref="operMsg"></OperMsg>
                </Timeline.Item>

                <Timeline.Item dot={<InfoCircleOutlined style={{ fontSize: '16px' }} />}>
                  <h4 className="item-title">RwRanges配置（上界取”9999”表示最大值）</h4>
                  <RwRangeMsg ref="rwRangeMsg"></RwRangeMsg>
                </Timeline.Item>

                <Timeline.Item dot={<InfoCircleOutlined style={{ fontSize: '16px' }} />}>
                  <h4 className="item-title">病案数据配置</h4>
                  <CardInfoMsg ref="cardInfoMsg"></CardInfoMsg>
                </Timeline.Item>

                <Timeline.Item dot={<InfoCircleOutlined style={{ fontSize: '16px' }} />}>
                  <h4 className="item-title">单病种配置</h4>
                  <SdMsg ref="sdMsg"></SdMsg>
                </Timeline.Item>

                <Timeline.Item dot={<InfoCircleOutlined style={{ fontSize: '16px' }} />}>
                  <h4 className="item-title">分组器配置</h4>
                  <DrgsMsg ref="drgsMsg"></DrgsMsg>
                </Timeline.Item>

                <Timeline.Item dot={<InfoCircleOutlined style={{ fontSize: '16px' }} />}>
                  <h4 className="item-title">数据上传配置</h4>
                  <Row gutter={20}>
                    <Col>
                      上传数据保存路径
                    </Col>
                    <Col span={16}>
                      <Input
                        placeholder='请输入上传数据存储路径，如："D:\\Unionnet\\upload"'
                        allowClear
                        suffix={
                          <Tooltip placement="right" title='请输入上传数据存储路径，如："D:\\Unionnet\\upload"'>
                            <InfoCircleOutlined className="suffixColor" />
                          </Tooltip>
                        }
                        value={fileImportStoredPathValue}
                        onChange={this.onFileImportStoredPathChange} />
                    </Col>
                  </Row>
                </Timeline.Item>

                {/* <Timeline.Item dot={<InfoCircleOutlined style={{ fontSize: '16px' }} />}>
                  <h4 className="item-title">数据库配置</h4>
                  <SqlExecutorMsg ref="sqlExecutorMsg"></SqlExecutorMsg>
                </Timeline.Item> */}

                <Timeline.Item>
                  <h4 className="item-title">是否导出完整病案明细</h4>
                  <Radio.Group onChange={this.onPresentationChange} value={presentationValue}>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </Radio.Group>
                </Timeline.Item>

                <Timeline.Item>
                  <Button type="primary" icon={<ContainerOutlined />} onClick={this.onClick}>
                    生成配置文件
                  </Button>
                </Timeline.Item>
              </Timeline>
            </div>
          </Col>
          <Col xs={{ span:24 }} lg={{ span: 20, offset: 2 }} xl={{ span: 20, offset: 2 }} xxl={{ span: 20, offset: 2 }}>
            <div className="site-layout-content">
              <h2 className="title">Config 文件生成</h2>
              <Collapse
                accordion
                bordered={false}
                activeKey={[activeKey]}
                onChange={this.onCollapseChange}
              >
                <Panel header="privatesettings.json" key="1">
                  <div dangerouslySetInnerHTML={{ __html: privatesettingsContent }} />
                </Panel>
                <Panel header="presentationsettings.json" key="2">
                  <div dangerouslySetInnerHTML={{ __html: presentationsettingsContent }} />
                </Panel>
                <Panel header="businesssettings.json" key="3">
                  <div dangerouslySetInnerHTML={{ __html: businesssettingsContent }} />
                </Panel>
              </Collapse>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}