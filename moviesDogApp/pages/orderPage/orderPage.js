// pages/orderPage/orderPage.js
import { getMovieDetailApi, getRoomDetail, addOrder, addCommentToOrder, getOrderDetail } from '../../apis/api'
import { typeConverse } from '../../utils/converse'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        item: '',
        status: '', // 0:未支付；1:未到观影时间; 2:观影未评价; 3:观影已评价; 4:未观影已评价
        orderTime: '',
        rateValue: '0',
        commentText: '',
        payShow: false,
        payMoney: '',
        movieItem: '',
        userMsg: null,
        roomMsg: null,
        finalPrice: 0,
    },

    rateChange(e) {
        this.setData({
            rateValue: e.detail * 2
        })
    },

    commentChange(e) {
        // console.log(e.detail.value);
        this.setData({
            commentText: e.detail.value
        })
    },

    async getComment() {
        if (this.data.rateValue === '0') {
            wx.showToast({
              title: '还没有给评分',
              icon: 'none'
            })
        } else if (this.data.commentText === '') {
            wx.showToast({
                title: '还没有给评论',
                icon: 'none'
            })
        } else {
            console.log(this.data.rateValue, this.data.commentText);
            this.setData({
                status: '3'
            })
            wx.showToast({
                title: '评论成功',
                icon: 'none'
            })
            const response = await addCommentToOrder(this.data.item.item.id, this.data.rateValue, this.data.commentText)
            console.log(response);
        }
    },

    toPay() {
        // console.log(1233);
        const _this = this
        _this.setData({payShow: !_this.data.payShow})
        let money = _this.data.item.caseItem.length * _this.data.item.item.price
        _this.setData({payMoney: money.toFixed(2)})
    },

    async touchPay() {
        const _this = this
        _this.setData({payShow: false})
        const response = await addOrder({
            'userId': _this.data.userMsg.id,
            'userName': _this.data.userMsg.name,
            'movieId': _this.data.item.item.movieId,
            'movieName': _this.data.item.item.movieName,
            'cinemaId': _this.data.item.item.cinemaId,
            'cinemaName': _this.data.item.item.cinemaName,
            'roomId': _this.data.item.item.roomId,
            'roomName': _this.data.item.item.roomName,
            'showcaseId': _this.data.item.item.id,
            'showcaseName': _this.data.item.item.showcaseName,
            'placeList': JSON.stringify(_this.data.item.caseItem),
            'price': _this.data.payMoney,
            'createTime': _this.modeTime(_this.data.item.time),
            'status': 2,
            'isDelete': 0
        })
        console.log(response);
        if (response?.error) {
            wx.showToast({
              title: '支付失败',
              icon: 'error'
            })
        } else {
            wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 1500
              })
            setTimeout(() => {
                wx.reLaunch({
                    url: '/pages/userPage/userPage',
                })
            }, 800)
        }
    },

    // 时间转换
    converseTime(time) {
        var utcDate = new Date(time);
        var utcYear = utcDate.getUTCFullYear();
        var utcMonth = utcDate.getUTCMonth() + 1; // 月份从 0 开始，需要加 1
        var utcDay = utcDate.getUTCDate();
        var utcHours = utcDate.getUTCHours();
        var utcMinutes = utcDate.getUTCMinutes();
        var utcSeconds = utcDate.getUTCSeconds();
        var beijingHours = utcHours + 8;
        if (beijingHours >= 24) {
            beijingHours -= 24; 
            utcDay += 1; 
        }
        var formattedDate = `${utcYear}年${String(utcMonth).padStart(2, '0')}月${String(utcDay).padStart(2, '0')}日 ${String(beijingHours).padStart(2, '0')}:${String(utcMinutes).padStart(2, '0')}:${String(utcSeconds).padStart(2, '0')}`;
        // console.log(formattedDate); 
        return formattedDate
    },
    // 时间标准化
    modeTime(time){
        let dateStr = time;
        let year = dateStr.substring(0, 4);
        let month = dateStr.substring(5, 7);
        let day = dateStr.substring(8, 10);
        let hours = dateStr.substring(12, 14);
        let minutes = dateStr.substring(15, 17);
        let seconds = dateStr.substring(18, 20);
        let milliseconds = "000";
        let timezone = "+08:00";
        let formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezone}`;
        return formattedDate
    },

    // 获取用户详细
    getUserInfo() {
        const _this = this
        wx.getStorage({
            key: 'userInfo',
            success: (res) => {
                const data = res.data; // 读取到的数据
                // console.log(data);
                _this.setData({
                    userMsg: data
                })
            },
            fail: (err) => {
                console.log('读取失败', err);
            }
        });
    },
    // 获取详细信息
    async getDetail() {
        const _this = this
        const response = await getMovieDetailApi(_this.data.item.item.movieId)
        const response1 = await getRoomDetail(_this.data.item.item.roomId)     
        const response2 = await getOrderDetail(_this.data.item.item.id)
        // console.log(response2.data.comment);   
        _this.setData({ 
            movieItem: {
                ...response.data,
                'pictureList': response.data.pictureList.split(','),
                'type': typeConverse(response.data.type.split(','))
            },
            roomMsg: response1.data,
            rateValue: response2.data?.rate ? response2.data.rate : 0,
            commentText: response2.data?.comment ? response2.data.comment : ''
        })
        _this.getUserInfo()
        _this.setData({finalPrice: (_this.data.item.caseItem.length * _this.data.item.item.price).toFixed(2)})
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const _this = this
        if (options.item) {
            let item = JSON.parse(options.item)
            _this.setData({ 
                status: '0',
                item: {
                    ...item,
                    'time': _this.converseTime(item.time)
                }
            })
            _this.getDetail()
        } else {
            let item = JSON.parse(options.item1)
            // console.log(item);
            _this.setData({
                status: String(item.status),
                item: {
                    caseItem: item.placeList,
                    item: {
                        ...item, 
                        time: item.time.slice(0, 17)
                    },
                    time: _this.converseTime(item.createTime)
                }
            })
            _this.getDetail()
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})