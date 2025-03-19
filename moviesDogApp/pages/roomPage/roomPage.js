// pages/roomPage/roomPage.js
import { getCinemaDetail, getMovieDetailApi, getShowcaseList } from '../../apis/api'
import { typeConverse } from '../../utils/converse'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cinemaItem: '',
        movieItem: '',
        itemDate: '',
        cinemaViewSwitch: false,
        roomList: []
    },

    openCinema() {
        const _this = this
        _this.setData({
            cinemaViewSwitch: !_this.data.cinemaViewSwitch
        })
    },

    toBack() {
        wx.navigateBack()
    },

    toCase(e) {
        console.log(e.currentTarget.dataset.item);
        const id = e.currentTarget.dataset.item.id
        wx.navigateTo({
          url: `/pages/casePage/casePage?id=${id}`,
        })
    },

    // 获取详细信息
    async getDetail(cinemaId, movieId, date) {
        const _this = this
        const response = await getCinemaDetail(cinemaId)
        // console.log(response);
        const response1 = await getMovieDetailApi(movieId)
        // console.log(response1);
        const response2 = await getShowcaseList(cinemaId, movieId, date.replace(/月/g, "-").slice(0, 5))
        // console.log(response2);
        _this.setData({
            cinemaItem: response.data,
            movieItem: {
                ...response1.data,
                'pictureList': response1.data.pictureList.split(','),
                'rate': response1.data.rate.toFixed(1),
                'type': typeConverse(response1.data.type.split(','))
            },
            roomList: response2.map(item => {
                return {
                    'time': item[4],
                    'title': item[1],
                    'name': item[3],
                    'price': item[5],
                    'id': item[0],
                    'roomId': item[2]
                }
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const _this = this
        this.setData({
            itemDate: options.date
        })
        wx.setNavigationBarTitle({
            title: options.cinemaName
        });
        _this.getDetail(options.cinemaId, options.movieId, options.date)
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
        const _this = this
        wx.setNavigationBarTitle({
            title: _this.data.cinemaItem.name
        });
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