from dwsl import userservice
from dwsl import postservice
from dwsl import fileservice

routedict = {
    userservice.CheckUserExist: "/v1/user/signup/", #检查用户名是否被占用
    userservice.UserList:"/v1/user/list/", #返回用户列表
    userservice.UserDelete:"/v1/user/del/", #删除用户
    userservice.ChangePWD:"/v1/user/change/", #删除用户
    userservice.AddUser: "/v1/user/signup/",        #用户注册
    userservice.CheckLogin: "/v1/user/login/",      #用户登录
    userservice.TokenDelete: "/v1/token/delete/",   #删除usertoken
    postservice.Postlist: "/v1/post/list/",         #返回帖子列表
    postservice.Postappend:"/v1/post/append/",      #发布帖子
    postservice.PostSearch:"/v1/post/search/",      #按内容搜索帖子
    postservice.PostSearchTitle:"/v1/post/searchtitle/",      #按标题搜索帖子
    postservice.Postdelete:"/v1/post/delete/",      #删除帖子、
    postservice.Mypostlist: "/v1/post/mypostlist/", #返回我发布的帖子
    postservice.Posttop: "/v1/post/top/",           #帖子置顶
    postservice.Posttopcancel: "/v1/post/top/cancel/", #取消置顶帖子
    postservice.Postiddetail: "/v1/post/id/detail/",#根据帖子编号获取帖子详情
    postservice.Postcomment: "/v1/post/comment/",    #评论帖子
    postservice.Postreply: "/v1/post/reply/",       #回复帖子
    fileservice.Webpicupload: "/v1/post/web/pics/",  # 网站端上传图片
    fileservice.PostImageCutService: "/v1/file/post/imagecut/",  #帖子图片截取
    postservice.Pictureremove: "/v1/picture/remove/",  # 根据图片地址删除图片
}
# 文件下面的某个类与寻找路径一一对应，这是一个字典。
