from sqlalchemy import Column, String, Integer
from orml.dbbase import Base
from conf import table_args
from sqlalchemy import ForeignKey

class Post(Base):
    __table_args__ = table_args
    __tablename__ = 'post'
    post_id = Column(Integer, primary_key=True)
    post_categoryid = Column(Integer,ForeignKey('category.category_id'))
    post_userid = Column(Integer,ForeignKey('user.user_id'))
    post_title = Column(String(500))
    post_time = Column(String(100))
    post_content = Column(String(2000))

