import unittest
import json
import http.client as httplib
import urllib.parse as urllib
from conf import httpserver
from conf import httpport

conn = httplib.HTTPConnection(httpserver, httpport)
header = {"Content-type": "application/x-www-form-urlencoded"}


class TestPost(unittest.TestCase):

    def test_(self): 
        global conn
        keywords = urllib.quote("3")
        conn.request('GET', '/v1/post/list/?category_name=0&startposi=0&pagesize=5')
        data = json.loads(conn.getresponse().read().decode("utf-8"))
        print(data)
        self.assertFalse(data["infostatus"])
        
#    def test_postappend(self):
#        global conn
#        global header
#        params = {"usertoken_str": "jhfjfjyhgjfhjhfjfhj",
#                  "post_title": "登山求好友",
#                  "post_content":"想登山的朋友加好友",
#                  "category_name":"吃喝玩乐"
#                  }
#        params = urllib.urlencode(params)
#        conn.request('POST', '/v1/post/append/', params, header)
#        data = json.loads(conn.getresponse().read().decode("utf-8"))
#        print(data)
#        self.assertTrue(data["infostatus"])    
        
#    def test_postdelete(self):
#        global conn
#        global header
#        params = {"usertoken_str": "jhfjjhgjhfjfjytru",
#                  "post_id": "3",
#                  }
#        params = urllib.urlencode(params)
#        conn.request('POST', '/v1/post/delete/', params, header)
#        data = json.loads(conn.getresponse().read().decode("utf-8"))
#        print(data)
#        self.assertTrue(data["infostatus"])    
        
        
#    def test_mypostlist(self): 
#        global conn
#        conn.request('GET', '/v1/post/mypostlist/?startposi=0&pagesize=5&usertoken_str=jhfjfjyhgjfhjhfjfhj&category_name=1')
#        data = json.loads(conn.getresponse().read().decode("utf-8"))
#        print(data)
#        self.assertFalse(data["infostatus"])   

#    def test_toppost(self):
#        global conn
#        global header
#        params = {"usertoken_str": "jhfjfjyhgjfhjhfjfhj",
#                  "post_id": "5",
#                  "category_name":"1"
#                  }
#        params = urllib.urlencode(params)
#        conn.request('POST', '/v1/post/top/', params, header)
#        data = json.loads(conn.getresponse().read().decode("utf-8"))
#        print(data)
#        self.assertTrue(data["infostatus"])   

#    def test_toppostcancel(self):
#        global conn
#        global header
#        params = {"usertoken_str": "jhfjfjyhgjfhjhfjfhj",
#                  "post_id": "5",
#                  }
#        params = urllib.urlencode(params)
#        conn.request('POST', '/v1/post/top/cancel/', params, header)
#        data = json.loads(conn.getresponse().read().decode("utf-8"))
#        print(data)
#        self.assertTrue(data["infostatus"])

#    def test_postiddetail(self): 
#        global conn
#        conn.request('GET', '/v1/post/id/detail/?post_id=2')
#        data = json.loads(conn.getresponse().read().decode("utf-8"))
#        print(data)
#        self.assertFalse(data["infostatus"])

#    def test_postcomment(self):
#        global conn
#        global header
#        params = {"usertoken_str": "jhfjfjyhgjfhjhfjfhj",
#                  "post_id": "5",
#                  "comment_str": "111111111111111111"
#                  }
#        params = urllib.urlencode(params)
#        conn.request('POST', '/v1/post/comment/', params, header)
#        data = json.loads(conn.getresponse().read().decode("utf-8"))
#        print(data)
#        self.assertTrue(data["infostatus"])

#    def test_postcomment(self):
#        global conn
#        global header
#        params = {"usertoken_str": "jhfjfjyhgjfhjhfjfhj",
#                  "comment_id": "6",
#                  "reply_str": "111111111111111111"
#                  }
#        params = urllib.urlencode(params)
#        conn.request('POST', '/v1/post/reply/', params, header)
#        data = json.loads(conn.getresponse().read().decode("utf-8"))
#        print(data)
#        self.assertTrue(data["infostatus"])








     
