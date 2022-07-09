const schema = require("./schema.json");
// 不能用ES6语法
module.exports = function(content){
    // schema对options的验证规则
    // schema对JSON Schema的规则
    const options = this.getOptions(schema); 

    const prefix = `
        /*
        * Author: ${options.author}
        */
    `;

    return prefix + content;
};

// const schema = require("./schema.json");

// module.exports = function (content) {
//   // 获取loader的options，同时对options内容进行校验
//   // schema是options的校验规则（符合 JSON schema 规则）
//   const options = this.getOptions(schema);

//   const prefix = `
//     /*
//     * Author: ${options.author}
//     */
//   `;

// //   return `${prefix} \n ${content}`;
// return prefix + content;
// };