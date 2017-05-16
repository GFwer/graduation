from flask.ext import restful
from flask import request
from flask import jsonify
from flask import Response
from conf import httpserver, httpport
from tools.crossdomain import allow_cross_domain
from orml.userorml import Userorml

class CheckUserExist(restful.Resource): 

    '''
    请求方式: GET
    请求参数:
    user_name: username
    返回值:
    True,可以使用的用户名,None;
    False,该用户名已被占用,None;
    False,数据库错误,None
    备注: 考虑如何提示用户更舒服
    '''

    @allow_cross_domain
    def get(self): #请求方式为GET
        username = request.args.get("user_name") #"username"为测试传过来的参数
        if not all([username]):
            return jsonify(Info(False,'参数不足', None ).tojson())
        uo = Userorml()   #类实例化的对象
        Infoa = uo.checkuserexist(username)
        return jsonify(Infoa)

    '''
    请求方式: POST
    请求参数:
    user_name : Jack
    user_password : jack123
    返回值:
    True,注册成功,None;
    False,数据库错误,None
    '''

class AddUser(restful.Resource): 
    
    @allow_cross_domain
    def post(self):#请求方式为POST
        username = request.form["user_name"]
        userpassword = request.form["user_password"]
        if not all([username,userpassword]):
            return jsonify(Info(False,'参数不足', None ).tojson())
        uo = Userorml()
        Infoa = uo.adduser(username,userpassword)
        return jsonify(Infoa)

class CheckLogin(restful.Resource):
    '''
    请求方式: POST
    请求参数:
    user_name : Jack
    user_password : jack123
    user_privilege : 用户 
    返回值:
    True,登录成功,usertoken;
    False,用户名或密码错误,None;
    False,数据库错误,None
    '''

    @allow_cross_domain
    def post(self):
        username = request.form["user_name"]
        password = request.form["user_password"]
        if not all([username,password]):
            return jsonify(Info(False,'参数不足', None ).tojson())
        uo = Userorml()
        Infoa = uo.checklogin(username, password) 
        return jsonify(Infoa)

class TokenDelete(restful.Resource):
    '''
    请求方式: POST
    请求参数:
    usertoken_str : usertoken
    返回值:
    True,成功删除usertoken,None;
    False,数据库错误,None
    '''

    @allow_cross_domain
    def post(self):
        usertoken = request.form["usertoken_str"]
        uo = Userorml()
        Infoa = uo.tokendelete(usertoken)
        return jsonify(Infoa) 




















