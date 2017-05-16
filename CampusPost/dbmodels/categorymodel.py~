from sqlalchemy import Column, String, Integer
from orml.dbbase import Base
from conf import table_args
from sqlalchemy import ForeignKey

class Category(Base):
    __table_args__ = table_args
    __tablename__ = 'category'
    category_id = Column(Integer,primary_key=True)
    category_name = Column(String(20))
