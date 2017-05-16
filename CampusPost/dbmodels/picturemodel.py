from sqlalchemy import Column, String, Integer
from orml.dbbase import Base
from conf import table_args
from sqlalchemy import ForeignKey

class Picture(Base):
    __table_args__ = table_args
    __tablename__ = 'picture'
    picture_id = Column(Integer, primary_key=True)
    picture_name = Column(String(200))
    picture_url = Column(String(200))
    picture_postid = Column(Integer,ForeignKey('post.post_id'))

