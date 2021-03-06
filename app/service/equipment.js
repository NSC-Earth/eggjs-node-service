"use strict";

const Service = require("egg").Service;

class Equipment extends Service {
  async increaseEquipment(data) {
    const sql = `insert ignore into physical_equipment (
        physicalID,
        objectText,
        technicalObjectType,
        projectCode,
        projectDescription,
        WBSCode,
        WBSDescription,
        singleEngineeringCode,
        singleEngineeringDescription,
        materialDescription,
        supplierCode,
        materialGroup,
        materialNumber,
        number,
        factoryName,
        supplierName,
        deviceIdentifier,
        deviceDescription,
        factory,
        writeDate,
        contract,
        projectNumbe,
        writeTime,
        purchaseNumber,
        tenderScheme,
        statusCode,
        statusDescription,
        deviceType,
        deviceTypeDescription,
        submissionTime,
        inventoryLocation,
        inventoryLocationDescription,
        batchNumber
        ) values ?`;
    return await this.app.mysql.query(sql, [data]);
  }
  async getEquipment(data) {
    const sql = `select * from physical_equipment`;
    return await this.app.mysql.query(sql);
  }
  async exportEquipment(data) {
    const sql = `select * from physical_equipment`;
    return await this.app.mysql.query(sql);
  }
  async fileList(data) {
    const sql = `select * from file_list`;
    return await this.app.mysql.query(sql);
  }
  async fileData(data) {
    const sql = `select * from file_list where nodeTitle='${data.nodeTitle}'`;
    return await this.app.mysql.query(sql);
  }
  async filePreviewUrl(data) {
    const sql = `select * from file_list where nodeTitle='${data.nodeTitle}'`;
    return await this.app.mysql.query(sql);
  }
  async increaseFile(data, filedata) {
    const sql = `INSERT INTO file_list (filename,type,nodeTitle) VALUES 
    ('${data.filename}',
    '${data.filename.substring(data.filename.lastIndexOf(".") + 1)}',
    '${filedata.nodeTitle}')`;
    return await this.app.mysql.query(sql);
  }
}
module.exports = Equipment;
