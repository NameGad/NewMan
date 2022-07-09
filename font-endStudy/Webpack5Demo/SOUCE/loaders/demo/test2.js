module.exports = function(content, map, meta) {
    // 异步必须调用async()
    const callback = this.async();

    setTimeout(()=>{
        console.log('test2');
        callback(null, content,map, meta);
    }, 1000);
}