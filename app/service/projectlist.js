"use strict";

const Service = require("egg").Service;

class ProjectList extends Service {
  //测试user列表
  async getUserList() {
    //获取用户信息列表
    const sql = `select * from user`;
    return await this.app.mysql.query(sql);
  }

  async deleteUser(id) {
    const sql = `DELETE FROM user WHERE id=${id}`;
    return await this.app.mysql.query(sql);
  }

  async increaseUser(data) {
    const sql = `INSERT INTO user (id,name,sex,user) VALUES ('${data.id}','${data.name}','${data.sex}','${data.user}')`;
    return await this.app.mysql.query(sql);
  }

  async updataUser(data) {
    const sql = `update user set name=${data.name} where id=${data.id}`;
    return await this.app.mysql.query(sql);
  }

  async getCatalogType(data) {
    const sql = `select * from pdc_project_catalog where catalog_type='${data.catalog}' and service_type='${data.type}'`;
    const sql2 = `select * from pdc_project_file where single_project_id='${data.project_id}'`;
    let list = await this.app.mysql.query(sql);
    let file = await this.app.mysql.query(sql2);
    let arr = this.getfileTreeData(list);
    let fileList = this.getfileTreeData(file);
    arr.forEach((item, index) => {
      let v = fileList.filter((info) => info.project_catalog_id === item.id);
      v.map((j, i) => {
        item.children.push(j);
      });
    });
    return arr;
  }

  //处理数据为树结构
  getfileTreeData(list) {
    let array = [];
    list.forEach((item) => {
      item.name = item.name || item.file_name;
      item.children = list.filter((info) => info.pid === item.id);
      if (item.pid == "0") {
        array.push(item);
      }
    });
    return array;
  }
}
module.exports = ProjectList;
