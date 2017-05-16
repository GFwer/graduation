from sqlalchemy import Column, String, Integer
from orml.dbbase import Base
from conf import table_args
from sqlalchemy import ForeignKey

class Toppost(Base):
    __table_args__ = table_args
    __tablename__ = 'toppost'
    top_id = Column(Integer, primary_key=True)
    top_postid = Column(Integer, ForeignKey('post.post_id'))
    top_time = Column(String(100))
    top_categoryid = Column(Integer,ForeignKey('category.category_id'))
