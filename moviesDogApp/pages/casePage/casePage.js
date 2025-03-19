// pages/casePage/casePage.js
import {formatTime} from '../../utils/userInfo'
import { getShowcaseDetail, getSelectedCase } from '../../apis/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        item: '', // URL得到的影厅信息
        roomSizeList: {
            'small': {
              'width': 10,
              'height': 4,
            },
            'medium': {
              'width': 16,
              'height': 6,
            },
            'large': {
              'width': 22,
              'height': 8,
            },
            'super': {
              'width': 30,
              'height': 10,
            }
        },
        roomSize: {},
        placeSize: {
            width: 0,
            height: 0
        },
        touchIndex: [],
        touchArr: [],
        defaultIndex: []
    },

    getPlaceSize(type) {
        // console.log(type);
        const width = this.data.roomSizeList[type].width * 55
        const height = this.data.roomSizeList[type].height * 55
        // console.log(width, height);
        this.setData({
            placeSize: {
                width: width,
                height: height
            },
            roomSize: {
                width: this.data.roomSizeList[type].width,
                height: this.data.roomSizeList[type].height
            }
        })
    },

    createPlace() {
        const grid = []
        const _this = this
        for (let i = 0; i < _this.data.roomSize.height; i++) {
            const row = [];
            for (let j = 0; j < _this.data.roomSize.width; j++) {
                const target = {row: i+1, col: j+1}
                const arr = _this.data.defaultIndex
                if (arr.some(item => item.row === target.row && item.col === target.col)){
                    row.push({ color: '#1249ba'})
                } else {
                    row.push({ color: '' })
                }
            }
            grid.push(row);
        }
        this.setData({ touchArr: grid });
    },

    touchPlace(e) {
        const row = e.currentTarget.dataset.outer
        const col = e.currentTarget.dataset.inner
        const target = {row: row, col: col}
        // console.log(target);

        const _this = this
        const indexArr = _this.data.touchIndex
        const arr = _this.data.touchArr
        const exists = indexArr.findIndex(item => item.row === target.row+1 && item.col === target.col+1);
        console.log(exists);
        if (arr[row][col].color !== '#1249ba') {
            if (exists === -1) {
                if (this.data.touchIndex.length >= 6) {
                    wx.showToast({
                        title: '最多可购买6张票哦',
                        icon: 'none'
                    })
                    return 0;
                }
                _this.setData({
                    touchIndex: [
                        ..._this.data.touchIndex, 
                        {
                            row: e.currentTarget.dataset.outer + 1,
                            col: e.currentTarget.dataset.inner + 1
                        }
                    ]
                })
            } else {
                indexArr.splice(exists, 1)
                _this.setData({touchIndex: indexArr})
            }
        }

        arr[row][col].color = arr[row][col].color === '#1249ba' ? '#1249ba' : arr[row][col].color === '' ? '#3e77ec' : ''
        _this.setData({touchArr: arr})
        // console.log(row, col, _this.data.touchArr[row][col].color);
    },

    toOrder() {
        const _this = this
        if (_this.data.touchIndex.length === 0) {
            wx.showToast({
              title: '请选择座位',
              icon: 'none'
            })
        } else {
            const item = {
                item: _this.data.item,
                caseItem: _this.data.touchIndex,
                time:  new Date()
            }
            console.log(item);
            wx.navigateTo({
              url: `/pages/orderPage/orderPage?item=${JSON.stringify(item)}`,
            })
        }
    },

    // 日期切换
    removeDate(utcTime){
        const date = new Date(utcTime);
        date.setHours(date.getHours() + 8);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const day = String(date.getDate()).padStart(2, "0");
        const formattedTime = `${month}月${day}日`;
        // console.log(formattedTime);
        return formattedTime
    },
    // 时间切换
    removeTime(time) {
        var utcDate = new Date(time);
        var utcHours = utcDate.getUTCHours();
        var utcMinutes = utcDate.getUTCMinutes();
        var beijingHours = utcHours + 8;
        if (beijingHours >= 24) {
            beijingHours -= 24; 
        }
        var formattedTime = `${beijingHours}:${utcMinutes < 10 ? '0' + utcMinutes : utcMinutes}`;
        return formattedTime
    },
    // 获取详细信息
    async getDetail(id) {
        const _this = this
        const response = await getShowcaseDetail(id)
        const response1 = await getSelectedCase(id)
        console.log(response1.slice(',').map(item => {return JSON.parse(item)}).flat());
        _this.setData({
            item: {
                'id': response[0],
                'showcaseName': response[1],
                'cinemaId': response[2],
                'cinemaName': response[3],
                'roomId': response[4],
                'roomName': response[5],
                'movieId': response[6],
                'movieName': response[7],
                'date': _this.removeDate(response[8]),
                'time': _this.removeTime(response[8]),
                'price': response[9],
                'sizeType': response[11]
            },
            defaultIndex: response1.slice(',').map(item => {return JSON.parse(item)}).flat()
        })
        wx.setNavigationBarTitle({
            title: _this.data.item.cinemaName
        });
        // console.log(_this.data.item);
        this.getPlaceSize(_this.data.item.sizeType)
        this.createPlace()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(options.id);
        const _this = this
        _this.getDetail(options.id)
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