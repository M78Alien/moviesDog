// pages/cinemaPage/cinemaPage.js
import {
    onLogin
} from '../../utils/userInfo'
import { loginApi, findCinema } from '../../apis/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        item: {},
        loginView: false,
        userName: '',
        phoneNumber: '',
        password: '',
        realUserData: {
            userName: 'Alien',
            phoneNumber: '15820871626',
            password: 'zys666666',
        },
        nextFourDay: [],
        cinemaList: [],
    },

    closeLogin() {
        wx.getStorage({
            key: 'userInfo',
            success: (res) => {
                this.setData({
                    loginView: false
                })
            },
            fail: (err) => {
                wx.navigateBack()
            }
        });
    },
    async onLogin() {
        const _this = this
        const regex = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        const getData = {
            userName: _this.data.userName,
            phoneNumber: _this.data.phoneNumber,
            password: _this.data.password
        }
        console.log('登录', getData);
        console.log('realUserData:', _this.data.realUserData)
        if (!_this.data.userName || !_this.data.phoneNumber || !_this.data.password) {
            wx.showToast({
                title: '请填写完整',
                icon: 'error'
            })
        } else if (_this.data.userName.length < 1 || _this.data.userName.length >= 10) {
            wx.showToast({
                title: '用户名过长',
                icon: 'error'
            })
        } else if (!regex.test(_this.data.phoneNumber)) {
            wx.showToast({
                title: '手机号格式错误',
                icon: 'error'
            })
        } else if (_this.data.password.length < 6) {
            wx.showToast({
                title: '密码太短',
                icon: 'error'
            })
        } else {
            const response = await loginApi(getData.userName, getData.phoneNumber, getData.password)
            console.log(response);
            if (!response.success) {
                wx.showToast({
                    title: response.message,
                    icon: 'error'
                })
            } else {
                wx.showToast({
                    title: '登录成功',
                    icon: 'success'
                })
                _this.setData({loginView: false})
                onLogin(response.data)
                this.getUserInfo()
            }
        }
    },
    getUserInfo() {
        wx.getStorage({
            key: 'userInfo',
            success: (res) => {
                const data = res.data; // 读取到的数据
                console.log(data);
                this.setData({
                    loginView: false
                })
            },
            fail: (err) => {
                console.log('读取失败', err);
                this.setData({
                    loginView: true
                })
            }
        });
    },
    getNextFourDays() {
        const days = [];
        const today = new Date();

        for (let i = 0; i < 4; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);
            const month = String(nextDay.getMonth() + 1).padStart(2, '0'); // 月份补零
            const day = String(nextDay.getDate()).padStart(2, '0'); // 日期补零
            days.push(`${month}月${day}日`);
        }

        return days;
    },
    tabChange(e) {
        console.log(e);
        this.setData({active: e.detail.index})
    },
    toRoom(item) {
        const _this = this
        console.log(item.currentTarget.dataset.item);
        const cinemaItem = item.currentTarget.dataset.item
        const date = _this.data.nextFourDay[_this.data.active]
        wx.navigateTo({
          url: `/pages/roomPage/roomPage?cinemaId=${cinemaItem.id}&cinemaName=${cinemaItem.name}&date=${date}&movieId=${_this.data.item.id}`,
        })
    },

    // 获取列表
    async findCinema(cinemaId) {
        let result1 = this.data.nextFourDay.map(str => str.replace(/月/g, "-").slice(0, 5));
        console.log(result1);
        for (let i = 0; i < result1.length; i++) {
            const response = await findCinema(result1[i], cinemaId)
            const list = response.map(item => {
                return {
                    'id': item[0],
                    'name': item[1],
                    'date': item[2],
                    'time': item[3].split(',').map(str => str.slice(0, 5)),
                    'address': item[4],
                    'price': item[5],
                    'type': ['IMAX', '杜比影院']
                }
            })
            console.log(result1[i], ':', list);
            this.setData({
                cinemaList: [...this.data.cinemaList, list]
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const _this = this
        this.setData({
            item: {id: options.id, name: options.name},
            nextFourDay: this.getNextFourDays()
        })
        this.getUserInfo()
        wx.setNavigationBarTitle({
            title: _this.data.item.name
        });
        this.findCinema(_this.data.item.id)
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