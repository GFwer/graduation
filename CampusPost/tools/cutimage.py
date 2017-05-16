from PIL import Image
import uuid
import os
import time

class ImageCut:

    def cutpics(self, filename, x1, x2, y1, y2, cw, ch):
        newfname = str(uuid.uuid1()) + ".jpg"
        img = Image.open(filename)
        img = img.resize((360, 480), Image.ANTIALIAS)
        x1 = int(x1)
        x2 = int(x2)
        y1 = int(y1)
        y2 = int(y2)
        cw = int(cw)
        ch = int(ch)
        region = (x1, y1, x2, y2)
        cropimg = img.crop(region) 
        newfaddr = "/home/fris/公共的/CampusPost/picture/pics/" + newfname
        cropimg.save(newfaddr)
        os.remove(filename)
        return newfaddr
