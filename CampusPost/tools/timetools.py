import time
import datetime


class Timetools:

    '''
    日期转换工具
    '''

    def __init__(self):
        self.timeformatter = '%Y-%m-%d %H:%M:%S'  # 时间格式字符串
        self.dateformatter = '%Y年%m月%d日'  # 日期格式字符串
        self.maxdatespan = 50  # 大于100天差距，显示当时的日期

    def timetostr(self, ttime):
        '''
        把一个time类的对象转成字符串
        '''
        return time.strftime(self.timeformatter, ttime)

    def strtotime(self, tstr):
        '''
        把一个日期字符串转成time类的对象
        '''
        return time.strptime(tstr, self.timeformatter)

    def timetodatetime(self, ti):
        '''
        把一个time类的对象转成datetime类的对象
        '''
        return datetime.datetime(
            ti.tm_year, ti.tm_mon, ti.tm_mday, ti.tm_hour, ti.tm_min, ti.tm_sec)

    def timestrtodatestr(self, tistr):
        '''
        用日期格式字符串格式化一个time类对象的字符串形式
        '''
        ts = self.strtotime(tistr)
        return time.strftime(self.dateformatter, ts)

    def sectoother(self, secs):
        '''
        一天之内，秒转成小时和分钟
        '''
        if secs / 3600 > 1:
            return str(int(secs / 3600)) + "小时前"
        elif secs / 60 > 1:
            return str(int(secs / 60)) + "分钟前"
        else:
            return str(int(secs)) + "秒前"

    def timetonow(self, tstr):
        '''
        计算某个日期字符串距离当前日期的时间差，返回可读格式
        '''
        now = time.localtime()
        last = self.strtotime(tstr)
        dnow = self.timetodatetime(now)
        dlast = self.timetodatetime(last)
        span = dnow - dlast
        if span.days > self.maxdatespan:
            return self.timestrtodatestr(tstr)
        elif span.days > 0:
            return str(span.days) + "天前"
        else:
            return self.sectoother(int(span.seconds))

if __name__ == "__main__":
    th = Timetools()
    tstr = th.timetostr(time.localtime())
    print(tstr)
    tdate = th.strtotime(tstr)
    print(tdate)
    tstrlist = ["2016-01-08 19:50:00",
                "2016-05-05 19:50:00",
                "2016-05-09 10:50:00",
                "2016-05-10 10:50:00",
                "2016-05-10 19:20:00",
                "2016-05-10 20:00:00",
                "2016-05-31 22:36:35"
                ]
    tstrlist = [th.timetonow(x) for x in tstrlist]
    print(tstrlist)
