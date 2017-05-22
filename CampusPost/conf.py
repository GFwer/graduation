# 用于处理mysql中文的存储
table_args = {
    'mysql_engine': 'InnoDB',
    'mysql_charset': 'utf8'
}
# 用于测试的服务器和端口，注意这里不能用http://以下两个二选一或自行修改

# httpserver = "127.0.0.1"
httpserver = "104.224.132.92"



httpport = "6500"   # 5000
# 静态文件的服务器和端口
staticserver = "127.0.0.1"
staticport = "6600"  # 5500
# 用于日志配置
formatstr = "%(asctime)s\t%(name)s\t%(pathname)s\t%(lineno)d\t%(message)s\t%(funcName)s\t%(levelname)s"
logdir = "log"
loggername = "reachmedown"
# 清除过时的文件
plansched = "04:00"


# 用于sqlalchemy配置
sqlecho = True
# 测试配置
debugstatus = True
#python3 devmain.py运行
#修改js/URL.js和js/myjs/conf.js
