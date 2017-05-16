from PIL import Image, ImageDraw, ImageFont
import random
import math
import hashlib
from time import strftime, localtime
import os


class GenerateCode:

    def __init__(self):
        self.saltpoint = 3
        self.length = 6
        self.colorlist = []
        self.width = 30 * (self.length + 1)
        self.height = 50
        self.bgcolor = (255, 255, 255)
        self.font = ImageFont.truetype('fonts/Ubuntu-MI.ttf', 30)
        dateroot = strftime("%Y_%m_%d", localtime())
        self.rootdir = "pic/" + dateroot + "/"
        if not os.path.exists(self.rootdir):
            os.mkdir(self.rootdir)

    def getfilename(self, codestr):
        newcodestr = codestr + codestr[self.saltpoint:]
        filename = hashlib.md5(newcodestr.encode("utf-8")).hexdigest()
        return filename

    def getcode(self):
        letterlist = [chr(x) for x in range(65, 91)] + [str(x)
                                                        for x in range(1, 10)]
        codestr = ''.join(random.sample(letterlist, self.length))
        filename = self.getfilename(codestr)
        return self.makepic(codestr, filename)

    def drawtext(self, image, codestr):
        x = 0
        draw = ImageDraw.Draw(image)
        for char in codestr:
            y = random.randint(1, 20)
            colorx = random.randint(0, 200)
            colory = random.randint(0, 200)
            colorz = random.randint(0, 200)
            fontcolor = (colorx, colory, colorz)
            self.colorlist.append(fontcolor)
            x = x + random.randint(16, 30)
            draw.text((x, y), char, font=self.font, fill=fontcolor)
        return image

    def drawlines(self, image):
        draw = ImageDraw.Draw(image)
        for i in range(0, 10):
            x1 = random.randint(0, self.width)
            x2 = random.randint(0, self.width)
            x3 = random.randint(0, self.width)
            x4 = random.randint(0, self.width)
            y1 = random.randint(0, self.height)
            y2 = random.randint(0, self.height)
            y3 = random.randint(0, self.height)
            y4 = random.randint(0, self.height)
            draw.polygon(
                [(x1, y1), (x2, y2), (x3, y3), (x4, y4)],
                outline=random.choice(self.colorlist))
        return image

    def makepic(self, codestr, filename):
        image = Image.new('RGB', (self.width, self.height), self. bgcolor)
        image = self.drawtext(image, codestr)
        image = self.drawlines(image)
        filepath = self.rootdir + filename + ".jpg"
        image.save(filepath)
        staticpath = "/".join(filepath.split("/")[1:])
        return (filename, filepath, staticpath)
