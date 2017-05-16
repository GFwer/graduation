from sqlalchemy import Column, String, Integer
from orml.dbbase import Base
from conf import table_args
from sqlalchemy import ForeignKey

class Usertoken(Base):
    __table_args__ = table_args
    __tablename__ = 'usertoken'
    usertoken_str = Column(String(100),primary_key=True)
    usertoken_userid = Column(Integer, ForeignKey('user.user_id'))
