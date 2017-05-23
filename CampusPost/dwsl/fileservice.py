from flask.ext import restful
from flask import request
from flask import jsonify
from flask import Response
from tools.info import Info
from tools.crossdomain import allow_cross_domain
import os
import json
import time
from tools.generatecode import GenerateCode
from conf import staticserver, staticport
from tools.cutimage import ImageCut
from PIL import Image

class Webpicupload(restful.Resource):

    '''
    路径: /v1/manifest/web/pics/
    请求方式: OPTION POST
    请求参数:
    files[]: image
    返回值:
    True, http://192.168.1.100:8030/pics/1.png, None
    False, 图片过小（不小于480px * 360px）, None
    False, 图片过大（不大于2400px * 1800px）, None
    '''

    @allow_cross_domain
    def options(self):
        return jsonify(Info(True, None, None).tojson())

    @allow_cross_domain
    def post(self):
        file = request.files["files[]"]
        img = Image.open(file)
        width = list(img.size)[1]
        length = list(img.size)[0]
        if width < 480 or length < 640 :
            return jsonify(Info(False,"图片过小（不小于480px * 360px）",None).tojson())
        if width > 2400 or length > 1800 :
            return jsonify(Info(False,"图片过大（不大于2400px * 1800px）",None).tojson())
        nowtime = time.strftime('%Y-%m-%d',time.localtime())
        if os.path.exists('/home/fawen/shome/CampusPost/picture/temp/'+nowtime):
            newfaddr = "/home/fawen/shome/CampusPost/picture/temp/" + nowtime + '/' + file.filename
            img.save(newfaddr)
        else:
            os.mkdir('/home/fawen/shome/CampusPost/picture/temp/'+nowtime)
            newfaddr = "/home/fawen/shome/CampusPost/picture/temp/" + nowtime + '/' + file.filename
            img.save(newfaddr)
        return jsonify(Info(True, "http://" + str(staticserver) + ":" + str(staticport) + "/temp/" + nowtime +'/' + file.filename, None).tojson())


class PostImageCutService(restful.Resource):

    '''
    路径: /v1/file/imagecut/
    请求方式: GET
    请求参数:
    filename: filename
    x1: x1
    y1: y1
    x2: x2
    y2: y2
    cw: cw
    ch: ch
    返回值:
    True, http://192.168.1.100:8030/logo/1.png, None
    False, 数据库错误, None


    '''
    @allow_cross_domain
    def get(self):
        x1 = request.args.get("x1")
        y1 = request.args.get("y1")
        x2 = request.args.get("x2")
        y2 = request.args.get("y2")
        cw = request.args.get("cw")
        ch = request.args.get("ch")
        nowtime = time.strftime('%Y-%m-%d',time.localtime())
        filename = "/home/fawen/shome/CampusPost/picture/temp/" + nowtime + '/' + request.args.get("filename").split("/")[-1]
        ci = ImageCut()
        faddr = "http://" + str(staticserver) + ":" + str(
            staticport) + "/pics/" + ci.cutpics(filename, x1, x2, y1, y2, cw, ch).split("/")[-1]
        print(faddr)
        return jsonify(Info(True, faddr, None).tojson())
        

