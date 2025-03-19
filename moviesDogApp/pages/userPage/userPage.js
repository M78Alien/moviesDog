// pages/userPage/userPage.js
import { onLogin } from '../../utils/userInfo'
import { loginApi, getUserComment, updateProfile, getOrderList } from '../../apis/api'
import { BaseURL } from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loginView: false,
        userName: '',
        phoneNumber: '',
        password: '',
        defaultProfile: '../../assets/icon/profile.png',
        listActive: 0,
        orderList: [],
        commentList: [],
        userMsg: null,
        editView: false,
        pswShow: false,
    },

    closeLogin() {
        wx.getStorage({
            key: 'userInfo',
            success: (res) => {
                this.setData({loginView: false})
            },
            fail: (err) => {
                wx.switchTab({
                  url: '/pages/showingHome/showingHome',
                })
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
        const _this = this
        wx.getStorage({
            key: 'userInfo',
            success: (res) => {
                const data = res.data; // 读取到的数据
                console.log(data);
                this.setData({loginView: false})
                _this.setData({
                    userMsg: data
                })
                this.getCommentList()
                this.getOrderList()
            },
            fail: (err) => {
                console.log('读取失败', err);
                this.setData({loginView: true})
            }
        });
    },
    toExit() {
        wx.removeStorage({ key: 'userInfo' });
        wx.reLaunch({
          url: '/pages/userPage/userPage',
        })
    },
    toOrder(e) {
        console.log(e.currentTarget.dataset.item);
        const item = e.currentTarget.dataset.item
        wx.navigateTo({
          url: `/pages/orderPage/orderPage?item1=${JSON.stringify(item)}`,
        })
    },
    listChange(e) {
        console.log(e.detail.index);
        this.setData({listActive: e.detail.index})
    },
    deleteList(e) {
        // console.log(e.currentTarget.dataset.item);
        wx.showToast({
          title: '说出去的话就是泼出去的水',
          icon: 'none'
        })
    },
    toEdit() {
        this.setData({editView: !this.data.editView})
    },
    async getCommentList() {
        const response = await getUserComment(this.data.userMsg.id)
        // console.log(response);
        this.setData({
            commentList: response.map(item => {
                return {
                    ...item,
                    'pictureList': item.roomName.split(','),
                    'roomName': null,
                }
            })
        })
    },
    showPsw(){
        this.setData({pswShow: !this.data.pswShow})
    },
    changeProfile(){
        const _this = this
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            camera: 'back',
            success(res) {
                console.log(res.tempFiles[0].tempFilePath)
                console.log(res.tempFiles[0].size)
                if (res.tempFiles[0].size > 1000000) {
                    wx.showToast({
                      title: '图片体积过大',
                      icon: 'error'
                    })
                } else {
                    _this.upload(res.tempFiles[0].tempFilePath)
                }
            }
        })
        
    },
    upload(filePath) {
        const uploadUrl = BaseURL + '/upload';
        const _this = this
        wx.uploadFile({
            url: uploadUrl, // 上传接口地址
            filePath: filePath, // 文件路径
            name: 'file', // 文件字段名
            formData: {
                'user': 'test' // 附加参数
            },
            async success(res) {
                console.log('上传成功', res.data); // 上传成功回调
                const response = await updateProfile(_this.data.userMsg.id, res.data)
                console.log(response);
                _this.setData({
                    userMsg: {
                        ..._this.data.userMsg,
                        'userProfile': res.data
                    }
                })
                onLogin(_this.data.userMsg)
            },
            fail(error) {
                console.log('上传失败', error); // 上传失败回调
            }
        })
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
    async getOrderList() {
        const _this = this
        const response = await getOrderList(this.data.userMsg.id)
        console.log(response);
        _this.setData({
            orderList: response.map(item => {
                return {
                    'id': item[0],
                    'movieId': item[1],
                    'movieName': item[2],
                    'cinemaId': item[3],
                    'cinemaName': item[4],
                    'roomId': item[5],
                    'roomName': item[6],
                    'showcaseName': item[7],
                    'placeList': JSON.parse(item[8]),
                    'allPrice': item[9],
                    'price': (item[9]/JSON.parse(item[8]).length).toFixed(1),
                    'count': JSON.parse(item[8]).length,
                    'status': item[10],
                    'pictureList': item[11].split(','),
                    'time': _this.converseTime(item[12]),
                    'createTime': item[13]
                }
            })
        })
    },
    // 点击查看头像图片
    showPicture() {
        // console.log(this.data.userMsg.userProfile);
        wx.previewImage({
            urls: [this.data.userMsg.userProfile]
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
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
        this.getUserInfo()
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