// raw loader接受到content是Buffer数据
module.exports = function(content){
    console.log(content);
    return content;
}

module.exports.raw = true;