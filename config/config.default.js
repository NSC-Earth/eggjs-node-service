/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1655696201636_1317";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.multipart = {
    fileSize: "50mb", // 文件大小
    mode: "file", // 文件模式
    whitelist: [
      ".et",
      ".xls",
      ".xlt",
      ".xlsx",
      ".xlsm",
      ".xltx",
      ".xltm",
      ".csv",
      ".doc",
      ".docx",
      ".txt",
      ".dot",
      ".wps",
      ".wpt",
      ".dotx",
      ".docm",
      ".dotm",
      ".rtf",
      ".ppt",
      ".pptx",
      ".pptm",
      ".ppsx",
      ".ppsm",
      ".pps",
      ".potx",
      ".potm",
      ".dpt",
      ".dps",
      ".pdf",
      ".PDF",
    ], // 文件类型白名单
  };

  //mysql数据连接
  config.mysql = {
    client: {
      host: "localhost", // 数据库host
      port: "3306", // 连接端口
      user: "root", // root
      password: "test123456", // 数据库密码
      database: "file_table", // 数据库名称
    },
    app: true,
    agent: false,
  };

  // oss存储
  config.oss = {
    client: {
      accessKeyId: "",//oss秘钥id
      accessKeySecret: "",//oss秘钥
      bucket: "",
      endpoint: "",
      timeout: "60s",
    },
  };

  //解决跨域问题
  config.cors = {
    origin: "*", //域名+端口 或者  *(全匹配)
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };

  config.security = {
    //关闭post请求不带token报错
    csrf: {
      enable: false,
    },
    domainWhiteList: [], // 跨域白名单
  };

  return {
    ...config,
    ...userConfig,
  };
};
