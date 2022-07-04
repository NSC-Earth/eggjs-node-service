"use strict";
const { Controller } = require("egg");

class BaseController extends Controller {
  success(data, msg) {
    this.ctx.body = { status: 200, data, msg };
  }
  notFound(msg) {
    this.ctx.throw(404, msg || "not found");
  }
}

module.exports = BaseController;
