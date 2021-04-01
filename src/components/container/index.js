/** 自动化工程*/
// 声明组建对象
const components = []
// 获取组建
const files = require.context('../../views',true,/\.js$/);   // 1、倒入路径 2、是否查找子目录文件 3、 指定查找的文件
//循环文件
files.keys().map((item) => {
    // 过滤index,login
  if (item.includes('./index/') || item.includes('./login/')) {
    return false
  }
    // 分割字符串
  const splitFilesName = item.split('.');
  const jsonObj = {};
    //path
  const path = `/index${splitFilesName[1].toLowerCase()}`;
    //componet
  const component = files(item).default;
    //   写入对象
  jsonObj.path = path;
  jsonObj.component = component;
  components.push(jsonObj)
  return '';
})
export default components