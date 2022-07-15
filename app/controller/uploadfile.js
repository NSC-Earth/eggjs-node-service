"use strict";

const Controller = require("../core/base_controller");
const _ = require("lodash");

class uploadFile extends Controller {
  async upload() {
    const { ctx, app } = this;
    const file = ctx.request.files[0];
    console.log(file);
    const headerMap = {
      实物ID: "physicalID",
      对象文本文本: "objectText",
      技术对象类型: "technicalObjectType",
      项目编码: "projectCode",
      项目描述: "projectDescription",
      WBS编码: "WBSCode",
      WBS描述: "WBSDescription",
      单体工程编码: "singleEngineeringCode",
      单体工程描述: "singleEngineeringDescription",
      物资描述: "materialDescription",
      供应商编码: "supplierCode",
      物资组: "materialGroup",
      物资号码: "materialNumber",
      数量: "number",
      工厂名称: "factoryName",
      供应商名称: "supplierName",
      "设备标识(主设备:X)": "deviceIdentifier",
      设备标识描述: "deviceDescription",
      工厂: "factory",
      写入日期: "writeDate",
      合同编号: "contract",
      电子商务合同行项目号: "projectNumbe",
      写入时间: "writeTime",
      采购结果序列号: "purchaseNumber",
      招标计划编号: "tenderScheme",
      填报状态代码: "statusCode",
      填报状态描述: "statusDescription",
      设备类型: "deviceType",
      设备类型描述: "deviceTypeDescription",
      提报时间: "submissionTime",
      库存地点: "inventoryLocation",
      仓储地点的描述: "inventoryLocationDescription",
      批号: "batchNumber",
    };
    const rowTransform = (row) => ({ ...row });
    const userData = ctx.helper.getImportXLSXData(
      file,
      headerMap,
      rowTransform
    );
    let list = [];
    userData.forEach((items, index) => {
      let v = [];
      for (let key in items) {
        v.push(items[key]);
      }
      list[index] = v;
    });
    let info = await ctx.service.equipment.increaseEquipment(list);
    if (info.affectedRows >= 0) {
      this.success(null, "文件上传成功");
    } else {
      this.notFound("文件上传失败");
    }
  }

  //上传到阿里oss
  async uploadOSS() {
    const { ctx, app } = this;
    const file = ctx.request.files;
    const data = ctx.request.body;
    console.log(file);
    for (let index = 0; index < file.length; index++) {
      let name = file[index].filename;
      const filename = "ProjectModel/" + name;
      await ctx.oss.put(filename, file[index].filepath);
      await ctx.service.equipment.increaseFile(file[index], data);
    }
    this.success(null, "上传文件成功");
  }

  async getPhysicalEquipment() {
    const { ctx, app } = this;
    let info = await ctx.service.equipment.getEquipment();
    this.success(info, "获取数据成功");
  }

  async getFileList() {
    const { ctx, app } = this;
    let info = await ctx.service.equipment.fileList();
    this.success(info, "获取数据成功");
  }

  async getFileData() {
    const { ctx, app } = this;
    const v = ctx.request.query;
    let info = await ctx.service.equipment.fileData(v);
    if (info.length > 0) {
      info.map((items, index) => {
        const filename = "ProjectModel/" + items.filename;
        info[index]["fileUrl"] = ctx.oss.signatureUrl(filename, {
          expires: 1800,
          process: "imm/previewdoc,copy_1",
        });
      });
      this.success(info, "数据获取成功");
    } else {
      this.success(null, "nodeTitle错误");
    }
  }

  async getFilePreviewUrl() {
    const { ctx, app } = this;
    const v = ctx.request.query;
    const filename = "ProjectModel/" + v.filename;
    const signUrl = ctx.oss.signatureUrl(filename, {
      expires: 1800,
      process: "imm/previewdoc,copy_1",
    });
    console.log(signUrl);
    this.success(signUrl, "数据获取成功");
  }

  //导出表格
  async exportPhysicalEquipment() {
    const { ctx, app } = this;
    let info = await ctx.service.equipment.exportEquipment();
    // 查询结果为0时直接返回
    if (info.total === 0) {
      this.success(info, "获取数据成功");
      return;
    }

    // 表头
    const header = {
      physicalID: "实物ID",
      objectText: "对象文本文本",
      technicalObjectType: "技术对象类型",
      projectCode: "项目编码",
      projectDescription: "项目描述",
      WBSCode: "WBS编码",
      WBSDescription: "WBS描述",
      singleEngineeringCode: "单体工程编码",
      singleEngineeringDescription: "单体工程描述",
      materialDescription: "物资描述:",
      supplierCode: "供应商编码:",
      materialGroup: "物资组",
      materialNumber: "物资号码",
      number: "数量",
      factoryName: "工厂名称",
      supplierName: "供应商名称:",
      deviceIdentifier: "设备标识(主设备:X)",
      deviceDescription: "设备标识描述:",
      factory: "工厂:",
      writeDate: "写入日期",
      contract: "合同编号",
      projectNumbe: "电子商务合同行项目号",
      writeTime: "写入时间:",
      purchaseNumber: "采购结果序列号",
      tenderScheme: "招标计划编号",
      statusCode: "填报状态代码:",
      statusDescription: "填报状态描述",
      deviceType: "设备类型",
      deviceTypeDescription: "设备类型描述:",
      submissionTime: "提报时间",
      inventoryLocation: "库存地点",
      inventoryLocationDescription: "仓储地点的描述",
      batchNumber: "批号:",
    };

    // 生成数据
    const data = info.map((i) => {
      const item = _.pick(i, [
        "physicalID",
        "objectText",
        "technicalObjectType",
        "projectCode",
        "projectDescription",
        "WBSCode",
        "WBSDescription",
        "singleEngineeringCode",
        "singleEngineeringDescription",
        "materialDescription",
        "supplierCode",
        "materialGroup",
        "materialNumber",
        "number",
        "factoryName",
        "supplierName",
        "deviceIdentifier",
        "deviceDescription",
        "factory",
        "writeDate",
        "contract",
        "projectNumbe",
        "writeTime",
        "purchaseNumber",
        "tenderScheme",
        "statusCode",
        "statusDescription",
        "deviceType",
        "deviceTypeDescription",
        "submissionTime",
        "inventoryLocation",
        "inventoryLocationDescription",
        "batchNumber",
      ]);
      return {
        ...item,
        // userGroups: item.userGroups.join(","),
      };
    });

    // 导出excel
    ctx.helper.exportXLSX("设备实物ID", "设备实物ID", header, data);
  }
}

module.exports = uploadFile;
