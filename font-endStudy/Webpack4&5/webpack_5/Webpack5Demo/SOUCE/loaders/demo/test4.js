module.exports = function(content) {
    console.log('normal loader 4');
    return content;
}
// 加了pitch会优先执行
module.exports.pitch = function(content) {
    console.log('pitch loader 4');
}