// pages/showingHome/showingHome.js
import {
    getChampion,
    getSaleRank
} from '../../apis/api'
import {
    typeConverse
} from '../../utils/converse'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [
            'https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/bar-3.jpg',
            'https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/bar-2.jpg',
            'https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/bar-1.jpg'
        ],
        movieCardList: [],
        championName: '',
    },

    toRankingPage() {
        const app = getApp();
        app.globalData.param = {
            rankingActive: 1
        };
        wx.switchTab({
            url: '/pages/rankingPage/rankingPage'
        })
    },

    toRefresh() {
        console.log('刷新');
    },

    toDetail(event) {
        // console.log(event.currentTarget.dataset.item);
        wx.navigateTo({
            url: `/pages/detailPage/detailPage?id=${event.currentTarget.dataset.item.id}`,
        })
    },

    toBuy(event) {
        // console.log(event.currentTarget.dataset.item);
        const item = event.currentTarget.dataset.item
        wx.navigateTo({
            url: `/pages/cinemaPage/cinemaPage?id=${item.id}&name=${item.name}`,
        })
    },

    // 日期切换
    removeDate(utcTime) {
        const date = new Date(utcTime);
        date.setHours(date.getHours() + 8);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}年${month}月${day}日`;
    },
    // 类型提取
    getShowType(array) {
        const strings = array;
        const keywords = ['3D', 'IMAX', 'Dolby']; 
        const filteredStrings = strings.filter(str => keywords.includes(str));
        return filteredStrings
    },
    // 获取信息
    async getDetail() {
        const response = await getChampion()
        // console.log(response);
        this.setData({
            championName: response
        })
    },
    // 获取票房排行列表
    async getSaleRank() {
        const response = await getSaleRank()
        console.log(response);
        this.setData({
            movieCardList: response.map(item => {
                return {
                    ...item,
                    'pictureList': item.pictureList.split(','),
                    'type': item.type.split(','),
                    'rate': item.rate.toFixed(1),
                    'showType': this.getShowType(item.type.split(','))
                }
            }),
        })
        this.setData({
            movieCardList: this.data.movieCardList.map(item => {
                return {
                    ...item,
                    'type': typeConverse(item.type),
                    'country': typeConverse(item.country),
                    'language': typeConverse(item.language),
                    'releaseTime': this.removeDate(item.releaseTime)
                }
            }),
            swiperList: this.data.movieCardList.slice(0, 3)
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getDetail()
        this.getSaleRank()
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