export const formatTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 补零
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const onLogin = userData => {
    const now = new Date();

    // wx.setStorage({
    //     key: 'userInfo', 
    //     data: {
    //         ...userData,
    //         createTime: formatTime(now)
    //     }, 
    //     success: () => {
    //         console.log('存储成功');
    //     },
    //     fail: (err) => {
    //         console.error('存储失败', err);
    //     }
    // });

    try {
        wx.setStorageSync('userInfo', {
            ...userData,
            createTime: formatTime(now)
        })
    } catch (e) {
        console.error('存储失败', e);
    }
}