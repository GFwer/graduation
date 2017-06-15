from flask.ext import restful
from flask import request
from flask import jsonify
from flask import Response
from conf import httpserver, httpport
from tools.crossdomain import allow_cross_domain
from orml.postorml import Postorml
from tools.info import Info


class Postlist(restful.Resource): 

    '''
    请求方式: GET
    请求参数:
    category_name:1
    startposi: 0
    pagesize:10
    返回值:
    True,3,[{"post_id":2,                                     #参数“3”为置顶的帖子数量
             "post_title":'1111111111',
             "post_content":'1111111111111,
             "user_name":”Tom”,
             "post_time":”2016-10-12 15:33:14”,
             "post_userhead":"http://192.168.1.100:8080/logo/1.png"
             "post_topstatu": "1"}];
    False,'无效的用户，登陆断开连接',None;
    False,数据库错误,None
    True,0,"已经没有帖子了"
    '''

    @allow_cross_domain
    def get(self): #请求方式为GET
        categoryname = request.args.get("category_name")
        startposi = request.args.get("startposi")
        pagesize = request.args.get("pagesize")
        if not all([startposi,pagesize,categoryname]):
            return jsonify(Info(False,'参数不足', None ).tojson())
        po = Postorml()   #类实例化的对象
        Infoa = po.postlist(startposi,pagesize,categoryname)
        return jsonify(Infoa)
    
class Postappend(restful.Resource):
    
    '''
    请求方式: POST
    请求参数:
    usertoken_str:usertoken
    post_title:登山求好友
    post_content:想登山的朋友加好友
    category_name:1
    post_pics : ['http://192.168.1.100:8030/logo/1.png']
    返回值:
    True,'发布成功',None;
    False,'无效的用户，登陆断开连接',None;
    False,数据库错误,None
    '''
    
    @allow_cross_domain
    def post(self):#请求方式为POST
        usertoken = request.form["usertoken_str"]
        post_title = request.form["post_title"]
        post_content = request.form["post_content"]
        category_name = request.form["category_name"]
        postpics = request.form["post_pics"]
        po = Postorml()
        Infoa = po.postappend(usertoken,post_title,post_content,category_name,postpics)
        return jsonify(Infoa)
    
class Postdelete(restful.Resource):
    
    '''
    请求方式: POST
    请求参数:
    usertoken_str:usertoken
    post_id:1
    返回值:
    True,'删除帖子成功',None;
    False,'无效的用户，登陆断开连接',None;
    False,数据库错误,None
    '''
    
    @allow_cross_domain
    def post(self):#请求方式为POST
        usertoken = request.form["usertoken_str"]
        postid = request.form["post_id"]
        po = Postorml()
        Infoa = po.postdelete(usertoken,postid)
        return jsonify(Infoa)  
    
class Mypostlist(restful.Resource): 

    '''
    请求方式: GET
    请求参数:
    usertoken_str:usertoken
    category_name:1
    startposi: 0
    pagesize:10
    返回值:
    True,'返回我发布的帖子列表成功',[{post_id:2,
                                    post_title:'1111111111',
                                    post_content:'1111111111111',
                                    user_name:”Tom”,
                                    post_time:”2016-10-12 15:33:14”,
                                    category_name:”学习交流”,
                                    post_userhead:"http://192.168.1.100:8080/logo/1.png"}];
    False,'无效的用户，登陆断开连接',None;
    False,数据库错误,None
    '''

    @allow_cross_domain
    def get(self): #请求方式为GET
        usertoken = request.args.get("usertoken_str")
        startposi = request.args.get("startposi")
        pagesize = request.args.get("pagesize")
        categoryname = request.args.get("category_name")
        if not all([startposi,pagesize,usertoken]):
            return jsonify(Info(False,'参数不足', None ).tojson())
        po = Postorml()   #类实例化的对象
        Infoa = po.mypostlist(startposi,pagesize,usertoken,categoryname)
        return jsonify(Infoa)    
    
class Posttop(restful.Resource):
    
    '''
    请求方式: POST
    请求参数:
    usertoken_str:usertoken
    post_id:1
    category_name:1
    返回值:
    False,'无效的用户，登陆断开连接',None
    True,'置顶成功',None
    False, '用户没有操作权限', None
    False, '数据库错误', None
    False, '该帖子已经置顶，不能重复置顶帖子', None
    '''
    
    @allow_cross_domain
    def post(self):#请求方式为POST
        usertoken = request.form["usertoken_str"]
        postid = request.form["post_id"]
        categoryname = request.form["category_name"]
        po = Postorml()
        Infoa = po.posttop(usertoken,postid,categoryname)
        return jsonify(Infoa)     
         
class Posttopcancel(restful.Resource):
    
    '''
    请求方式: POST
    请求参数:
    usertoken_str:usertoken
    post_id:1
    返回值:
    True,删除成功,None
    False, '无效的用户，登陆断开连接', None
    False, '用户没有操作权限', None
    False,数据库错误,None
    '''
    
    @allow_cross_domain
    def post(self):#请求方式为POST
        usertoken = request.form["usertoken_str"]
        postid = request.form["post_id"]
        po = Postorml()
        Infoa = po.posttopcancel(usertoken,postid)
        return jsonify(Infoa)    
    
