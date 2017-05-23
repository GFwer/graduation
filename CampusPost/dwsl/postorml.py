from orml.dbbase import DBSession
from dbmodels.usermodel import User
from dbmodels.postmodel import Post
from dbmodels.usertokenmodel import Usertoken
from dbmodels.categorymodel import Category
from dbmodels.toppostmodel import Toppost
from dbmodels.picturemodel import Picture
from dbmodels.commentmodel import Comment
from tools.info import Info
from sqlalchemy import desc
from conf import staticserver, staticport
import time
from tools.timetools import Timetools
import os
import demjson

class Postorml:
    
    def postlist(self,startposi,pagesize,categoryname):
        session = DBSession()
        try:
            category_id = session.query(Category.category_id).filter_by(category_name=categoryname).all()
            categoryid = category_id[0][0]
            listdict = []
            if int(startposi) > 0 :
                postlist = session.query(Post.post_title,Post.post_time,Post.post_content,Post.post_userid,Post.post_id).filter_by(post_categoryid=categoryid).order_by(desc(Post.post_time)).offset(startposi).limit(pagesize).all()
                if len(postlist) == 0 :
                    session.close()
                    return Info(True,0,"已经没有帖子了").tojson()   
                for lista in postlist:
                    dicta = {}
                    dicta["post_id"] = lista[4]
                    dicta["post_title"] = lista[0]
                    dicta["post_time"] = lista[1]
                    dicta["post_content"] = lista[2]
                    user_name = session.query(User.user_name,User.user_userlogo).filter_by(user_id=lista[3]).all()
                    username = user_name[0][0]
                    dicta["user_name"] = username
                    userlogo = user_name[0][1]
                    userlogo = 'http://' + str(staticserver) + ":" + str(staticport) + '/logo/' + userlogo
                    dicta["post_userhead"] = userlogo
                    if session.query(Toppost).filter_by(top_postid=lista[4]).count() == 0:
                        dicta["post_topstatu"] = "0"
                    else:
                        dicta["post_topstatu"] = "1"
                    listdict.append(dicta)
                session.close()
                return Info(True,0,listdict).tojson()
            toplistid = session.query(Toppost.top_postid).filter_by(top_categoryid=categoryid).order_by(Toppost.top_time).offset(startposi).limit(pagesize).all()
            toplist_id = []
            for postid in toplistid:
                toplist_id.append(postid)
                dict1 = {}
                postdetail = session.query(Post.post_title,Post.post_time,Post.post_content,Post.post_userid,Post.post_id).filter_by(post_id=postid[0]).all()
                dict1["post_id"] = postdetail[0][4]
                dict1["post_title"] = postdetail[0][0]
                dict1["post_time"] = postdetail[0][1]
                dict1["post_content"] = postdetail[0][2]
                user_name = session.query(User.user_name,User.user_userlogo).filter_by(user_id=postdetail[0][3]).all()
                username = user_name[0][0]
                dict1["user_name"] = username
                userlogo = user_name[0][1]
                if not userlogo:
                    suserlogo = "default.jpg"
                userlogo = 'http://' + str(staticserver) + ":" + str(staticport) + '/logo/' + userlogo
                dict1["post_userhead"] = userlogo
                if session.query(Toppost).filter_by(top_postid=postdetail[0][4]).count() == 0:
                        dict1["post_topstatu"] = "0"
                else:
                        dict1["post_topstatu"] = "1"
                listdict.append(dict1)
            listdictlen = len(listdict)
            if len(listdict) != 0:
                pagesizeafter = int(pagesize) - int(listdictlen)
            else:
                pagesizeafter = int(pagesize)
            postlist = session.query(Post.post_title,Post.post_time,Post.post_content,Post.post_userid,Post.post_id).filter_by(post_categoryid=categoryid).order_by(desc(Post.post_time)).offset(str(startposi)).limit(str(pagesizeafter)).all()
            if len(postlist) == 0 :
                session.close()
                return Info(True,listdictlen,listdict).tojson()   
            for lista in postlist:
                dicta = {}
                dicta["post_id"] = lista[4]
                dicta["post_title"] = lista[0]
                dicta["post_time"] = lista[1]
                dicta["post_content"] = lista[2]
                user_name = session.query(User.user_name,User.user_userlogo).filter_by(user_id=lista[3]).all()
                username = user_name[0][0]
                dicta["user_name"] = username
                userlogo = user_name[0][1]
                userlogo = 'http://' + str(staticserver) + ":" + str(staticport) + '/logo/' + userlogo
                dicta["post_userhead"] = userlogo
                if session.query(Toppost).filter_by(top_postid=lista[4]).count() == 0:
                        dicta["post_topstatu"] = "0"
                else:
                        dicta["post_topstatu"] = "1"
                listdict.append(dicta)
            listdictafter = []
            lengh = int(pagesize) - int(startposi)
            if len(listdict) < lengh:
                session.close()
                return Info(True,listdictlen,listdict).tojson()
            for a in listdict:
                if a not in listdictafter:
                    listdictafter.append(a)
            allpagesize = session.query(Post).filter_by(post_categoryid=categoryid).count()
            while len(listdictafter) < int(pagesize) and len(listdictafter) < allpagesize:
                b = int(startposi) + len(listdictafter)
                c = int(pagesize) - len(listdictafter)
                postlistb = session.query(Post.post_title,Post.post_time,Post.post_content,Post.post_userid,Post.post_id).filter_by(post_categoryid=categoryid).order_by(desc(Post.post_time)).offset(str(b)).limit(str(c)).all()
                listdict = listdictafter
                for lista in postlistb:
                    dicta = {}
                    dicta["post_id"] = lista[4]
                    dicta["post_title"] = lista[0]
                    dicta["post_time"] = lista[1]
                    dicta["post_content"] = lista[2]
                    user_name = session.query(User.user_name,User.user_userlogo).filter_by(user_id=lista[3]).all()
                    username = user_name[0][0]
                    dicta["user_name"] = username
                    userlogo = user_name[0][1]
                    userlogo = 'http://' + str(staticserver) + ":" + str(staticport) + '/logo/' + userlogo
                    dicta["post_userhead"] = userlogo
                    if session.query(Toppost).filter_by(top_postid=lista[4]).count() == 0:
                        dicta["post_topstatu"] = "0"
                    else:
                        dicta["post_topstatu"] = "1"
                    listdict.append(dicta)    
                listdictafter = []
                for a in listdict:
                    if a not in listdictafter:
                        listdictafter.append(a)   
            session.close()
            return Info(True,listdictlen,listdictafter).tojson()
        except Exception as a:
            print(a)
            session.close()
            return Info(False, '数据库错误', None).tojson()
  
    def postappend(self,usertoken,posttitle,postcontent,categoryname,postpics):
        session = DBSession()
        try:
            if session.query(Usertoken).filter_by(usertoken_str=usertoken).count() == 0:
                return Info(False, '无效的用户，登陆断开连接', None).tojson()
            user_id = session.query(Usertoken.usertoken_userid).filter_by(usertoken_str=usertoken).all()
            userid = user_id[0][0]
            category_id = session.query(Category.category_id).filter_by(category_name=categoryname).all()
            categoryid = category_id[0][0]
            posttime = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime())
            session.add(Post(post_categoryid=categoryid,
                             post_userid=userid,
                             post_title=posttitle,
                             post_time=posttime,
                             post_content=postcontent))
            post_id = session.query(Post.post_id).filter_by(post_userid=userid,post_title=posttitle,post_time=posttime).all()
            postid = post_id[0][0]
            postpics = demjson.decode(postpics)                
            for pics in postpics:
                picslist = pics.split('/')
                picsname = picslist[-1]
                session.add(Picture(picture_name=picsname,
                                    picture_postid=postid,
                                    picture_url=picsname))
            session.commit()
            session.close()
            return Info(True,'发布成功',None).tojson()
        except Exception as a:
            print(a)
            session.rollback()
            session.close
            return Info(False, '数据库错误', None).tojson()
            
    def postdelete(self,usertoken,postid):    
        session = DBSession()
        try:
            if session.query(Usertoken).filter_by(usertoken_str=usertoken).count() == 0:
                return Info(False, '无效的用户，登陆断开连接', None).tojson()     
            user_id = session.query(Usertoken.usertoken_userid).filter_by(usertoken_str=usertoken).all()
            userid1 = user_id[0][0]
            if session.query(Post).filter_by(post_id=postid).count() == 0:
                return Info(False, '没有该帖子', None).tojson() 
            user_id2 = session.query(Post.post_userid).filter_by(post_id=postid).all()
            userid2 = user_id2[0][0]
            print(userid1)
            print(userid2)
            if userid1 != userid2 :
                return Info(False, '没有操作的权限', None).tojson()
            if session.query(Picture).filter_by(picture_postid=postid).count() > 0:
                session.query(Picture).filter_by(picture_postid=postid).delete()
            if session.query(Comment).filter_by(comment_postid=postid).count() > 0 :
                session.query(Comment).filter_by(comment_postid=postid).delete()
            if session.query(Toppost).filter_by(top_postid=postid).count() > 0:
                session.query(Toppost).filter_by(top_postid=postid).delete() 
            session.query(Post).filter_by(post_id=postid,post_userid=userid1).delete()
            session.commit()
            session.close()
            return Info(True,'删除帖子成功',None).tojson()
        except Exception as a:
            print(a)
            session.rollback()
            session.close
            return Info(False, '数据库错误', None).tojson()
    
    def mypostlist(self,startposi,pagesize,usertoken,categoryname):            
        session = DBSession()
        try:
            if session.query(Usertoken).filter_by(usertoken_str=usertoken).count() == 0:
                return Info(False, '无效的用户，登陆断开连接', None).tojson()
            user_id = session.query(Usertoken.usertoken_userid).filter_by(usertoken_str=usertoken).all()
            userid = user_id[0][0]
            user_logo = session.query(User.user_userlogo).filter_by(user_id = userid).all()
            userlogo = user_logo[0][0]
            if not userlogo:
                userlogo = "default.jpg"
            userlogo = 'http://' + str(staticserver) + ":" + str(staticport) + '/logo/' + userlogo
            category_id = session.query(Category.category_id).filter_by(category_name=categoryname).all()
            categoryid = category_id[0][0]
            postlist = session.query(Post.post_title,Post.post_time,Post.post_content,Post.post_categoryid,Post.post_id).filter_by(post_userid=userid,post_categoryid=categoryid).order_by(desc(Post.post_time)).offset(startposi).limit(pagesize).all()
            listpost = []    
            for postdetail in postlist:
                postdict = {}
                postdict["post_id"] = postdetail[4]
                postdict["post_title"] = postdetail[0]
                postdict["post_content"] = postdetail[2]
                user_name = session.query(User.user_name).filter_by(user_id=userid).all()
                username = user_name[0][0]
                postdict["user_name"] = username
                tt = Timetools()
                postdict["post_time"] = tt.timetonow(postdetail[1])
                category_name = session.query(Category.category_name).filter_by(category_id=postdetail[3]).all()
                categoryname = category_name[0][0]
                postdict["category_name"] = categoryname
                postdict["post_userhead"] = userlogo
                picturelist = []
                picture = session.query(Picture.picture_url).filter_by(picture_postid=postdetail[4]).all()
                for pic in picture:
                    pictureurl = 'http://' + str(staticserver) + ":" + str(staticport) + '/pics/' + pic[0]
                    picturelist.append(pictureurl)
                postdict["picture_url"] = picturelist
                listpost.append(postdict)
            session.close()
            return Info(True,'返回我发布的帖子列表成功',listpost).tojson()
        except Exception as a:
            print(a)
            session.close()
            return Info(False, '数据库错误', None).tojson()
                
    def posttop(self,usertoken,postid,categoryname):
        session = DBSession()
        try:
            if session.query(Usertoken).filter_by(usertoken_str=usertoken).count() == 0:
                return Info(False, '无效的用户，登陆断开连接', None).tojson()
            user_id = session.query(Usertoken.usertoken_userid).filter_by(usertoken_str=usertoken).all()
            userid =user_id[0][0]                   
            user_privilege = session.query(User.user_privilege).filter_by(user_id=userid).all()
            userprivilege = user_privilege[0][0]
            if userprivilege == 0:
                return Info(False, '用户没有操作权限', None).tojson()
            category_id = session.query(Category.category_id).filter_by(category_name=categoryname).all()
            categoryid = category_id[0][0]
            topposttime = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime())
            if session.query(Toppost).filter_by(top_postid=postid).count() > 0:
                return Info(False, '该帖子已经置顶，不能重复置顶帖子', None).tojson()    
            session.add(Toppost(top_postid=postid,
                                top_time=topposttime,
                                top_categoryid=categoryid))
            session.commit()
            session.close()
            return Info(True,'置顶成功',None).tojson()
        except Exception as a:
            print(a)
            session.rollback()
            session.close()
            return Info(False, '数据库错误', None).tojson()   
                
    def posttopcancel(self,usertoken,postid):
        session = DBSession()
        try:                                
            if session.query(Usertoken).filter_by(usertoken_str=usertoken).count() == 0:
                return Info(False, '无效的用户，登陆断开连接', None).tojson()
            user_id = session.query(Usertoken.usertoken_userid).filter_by(usertoken_str=usertoken).all()
            userid =user_id[0][0]                   
            user_privilege = session.query(User.user_privilege).filter_by(user_id=userid).all()
            userprivilege = user_privilege[0][0]
            if userprivilege == 0:
                return Info(False, '用户没有操作权限', None).tojson()
            session.query(Toppost).filter_by(top_postid=postid).delete()
            session.commit()
            session.close()
            return Info(True,'删除成功',None).tojson()
        except Exception as a:
            print(a)
            session.rollback()
            session.close()
            return Info(False, '数据库错误', None).tojson() 
   
    def postiddetail(self,postid):
        session = DBSession()
        try:                                
            postlist = session.query(Post.post_userid,Post.post_title,Post.post_content,Post.post_time).filter_by(post_id=postid).all();
            postdetail = {}
            postdetail["post_id"] = postid
            postdetail["post_userid"] = postlist[0][0]
            userdetail = session.query(User.user_name,User.user_userlogo).filter_by(user_id=postlist[0][0]).all()
            postdetail["post_username"] = userdetail[0][0]
            userlogo = userdetail[0][1]
            if not userlogo:
                userlogo = "default.jpg"
            userlogo = 'http://' + str(staticserver) + ":" + str(staticport) + '/logo/' + userlogo
            postdetail["post_userhead"] = userlogo
            postdetail["post_title"] = postlist[0][1]
            postdetail["post_content"] = postlist[0][2]
            tt = Timetools()
            postdetail["post_time"] = tt.timetonow(postlist[0][3])
            picturelist = []
            picture = session.query(Picture.picture_url).filter_by(picture_postid=postid).all()
            for pic in picture:
                pictureurl = 'http://' + str(staticserver) + ":" + str(staticport) + '/pics/' + pic[0]
                picturelist.append(pictureurl)         
            postdetail["post_pics"] = picturelist
            comment = session.query(Comment.comment_id,Comment.comment_userid,Comment.comment_text,Comment.comment_datetime).filter_by(comment_postid=postid).order_by(desc(Comment.comment_datetime)).all() 
            commentlist = []
            for y in comment:
                commentdict = {}
                commentdict['comment_id'] = y[0]
                commentdict['comment_userid'] = y[1]
                username1 = session.query(User.user_name).filter_by(user_id=y[1]).all()
                username1 = username1[0][0]
                commentdict['comment_username'] = username1
                userlogo = session.query(User.user_userlogo).filter_by(user_id=y[1]).all()
                userlogo = userlogo[0][0]
                if not userlogo:
                    userlogo = "default.jpg"
                userlogo = 'http://' + staticserver + ':' + staticport +'/logo/'+userlogo 
                commentdict['comment_userhead'] = userlogo
                commentdict['comment_text'] = y[2]
                commentdict['comment_datetime'] = y[3]
                commentlist.append(commentdict)
            commentlist.sort(key = lambda x : x['comment_datetime'],reverse=False)
            for x in commentlist:
                x['comment_datetime'] = tt.timetonow(x['comment_datetime'])    
            postdetail['post_comments'] = commentlist
            return Info(True,'返回成功',postdetail).tojson()
            session.commit()
            session.close()
        except Exception as a:
            print(a)
            session.close()
            return Info(False, '数据库错误', None).tojson()   
                
    def postcomment(self,usertoken_str,post_id,comment_str):        
        session = DBSession()
        try:
            if not comment_str:
                session.close()
                return Info(False, '评论不能为空', None).tojson() 
            if session.query(Usertoken).filter_by(usertoken_str=usertoken_str).count() == 0:
                session.close()
                return Info(False, '用户登录已过期，请重新登录', None).tojson()
            if session.query(Post).filter_by(post_id=post_id).count() == 0:
                session.close()
                return Info(False, '该货单不存在', None).tojson()
            userid = session.query(Usertoken.usertoken_userid).filter_by(usertoken_str=usertoken_str).all()
            userid = userid[0][0]    
            nowtime = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime())
            session.add(Comment(comment_postid=post_id,
                                comment_userid=userid,
                                comment_text=comment_str,
                                comment_datetime=nowtime))
            session.commit()
            session.close()
            return Info(True, '评论成功', None).tojson()
        except Exception as a:
            print(a)
            session.rollback()
            session.close()
            return Info(False, '数据库错误', None).tojson()                
                
    def postreply(self,usertoken_str,comment_id,reply_str):        
        session = DBSession()
        try:
            if not reply_str:
                session.close()
                return Info(False, '回复不能为空', None).tojson()
            if session.query(Usertoken).filter_by(usertoken_str=usertoken_str).count() == 0:
                session.close()
                return Info(False, '用户登录已过期，请重新登录', None).tojson()
            user_id = session.query(Usertoken.usertoken_userid).filter_by(usertoken_str=usertoken_str).all()
            userid = user_id[0][0]
            if session.query(Comment).filter_by(comment_id=comment_id).count() == 0:
                session.close()
                return Info(False, '该评论不存在', None).tojson()
            post_id = session.query(Comment.comment_postid).filter_by(comment_id=comment_id).all()
            postid = post_id[0][0]    
            nowtime = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime())
            session.add(Comment(comment_postid=postid,
                                comment_userid=userid,
                                comment_text=reply_str,
                                comment_datetime=nowti
me))
            session.commit()
            session.close()
            return Info(True, '回复成功', None).tojson()
        except Exception as a:
            print(a)
            session.rollback()
            session.close()
            return Info(False, '数据库错误', None).tojson()                      
                
    def pictureremove(self,usertoken,pic_address):            
        session = DBSession()
        try:
            if session.query(Usertoken).filter_by(usertoken_str=usertoken).count() == 0:
                session.close()
                return Info(False, '用户登录已过期，请重新登录', None).tojson()
            pic_address = pic_address.split('/')
            pic_address = pic_address[-1]
            if not pic_address:
                return Info(False, '输入的地址格式错误，"/"分割后最后一个元素应该为图片名称', None).tojson()
            else:
                if os.path.exists('/home/fawen/shome/CampusPost/picture/pics/'+pic_address):
                    os.remove('/home/fawen/shome/CampusPost/picture/pics/'+pic_address)
                else:
                    session.close()
                    return Info(True, '你要删除的图片不存在', None).tojson() 
            session.close()
            return Info(True, '图片删除成功', None).tojson()
        except Exception as a:
            print(a)
            session.close()
            return Info(False, '数据库错误', None).tojson()                 
                
                
                
                
                
                
                
                
                
            
            
            
            
            
            
            
            
            
            
            
            
            
            
