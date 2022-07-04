"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/user", controller.projecttree.index);
  router.post("/deleteUser", controller.projecttree.deleteUserById);
  router.post("/increaseUser", controller.projecttree.increaseUserData);
  router.post("/updataUser", controller.projecttree.updataUserById);
  router.get(
    "/getFileStructure",
    app.middleware.slow({ threshold: 1 }),
    controller.projecttree.getCatalogTypeList
  );
  router.post("/uploadfile", controller.uploadfile.upload);
  router.post("/uploadOSS", controller.uploadfile.uploadOSS);
  router.get("/getEquipment", controller.uploadfile.getPhysicalEquipment);
  router.get("/exportEquipment", controller.uploadfile.exportPhysicalEquipment);
  router.get("/getFileList", controller.uploadfile.getFileList);
};
