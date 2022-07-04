const XLSX = require("xlsx");
/**
 * 获取导入的XLSX文件中的数据
 * @param {object} file 请求中的文件对象，如：ctx.request.files[0]
 * @param {string} headerKeyMap 表头-key转换对象，如 { 姓名: 'name', 邮箱 :'email' }
 * @param {string} rwoTransform 行数据转换函数，比如：将字符串 'a,b,c' 转为 ['a', 'b', 'c'];
 */
module.exports = {
  getImportXLSXData(file, headerKeyMap, rwoTransform) {
    const { filepath } = file;
    const workbook = XLSX.readFile(filepath);
    // 读取内容
    let exceldata = [];
    workbook.SheetNames.forEach((sheet) => {
      if (workbook.Sheets.hasOwnProperty(sheet)) {
        const data = XLSX.utils
          .sheet_to_json(workbook.Sheets[sheet])
          .map((row) => {
            const obj = {};
            Object.keys(headerKeyMap).forEach((key) => {
              obj[headerKeyMap[key]] = row[key];
            });
            return rwoTransform(obj);
          });
        exceldata = [...exceldata, ...data];
      }
    });
    return exceldata;
  },
  exportXLSX(fileName, sheetName, header, data) {
    // 生成workbook
    const workbook = XLSX.utils.book_new();
    // 插入表头
    const headerData = [header, ...data];
    // 生成worksheet
    const worksheet = XLSX.utils.json_to_sheet(headerData, {
      skipHeader: true,
    });
    // 组装
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    // 返回数据流
    // @ts-ignore
    this.ctx.set("Content-Type", "application/vnd.openxmlformats");
    // @ts-ignore
    this.ctx.set(
      "Content-Disposition",
      "attachment;filename*=UTF-8' '" + encodeURIComponent(fileName) + ".xls"
    );
    // @ts-ignore
    this.ctx.body = XLSX.write(workbook, {
      bookType: "xls",
      type: "buffer",
    });
  },
};
