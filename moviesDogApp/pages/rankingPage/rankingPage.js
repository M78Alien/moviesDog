// pages/rankingPage/rankingPage.js
import { getRateRank, getSaleRank } from '../../apis/api'
import { typeConverse } from '../../utils/converse'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    scoreTopList: [],
    saleTopList: [],
  },

  onChange(event) {
    console.log(event.detail.index);
    const app = getApp()
    app.globalData.param = { rankingActive: event.detail.index };
    this.setData({
        active: event.detail.index
    })
  },

  getActive() {
    const _this = this
    const app = getApp()
    // console.log('得到', app.globalData.param?.rankingActive);
    if (app.globalData.param?.rankingActive) {
        _this.setData({
            active: app.globalData.param.rankingActive
        })
    }
  },
  toDetail(event) {
    console.log(event.currentTarget.dataset.item);
    wx.navigateTo({
      url: `/pages/detailPage/detailPage?id=${event.currentTarget.dataset.item.id}`,
    })
  },
  // 获取高分排行列表
  async getRateRank(){
    const response = await getRateRank()
    // console.log(response);
    this.setData({
        scoreTopList: response.map(item => {
            return {
                ...item,
                'pictureList': item.pictureList.split(','),
                'type': item.type.split(','),
                'rate': item.rate.toFixed(1)
            }
        })
    })
    this.setData({
        scoreTopList: this.data.scoreTopList.map(item => {
            return {
                ...item,
                'type': typeConverse(item.type),
                'country': typeConverse(item.country),
                'language': typeConverse(item.language),
                'releaseTime': this.removeDate(item.releaseTime)
            }
        })
    })
  },
  // 获取票房排行列表
  async getSaleRank(){
    const response = await getSaleRank()
    this.setData({
        saleTopList: response.map(item => {
            return {
                ...item,
                'pictureList': item.pictureList.split(','),
                'type': item.type.split(','),
                'rate': item.rate.toFixed(1),
                'sales': item.sales >= 100000000 ? item.sales/100000000 + '亿' : item.sales === 0 ? 0 : item.sales/10000 + '千万'
            }
        })
    })
    this.setData({
        saleTopList: this.data.saleTopList.map(item => {
            return {
                ...item,
                'type': typeConverse(item.type),
                'country': typeConverse(item.country),
                'language': typeConverse(item.language),
                'releaseTime': this.removeDate(item.releaseTime)
            }
        })
    })
  },
  // 日期切换
  removeDate(utcTime){
    const date = new Date(utcTime);
    date.setHours(date.getHours() + 8);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}年${month}月${day}日`;
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
    this.getActive()
    this.getRateRank()
    this.getSaleRank()
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