from flask import Flask
from flask.ext import restful
from dapis.v1 import routedict as api_v1
from orml import createtable
from conf import httpserver
from conf import httpport
from conf import debugstatus

app = Flask(__name__)
api = restful.Api(app)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
for k, v in api_v1.items():
    api.add_resource(k, v)

if __name__ == '__main__': 
    print("dbserver started on http://" +
          str(httpserver) + ":" + str(httpport))
    app.run(host=httpserver, port=int(httpport), debug=debugstatus)
