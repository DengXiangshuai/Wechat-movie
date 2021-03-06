// pages/posts/moremovie/moremovie.js
var app = getApp()
var movies = require("../../../data/data.js")
Page({

  onLoad: function (options) {
    var that = this;
    var category = options.category;
    this.data.navigateTitle = category;
    var dataurl = "";
    switch (category) {
      case "北美热映":
        dataurl = "http://t.yushu.im" + "/v2/movie/in_theaters" + "?start=0&count=20";
        break;
      case "即将上映":
        dataurl = "http://t.yushu.im" + "/v2/movie/coming_soon" + "?start=0&count=20";
        break;
      case "top250":
        dataurl = "http://t.yushu.im" + "/v2/movie/top250" + "?start=0&count=20";
        break;
    }

    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  
   this.getlist(dataurl)
  },

  getlist: function (url){
    var that = this 
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.handle(res.data);
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },

  handle: function (movieDouban) {
    var movie = [];
    for (var idx in movieDouban.subjects) {
      var subject = movieDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movie.push(temp)
    }
    var okdata = {};
    okdata = {
      movie: movie
    }
    this.setData(okdata)
  }
}

)