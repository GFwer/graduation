#import unittest
#import json
#import http.client as httplib
#import urllib.parse as urllib
#from conf import httpserver
#from conf import httpport

#conn = httplib.HTTPConnection(httpserver, httpport)
#header = {"Content-type": "application/x-www-form-urlencoded"}


#class TestUser(unittest.TestCase):
#        
##    def test_checkuserexist(self): 
##        global conn
##        conn.request('GET', '/v1/user/signup/?user_name=Tom')
##        data = json.loads(conn.getresponse().read().decode("utf-8"))
##        print(data)
##        self.assertFalse(data["infostatus"])

##    def test_adduser(self):
##        global conn
##        global header
##        params = {"user_name": "Tom",
##                  "user_password": "123456"
##                  }
##        params = urllib.urlencode(params)
##        conn.request('POST', '/v1/user/signup/', params, header)
##        data = json.loads(conn.getresponse().read().decode("utf-8"))
##        print(data)
##        self.assertTrue(data["infostatus"])

#    def test_checklogin1(self):
#        global conn
#        global header
#        params = {"user_name": "Tom",
#                  "user_password": "123456"}
#        params = urllib.urlencode(params)
#        conn.request('POST', '/v1/user/login/', params, header)
#        data = json.loads(conn.getresponse().read().decode("utf-8"))
#        print(data)
#        self.assertTrue(data["infostatus"])

##    def test_tokendelete(self):
##        global conn
##        global header
##        params = {"usertoken_str": "4d61246e-69ef-4fb4-a346-a599c1aff79b"}
##        params = urllib.urlencode(params)
##        conn.request('POST', '/v1/token/delete/', params, header)
##        data = json.loads(conn.getresponse().read().decode("utf-8"))
##        print(data)
##        self.assertTrue(data["infostatus"])
