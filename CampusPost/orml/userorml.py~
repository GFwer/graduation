from orml.dbbase import DBSession
from dbmodels.usermodel import User
from dbmodels.usertokenmodel import Usertoken
from tools.info import Info
import uuid

class Userorml:

    def checkuserexist(self, username):
        session = DBSession()
        try:
            if session.query(User.user_id).filter(User.user_name == username).count() == 0:
                session.close()
                return Info(True, '可以使用的用户名', None).tojson()
            else:
                session.close()
                return Info(False, '该用户名已被占用', None).tojson()
        except Exception as a:
            print(a)
            session.close()
            return Info(False, '数据库错误', None).tojson()

    def adduser(self,username, userpassword):
        session = DBSession()
        try:
            if len(username) > 16:
                return Info(False, '用户名不合法', None).tojson()
            if session.query(User).filter_by(user_name=username).count() > 0:
                session.close()
                return Info(False, '用户名已被占用', None).tojson()
            else: 
                session.add(User(user_name = username,
                                 user_password = userpassword,
                                 user_privilege = 0,
                                 user_userlogo = "default.jpg",
                                 ))
                session.commit()
                session.close()
                return Info(True, '注册成功',None).tojson()
        except Exception as a:
            print(a)
            session.rollback()
            session.close()
            return Info(False, '数据库错误', None).tojson()

    def checklogin(self, username, password):
        session = DBSession()
        try:
            if session.query(User).filter_by(user_name=username, user_password=password).count() > 0:
                user = session.query(User.user_id,User.user_privilege).filter_by(
                user_name=username).all()
                userid = user[0][0]
                userprivilege = user[0][1]
                usertoken = str(uuid.uuid4())
                userdict = {}
                userdict['usertoken_str'] = usertoken
                userdict['user_privilege'] = userprivilege            
                if session.query(Usertoken).filter_by(usertoken_userid=userid).count() > 0:
                    session.query(Usertoken).filter_by(usertoken_userid=userid).delete()
                    session.add(Usertoken(usertoken_str=usertoken, usertoken_userid=userid))
                    session.commit()
                    session.close()
                else:
                    session.add(Usertoken(usertoken_str=usertoken,usertoken_userid=userid))
                    session.commit()
                    session.close()
                return Info(True, '登录成功', userdict).tojson()
            else:
                session.close()
                return Info(False, '用户名或密码错误', None).tojson()
        except Exception as a:
            print(a)
            session.close()
            return Info(False, '数据库错误', None).tojson()

    def tokendelete(self,usertoken):
        session = DBSession()
        try:
            session.query(Usertoken).filter_by(usertoken_str=usertoken).delete()
            session.commit()
            session.close()
            return Info(True,'成功删除usertoken',None).tojson()
        except Exception as a:
            print(a)
            session.rollback()
            session.close()
            return Info(False, '数据库错误', None).tojson()
