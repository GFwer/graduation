from sqlalchemy import Column, String, Integer
from orml.dbbase import Base
from conf import table_args
from sqlalchemy import ForeignKey

class Comment(Base):
    __table_args__ = table_args
    __tablename__ = 'comment'
    comment_id = Column(Integer, primary_key=True)
    comment_postid = Column(Integer,ForeignKey('post.post_id'))
    comment_userid = Column(Integer,ForeignKey('user.user_id'))
    comment_text = Column(String(2000))
    comment_datetime = Column(String(100))

