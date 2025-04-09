// pages/allMoviePage/allMoviePage.js
import { getAllMovieApi } from '../../apis/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArr: [{  
        value: "Comedy",  
        label: "喜剧"  
      },  
      {  
        value: "Romance",  
        label: "爱情"  
      },  
      {  
        value: "Action",  
        label: "动作"  
      },  
      {  
        value: "Science_Fiction",  
        label: "科幻"  
      },  
      {  
        value: "Animation",  
        label: "动画"  
      },  
      {  
        value: "Mystery",  
        label: "悬疑"  
      },  
      {  
        value: "Crime",  
        label: "犯罪"  
      },  
      {  
        value: "adventure",  
        label: "冒险"  
      },  
      {  
        value: "Horror",  
        label: "恐怖"  
      },  
      {  
        value: "War",  
        label: "战争"  
      },  
      {  
        value: "Martial_Arts",  
        label: "武侠"  
      },  
      {  
        value: "Disaster",  
        label: "灾难"  
      },  
      {  
        value: "Youth",  
        label: "青春"  
      },  
      {  
        value: "Family",  
        label: "家庭"  
      },  
      {  
        value: "Plot",  
        label: "剧情"  
      }],
    typeIndex: -1,
    langArr: [{  
        value: "Mandarin",  
        label: "国语"  
      },  
      {  
        value: "Cantonese",  
        label: "粤语"  
      },  
      {  
        value: "English",  
        label: "英语"  
      },  
      {  
        value: "Japanese",  
        label: "日语"  
      },  
      {  
        value: "Korean",  
        label: "韩语"  
      },  
      {  
        value: "Russian",  
        label: "俄语"  
      },  
      {  
        value: "other",  
        label: "其他"  
      }],
    langIndex: -1,
    regionArr: [{  
        value: 'China',  
        label: '中国'  
      },  
      {  
        value: 'EuUSA',  
        label: '欧美'  
      },  
      {  
        value: 'Japan',  
        label: '日本'  
      },  
      {  
        value: 'Korean',  
        label: '韩国'  
      },  
      {  
        value: 'other',  
        label: '其他'  
      }],
    regionIndex: -1,
    // sortArr: ['评分', '票房', '年份'],
    // sortIndex: -1,
    movieList: [],
    searchInput: ''
  },

  bindPickerChange(index, item) {
    console.log('用户选择的索引为', index, '，用户选择为：', item);
  },
  bindTypeChange(e) {
    this.setData({
        typeIndex: e.detail.value
    })
    this.bindPickerChange(e.detail.value, this.data.typeArr[e.detail.value])
    this.getAllMovie(this.data.searchInput, this.data.typeArr[this.data.typeIndex]?.value, this.data.langArr[this.data.langIndex]?.value, this.data.regionArr[this.data.regionIndex]?.value)
  },
  bindLangChange(e) {
    this.setData({
        langIndex: e.detail.value
    })
    this.bindPickerChange(e.detail.value, this.data.langArr[e.detail.value])
    this.getAllMovie(this.data.searchInput, this.data.typeArr[this.data.typeIndex]?.value, this.data.langArr[this.data.langIndex]?.value, this.data.regionArr[this.data.regionIndex]?.value)
  },
  bindRegionChange(e) {
    this.setData({
        regionIndex: e.detail.value
    })
    this.bindPickerChange(e.detail.value, this.data.regionArr[e.detail.value])
    this.getAllMovie(this.data.searchInput, this.data.typeArr[this.data.typeIndex]?.value, this.data.langArr[this.data.langIndex]?.value, this.data.regionArr[this.data.regionIndex]?.value)
  },
//   bindSortChange(e) {
//     this.setData({
//         sortIndex: e.detail.value
//     })
//     this.bindPickerChange(e.detail.value, this.data.sortArr[e.detail.value])
//   },

  onSearch() {
      console.log(this.data.searchInput);
    //   wx.showToast({
    //     title: this.data.searchInput,
    //   })
    this.getAllMovie(this.data.searchInput, this.data.typeArr[this.data.typeIndex]?.value, this.data.langArr[this.data.langIndex]?.value, this.data.regionArr[this.data.regionIndex]?.value)
  },
  onSearChange(e) {
    this.setData({
        searchInput: e.detail
    })
  },
  toDetail(event) {
    // console.log(event.currentTarget.dataset.item.id);
    wx.navigateTo({
      url: `/pages/detailPage/detailPage?id=${event.currentTarget.dataset.item.id}`,
    })
  },
  toRefresh() {
    console.log('重置刷新');
    this.setData({
        typeIndex: -1,
        langIndex: -1,
        regionIndex: -1,
        // sortIndex: -1,
        searchInput: ''
    })
    this.getAllMovie()
  },

  async getAllMovie(text = '', type = '', language = '', country = '') {
    console.log(text, type, language, country);
    const response = await getAllMovieApi(text, type, language, country)
    console.log(response);
    this.setData({
        movieList: response.map(item => {
            return {
                ...item,
                'pic': item.pictureList.split(','),
                'name': item.name,
                'rate': item.rate.toFixed(1)
            }
        })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAllMovie()
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
    this.getAllMovie()
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