"use strict";

const Controller = require("../core/base_controller");

class ProjectTree extends Controller {
  async index() {
    const { ctx, app } = this;
    // 根据id查询用户信息
    let info = await ctx.service.projectlist.getUserList();
    this.success(info, "数据获取成功");
  }

  // 根据id删除用户信息
  async deleteUserById() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    let info = await ctx.service.projectlist.deleteUser(data.id);
    if (info.affectedRows === 1) {
      this.success(null, "数据获取成功");
    } else {
      this.notFound("数据删除失败");
    }
  }

  // 增加用户信息
  async increaseUserData() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    let info = await ctx.service.projectlist.increaseUser(data);
    if (info.affectedRows === 1) {
      this.success(null, "数据增加成功");
    } else {
      this.notFound("数据增加失败");
    }
  }

  // 修改用户信息
  async updataUserById() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    let info = await ctx.service.projectlist.updataUser(data);
    if (info.affectedRows === 1) {
      this.success(null, "数据修改成功");
    } else {
      this.notFound("数据修改失败");
    }
  }

  // 获取文档树结构
  async getCatalogTypeList() {
    const { ctx, app } = this;
    const v = ctx.request.query;
    console.log(v);
    const data = {
      catalog: "8",
      type: "1",
      project_id: v.projectId,
    };
    let info = await ctx.service.projectlist.getCatalogType(data);
    this.success(info, "数据获取成功");
  }
}

module.exports = ProjectTree;
