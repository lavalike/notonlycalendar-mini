//app.js
App({
  onLaunch: function () {
    this.checkNewVersion()
  },
  checkNewVersion(){
    if(wx.canIUse('getUpdateManager')){
      const manager = wx.getUpdateManager()
      manager.onCheckForUpdate(function (res) {
        if(res.hasUpdate){
          manager.onUpdateReady(function(){
            wx.showModal({
              content : '新版本已经准备好，是否更新?',
              success (res) {
                if(res.confirm){
                  manager.applyUpdate()
                }
              }
            })
          })
        }
      })
    }else{
      wx.showModal({
        content: "当前微信版本过低，请升级到最新微信版本后重试"
      })
    }
  },
})