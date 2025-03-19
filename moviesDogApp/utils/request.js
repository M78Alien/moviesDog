// export const BaseURL = 'http://192.168.3.3:8080'
export const BaseURL = 'http://8.138.199.128:8772'

export const request = (url, methodType, data) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${BaseURL}${url}`,
            method: methodType,
            data: data,
            header: {
                'content-type': 'application/json' // 请求头
            },
            timeout: 10000,
            success: (result) => {
                // console.log('请求成功:', result);
                // console.log('返回数据:', result.data);
                resolve(result.data); // 将请求结果传递给 resolve
            },
            fail: (err) => {
                // console.log('请求失败:', err);
                // console.log('错误信息:', err.errMsg);
                // console.log('状态码:', err.statusCode);
                reject(err); // 将错误信息传递给 reject
            },
            complete: (res) => {
                // console.log('请求完成:', res);
            }
        });
    });
}