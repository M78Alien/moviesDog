// pages/detailPage/detailPage.js
import { getMovieDetailApi, addComment, getDetailComment } from '../../apis/api'
import { formatTime } from '../../utils/userInfo'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 获取到的电影信息
        optionItem: {},
        // 标题封面
        titlePicURL: '',
        // 剧照列表
        picURLList: [],
        // 分享弹窗
        showShare: false,
        // 分享类型
        shareList: [{
                name: '微信',
                icon: 'wechat',
                openType: 'share'
            },
            {
                name: '分享海报',
                icon: 'poster'
            },
        ],
        // 评论列表
        commentList: [],
        // 发评论弹窗
        commentView: false,
        // 评论内容
        newComment: '',
        // 默认评分
        defaultRate: 7,
        // 电影详情信息
        detailMsg: null,
        // 电影类型翻译对照
        typeList: {
            Comedy: '喜剧',
            Romance: '爱情',
            Action: '动作',
            Science_Fiction: '科幻',
            Animation: '动画',
            Mystery: '悬疑',
            Crime: '犯罪',
            adventure: '冒险',
            Horror: '恐怖',
            War: '战争',
            Martial_Arts: '武侠',
            Disaster: '灾难',
            Youth: '青春',
            Family: '家庭',
            Plot: '剧情',
            '3D': '3D',
            IMAX: 'IMAX',
            Dolby: '杜比全景声'
        },
        // 标签是否显示
        show3D: false,
        showIMAX: false,
        showDobly: false,
        // 用户信息
        userMsg: null
    },

    // 移除数组Type内容
    removeItemFromArray(array, item) {
        return array.filter(element => element !== item);
    },
    // 日期切换
    removeDate(utcTime){
        const date = new Date(utcTime);
        date.setHours(date.getHours() + 8);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const day = String(date.getDate()).padStart(2, "0");
        const formattedTime = `${year}年${month}月${day}日`;
        // console.log(formattedTime);
        this.setData({
            detailMsg: {
                ...this.data.detailMsg,
                releaseTime: formattedTime
            }
        })
    },
    // 获取封面链接
    getPicURL() {
        const _this = this.data
        const URL = _this.detailMsg.pictureList[0]
        // console.log(URL);
        let translatedWords = _this.detailMsg.type.map(word => _this.typeList[word] || word);
        this.setData({show3D: translatedWords.includes('3D'), showIMAX: translatedWords.includes('IMAX'), showDobly: translatedWords.includes('杜比全景声')})
        translatedWords = this.removeItemFromArray(translatedWords, 'IMAX')
        translatedWords = this.removeItemFromArray(translatedWords, '3D')
        translatedWords = this.removeItemFromArray(translatedWords, '杜比全景声')
        this.setData({
            titlePicURL: URL,
            detailMsg: {
                ..._this.detailMsg,
                type: translatedWords
            },
        })
        
    },
    // 点击查看图片
    showPicture(url) {
        // console.log(url.currentTarget.dataset.url);
        if (url.currentTarget.dataset.url) {
            wx.previewImage({
                current: url.currentTarget.dataset.url,
                urls: this.data.detailMsg.pictureList
            })
        } else {
            wx.previewImage({
                urls: [this.data.titlePicURL]
            })
        }
    },
    // 打开分享弹窗
    openShare() {
        this.setData({
            showShare: true
        })
    },
    // 关闭分享弹窗
    closeShare() {
        this.setData({
            showShare: false
        })
    },
    // 分享海报
    selectShare(event) {
        // console.log(event.detail.name);
        const _this = this
        if (event.detail.name === '分享海报') {
            wx.getImageInfo({
                src: _this.data.titlePicURL,
                success: (res) => {
                    const shareImagePath = res.path;
                    wx.showShareImageMenu({
                        path: shareImagePath,
                        success(res) {
                            console.log('分享成功', res);
                            _this.setData({
                                showShare: false
                            })
                        },
                        fail(err) {
                            wx.showToast({
                                title: '分享失败',
                                icon: 'error'
                            })
                            console.error('分享失败', err);
                        }
                    });
                },
                fail: (err) => {
                    wx.showToast({
                        title: '获取图片信息失败',
                        icon: 'error'
                    })
                    console.error('获取图片信息失败', err);
                }
            });
        }
    },
    // 打开评论弹窗
    openComment() {
        if (this.data.userMsg) {
            this.setData({
                commentView: true
            })
        } else {
            wx.showToast({
              title: '请先登录',
              icon: 'error'
            })
        }
        
    },
    // 关闭评论弹窗
    closeComment() {
        this.setData({
            commentView: false
        })
    },
    // 评分同步
    rateChange(e) {
        console.log(e.detail);
        this.setData({
            defaultRate: e.detail * 2
        })
    },
    // 评论同步
    commentChange(e) {
        // console.log(e.detail.value);
        this.setData({
            newComment: e.detail.value
        })
    },
    // 发表评论
    async pushComment() {
        console.log(this.data.newComment);
        const _this = this
        if (!this.data.newComment) {
            wx.showToast({
                title: '还没写评论哦',
                icon: 'none'
            })
        } else if (_this.data.defaultRate === 0) {
            wx.showToast({
                title: '恶意太大了，评分别给0分哦',
                icon: 'none'
            })
        } else {
            const now = new Date();
            const response = await addComment({
                "userId": _this.data.userMsg.id,
                "userName": _this.data.userMsg.name,
                "movieId": _this.data.detailMsg.id,
                "movieName": _this.data.detailMsg.name,
                "createTime": now,
                "rate": _this.data.defaultRate,
                "comment": _this.data.newComment,
                "status": 4,
                "isDelete": 0
            })
            console.log(response);
            wx.showToast({
                title: '发表成功',
                icon: 'success'
            })
            this.setData({
                commentView: false
            })
            // this.getCommentList()
            this.getDetail(this.data.detailMsg.id)
        }
    },
    // 跳转购票
    toCinema() {
        const _this = this
        wx.navigateTo({
            url: `/pages/cinemaPage/cinemaPage?id=${_this.data.detailMsg.id}&name=${_this.data.detailMsg.name}`,
        })
    },
    // 获取电影详情信息
    async getDetail(id) {
        const response = await getMovieDetailApi(id)
        console.log(response);
        // console.log(response.data.pictureList.split(','));
        this.setData({
            detailMsg: {
                ...response.data,
                pictureList: response.data.pictureList.split(','),
                type: response.data.type.split(','),
                rate: response.data.rate.toFixed(1)
            }
        })
        this.getPicURL()
        this.removeDate(this.data.detailMsg.releaseTime)
        this.getCommentList()
    },
    // 读取用户信息
    getUserInfo() {
        wx.getStorage({
            key: 'userInfo',
            success: (res) => {
                const data = res.data; // 读取到的数据
                console.log(data);
                this.setData({userMsg: data})
            },
            fail: (err) => {
                console.log('读取失败', err);
            }
        });
    },
    // 获取评论列表
    async getCommentList() {
        // console.log(this.data.userMsg.id, this.data.detailMsg.id);
        const response = await getDetailComment(0, this.data.detailMsg.id)
        console.log(response);
        this.setData({commentList: response})
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // this.setData({
        //     optionItem: JSON.parse(options.item)
        // })
        this.getDetail(options.id)
        this.getUserInfo()
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