class Postiddetail(restful.Resource): 

    '''
    请求方式: GET
    请求参数:
    usertoken_str:usertoken
    post_id:1
    返回值:
    True,返回成功,{"post_id":1,
                   "post_userid":1,
                   "post_username":"张三",
                   "post_userhead":"http://192.168.1.100:8080/logo/1.png",
                   "post_title":"校内信息头条",
                   "post_content":"校内信息头条的内容",
                   "post_time":"2016/10/10 17:30",
                   "post_pics":[http://192.168.1.100:8080/pic/1.png, http://192.168.1.100:8080/pic/2.png],
                   "post_comments":[{"comment_id":1,
                                     "comment_userid":2,
                                     "comment_username":"李四",
                                     "comment_userhead":"http://192.168.1.100:8080/logo/1.png",
                                     "comment_text":"评论内容",
                                     "comment_datetime":"2016/10/10 17:30",
                                     "comment_parentid":0,
                                     "comment_parentname":""},
                                    {"comment_id":2,
                                     "comment_userid":2,
                                     "comment_username":"李四",
                                     "comment_userhead":"http://192.168.1.100:8080/logo/1.png",
                                     "comment_text":"评论内容",
                                     "comment_datetime":"2016/10/10 17:30",
                                     "comment_parentid":1,
                                     "comment_parentname":"李四"},
                                    {"comment_id":3,
                                     "comment_userid":2,
                                     "comment_username":"李四",
                                     "comment_userhead":"http://192.168.1.100:8080/logo/1.png",
                                     "comment_text":"评论内容",
                                     "comment_datetime":"2016/10/10 17:30",
                                     "comment_parentid":2,"comment_parentname":"王五"}];                           
    False,数据库错误,None
    '''

    @allow_cross_domain
    def get(self): #请求方式为GET
        postid = request.args.get("post_id")
        po = Postorml()   #类实例化的对象
        Infoa = po.postiddetail(postid)
        return jsonify(Infoa)       
    
class Postcomment(restful.Resource):
    
    '''
    请求参数:
    usertoken_str: tokenstr
    post_id: postid
    comment_str: commentstr
    返回值:
    True, 评论成功, None
    False, 用户登录已过期，请重新登录, None
    False, 数据库错误, None
    '''
    
    @allow_cross_domain
    def post(self):#请求方式为POST
        usertoken = request.form["usertoken_str"]
        postid = request.form["post_id"]
        commentstr = request.form["comment_str"]
        po = Postorml()
        Infoa = po.postcomment(usertoken,postid,commentstr)
        return jsonify(Infoa)          
 
class Postreply(restful.Resource):
    
    '''
    请求参数:
    usertoken_str: tokenstr
    comment_id: commentid
    reply_str: replystr
    返回值:
    True, 回复成功, None
    False, 用户登录已过期，请重新登录, None
    False, 数据库错误, None
    '''
    
    @allow_cross_domain
    def post(self):#请求方式为POST
        usertoken = request.form["usertoken_str"]
        comment_id = request.form["comment_id"]
        reply_str = request.form["reply_str"]
        po = Postorml()
        Infoa = po.postreply(usertoken,comment_id,reply_str)
        return jsonify(Infoa) 
 
class Pictureremove(restful.Resource):

    '''
    路径: /v1/picture/remove/
    请求方式: GET
    请求参数:
    usertoken_str: tokenstr
    pic_address: picaddress
    返回值:
    True, 图片删除成功, None
    False, 用户登录已过期，请重新登录, None
    False, 数据库错误, None
    备注：这个API用在用户上传多张图片之后删除其中一张。
    '''
    
    @allow_cross_domain
    def get(self):  
        usertoken = request.args.get("usertoken_str")
        pic_address = request.args.get("pic_address")
        if not all([usertoken,pic_address]):
            return jsonify(Info(False,"参数不足",None).tojson())
        mo = Postorml()
        Infoa = mo.pictureremove(usertoken,pic_address)
        result = jsonify(Infoa)
        return result 
class PostSearch(restful.Resource):
    
    '''
    请求参数:
    usertoken_str: tokenstr
    comment_id: commentid
    reply_str: replystr
    返回值:
    True, 回复成功, None
    False, 用户登录已过期，请重新登录, None
    False, 数据库错误, None
    '''
    
    @allow_cross_domain
    def get(self):#请求方式为POST
        # return "nihao"
        key = request.args.get("key")
        # return key
        po = Postorml()
        Infoa = po.postsearch(key)
        return jsonify(Infoa)  
class PostSearchTitle(restful.Resource):
    
    '''
    请求参数:
    usertoken_str: tokenstr
    comment_id: commentid
    reply_str: replystr
    返回值:
    True, 回复成功, None
    False, 用户登录已过期，请重新登录, None
    False, 数据库错误, None
    '''
    
    @allow_cross_domain
    def get(self):#请求方式为POST
        key = request.args.get("key")
        # return key
        po = Postorml()
        Infoa = po.postsearchtitle(key)
        return jsonify(Infoa)  
class CommentList(restful.Resource):
    
    '''
    请求参数:
    usertoken_str: tokenstr
    comment_id: commentid
    reply_str: replystr
    返回值:
    True, 回复成功, None
    False, 用户登录已过期，请重新登录, None
    False, 数据库错误, None
    '''
    
    @allow_cross_domain
    def get(self):#请求方式为POST
        userid = request.args.get("username")
        # return key
        po = Postorml()
        Infoa = po.commentlist(userid)
        return jsonify(Infoa)  

class PostShow(restful.Resource):
    @allow_cross_domain
    def get(self):#请求方式为POST
        userid = request.args.get("username")
        # return key
        po = Postorml()
        Infoa = po.postshow(userid)
        return jsonify(Infoa)
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
    
