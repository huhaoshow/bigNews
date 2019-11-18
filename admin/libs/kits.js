/*
    v1.0.1
    Date:2019.11.18;
*/
; (function (w) {
    const kits = new Object();
    // 最小值
    kits.min = function () {
        let min = arguments[0];
        for (let i = 1; i < arguments.length; i++) {
            if (min > arguments[i]) min = arguments[i];
        }
        return min;
    }

    //最大值
    kits.max = function () {
        let max = arguments[0];
        for (let i = 1; i < arguments.length; i++) {
            if (max < arguments[i]) max = arguments[i];
        }
        return max;
    }

    // 一组数的求和
    kits.add = function () {
        let total = 0;
        for (let i = 0; i < arguments.length; i++) {
            total += arguments[i];
        }
        return total;
    }

    // 生成n~m随机数
    kits.randomInt = function (min = 3, max = 6) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // 生成rgb随机颜色
    kits.randomRGBColor = function () {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    // 生成16进制随机颜色
    kits.randomHexColor = function () {
        let HexNum = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E'];
        let Hex = '#';
        for (let i = 1; i <= 6; i++) {
            Hex += HexNum[Math.floor(Math.random() * HexNum.length)];
        }
        return Hex;
    }

    // 日期格式化
    kits.formatDate = function () {
        let now = new Date();
        let yyyy = now.getFullYear();
        let mm = now.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let dd = now.getDate();
        if (dd < 10) dd = '0' + dd;
        return yyyy + '-' + mm + '-' + dd;
    }

    // 时间格式化
    kits.formatTime = function () {
        let now = new Date;
        let HH = now.getHours();
        if (HH < 10) HH = "0" + HH;
        let MM = now.getMinutes();
        if (MM < 10) MM = "0" + MM;
        let SS = now.getSeconds();
        if (SS < 10) SS = "0" + SS;
        return HH + '-' + MM + '-' + SS;
    }

    //小于10补0
    kits.zero = function (num = 0) {
        if (num < 10) {
            return '0' + num;
        }
        else {
            return num;
        }
    }

    // 冒泡排序
    kits.arraySort = function () {
        let t;
        for (let i = 0; i < arguments.length; i++) {
            for (let j = i; j < arguments.length; j++) {
                if (+arguments[i] > +arguments[j + 1]) {
                    t = arguments[i];
                    arguments[i] = arguments[j + 1];
                    arguments[j + 1] = t;
                }
            }
        }
        return arguments;
    }

    // ajax

    // 对象转字符串
    kits.obj2str = function (obj) {
        let str = '';
        for (let key in obj) {
            // key的数据类型是String,所以需要用obj['属性名']来调用属性值
            str += key + '=' + obj[key] + '&';
        }
        return str.slice(0, -1);
    }

    // 字符串转对象
    kits.str2obj = function (str) {
        let obj = {};
        let arr = str.split('&');
        arr.forEach(function (item) {
            let temp = item.split('=');
            // temp[0]的数据类型是字符串,所以需要用obj['属性名'] = '属性值'的写法来设置
            obj[temp[0]] = temp[1];
        })
        return obj;
    }

    // ajax请求数据
    kits.ajax = function (ajaxObj) {
        // 将参数以对象的形式传入,并定义参数默认值,避免参数未定义的情况报错
        let type = ajaxObj.type || 'get';
        let url = ajaxObj.url || '';
        let data = ajaxObj.data || {};
        let dataType = ajaxObj.dataType || 'json';
        let success = ajaxObj.success || function () { console.log('小憨憨,你都都没有处理函数') };
        // 将对象格式的data转化成字符串格式
        data = kits.obj2str(data);
        // 给type和dataType自动转换成小写
        type = type.toLowerCase();
        dataType = dataType.toLowerCase();
        // 1.创建一个异步对象
        const xhr = new XMLHttpRequest();
        // 2.初始化
        if (type === 'get' && data) {
            url += '?' + data;
        }
        xhr.open(type, url);
        // 3.判断是否需要请求头
        if (type === 'post') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        // 4.监听响应
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                let res;
                if (dataType === 'json') {
                    res = JSON.parse(xhr.responseText);
                }
                else if (dataType === 'xml') {
                    res = xhr.responseXML
                } else {
                    res = '小憨憨,你的数据类型不对哦!'
                }
                success(res);
            }
        }
        // 5.发送数据
        if (type === 'get') {
            xhr.send(null);
        }
        if (type === 'post') {
            xhr.send(data);
        }
    }

    // get方式请求数据
    kits.get = function (ajaxObj) {
        // 将参数以对象的形式传入,并定义参数默认值,避免参数未定义的情况报错
        let url = ajaxObj.url || '';
        let data = ajaxObj.data || {};
        let dataType = ajaxObj.dataType || 'json';
        let success = ajaxObj.success || function () { console.log('小憨憨,你都都没有处理函数') };
        // 将对象格式的data转化成字符串格式
        data = kits.obj2str(data);
        // 给dataType自动转换成小写
        dataType = dataType.toLowerCase();
        // 1.创建一个异步对象
        const xhr = new XMLHttpRequest();
        // 2.初始化
        if (data) {
            url += '?' + data;
        }
        xhr.open('get', url);
        // 3.监听响应
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                let res;
                if (dataType === 'json') {
                    res = JSON.parse(xhr.responseText);
                }
                else if (dataType === 'xml') {
                    res = xhr.responseXML
                } else {
                    res = '小憨憨,你的数据类型不对哦!'
                }
                success(res);
            }
        }
        // 5.发送数据
        xhr.send(null);
    }

    // post请求方式
    kits.post = function (ajaxObj) {
        // 将参数以对象的形式传入,并定义参数默认值,避免参数未定义的情况报错
        let url = ajaxObj.url || '';
        let data = ajaxObj.data || {};
        let dataType = ajaxObj.dataType || 'json';
        let success = ajaxObj.success || function () { console.log('小憨憨,你都都没有处理函数') };
        // 将对象格式的data转化成字符串格式
        data = kits.obj2str(data);
        // 给dataType自动转换成小写
        dataType = dataType.toLowerCase();
        // 1.创建一个异步对象
        const xhr = new XMLHttpRequest();
        // 2.初始化
        xhr.open('post', url);
        // 3.设置请求头
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // 4.监听响应
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                let res;
                if (dataType === 'json') {
                    res = JSON.parse(xhr.responseText);
                }
                else if (dataType === 'xml') {
                    res = xhr.responseXML
                } else {
                    res = '小憨憨,你的数据类型不对哦!'
                }
                success(res);
            }
        }
        // 5.发送请求数据
        xhr.send(data);
    }
    w.kits = kits;
})(window)