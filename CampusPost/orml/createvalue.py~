from dbmodels.categorymodel import Category
from dbmodels.commentmodel import Comment
from dbmodels.picturemodel import Picture
from dbmodels.postmodel import Post
from dbmodels.toppostmodel import Toppost
from dbmodels.usermodel import User
from dbmodels.usertokenmodel import Usertoken

from orml.dbbase import DBSession

session = DBSession()

if session.query(User).count() == 0:
    Userlist = [User(user_id=2,user_name="Tom",user_password='123456',user_privilege=1,user_userlogo='head.png'),       
                  User(user_id=4,user_name="Alis",user_password='123456',user_privilege=0,user_userlogo='head.png'),
                  User(user_id=6,user_name="Mike",user_password='123456',user_privilege=0,user_userlogo='head.png'),
                  User(user_id=7,user_name="long",user_password='123456',user_privilege=1,user_userlogo='head.png')]
    for ul in Userlist:
        session.add(ul)

if session.query(Usertoken).count() == 0:
    Usertokenlist = [Usertoken(usertoken_str="jhfjfjyhgjfhjhfjfhj",usertoken_userid=2),
                  Usertoken(usertoken_str="jhfjjhgjhfjfjytru",usertoken_userid=4),
                  Usertoken(usertoken_str="aerqtresyreyeyt",usertoken_userid=6)]
    for ll in Usertokenlist:
        session.add(ll)

if session.query(Category).count() == 0:
    categorylist = [Category(category_id=1,category_name='0'),#校内信息
                Category(category_id=2,category_name='1'),#学习交流
                Category(category_id=3,category_name="2"),#吃喝玩乐
                Category(category_id=4,category_name='3')]#失误招领
    for cl in categorylist:
       session.add(cl)

if session.query(Post).count() == 0:
    Postlist = [Post(post_id=2,post_categoryid='1',post_userid=2,post_title='123456123456123456123456',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=3,post_categoryid='1',post_userid=4,post_title='333333333333',post_time='2016-10-12 18:33:14',post_content='33333333333333333'),
                Post(post_id=4,post_categoryid='2',post_userid=2,post_title='44444444444444',post_time='2016-10-12 19:33:14',post_content='444444444444'),
                Post(post_id=5,post_categoryid='2',post_userid=7,post_title='55555555555555555',post_time='2016-10-12 20:33:14',post_content='555555555555555'),
                Post(post_id=6,post_categoryid='2',post_userid=6,post_title='66666666666',post_time='2016-10-12 21:33:14',post_content='666666666666666'),
                Post(post_id=7,post_categoryid='2',post_userid=4,post_title='7777777777777',post_time='2016-10-12 22:33:14',post_content='777777777777777777'),
                Post(post_id=8,post_categoryid='2',post_userid=2,post_title='88888888888',post_time='2016-10-12 23:33:14',post_content='88888888888888888'),
                Post(post_id=9,post_categoryid='2',post_userid=7,post_title='999999999999',post_time='2016-10-12 24:33:14',post_content='99999999999999999'),
                Post(post_id=10,post_categoryid='2',post_userid=4,post_title='101010101010',post_time='2016-10-12 16:33:14',post_content='00000000000000000000'),
                Post(post_id=11,post_categoryid='2',post_userid=6,post_title='1111111111111',post_time='2016-10-12 15:33:14',post_content='11111111111111111111'),
                Post(post_id=12,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=13,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=14,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=15,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=16,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=17,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=18,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=19,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=20,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=21,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=22,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=23,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=24,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=25,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=26,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=27,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                
                Post(post_id=28,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=29,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=30,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=31,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=32,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=33,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=49,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=34,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=35,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=36,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=37,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=38,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=39,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=40,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=41,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=42,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=43,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=44,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=45,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=46,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=47,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222'),
                Post(post_id=48,post_categoryid='1',post_userid=2,post_title='22222222222222',post_time='2016-10-12 17:33:14',post_content='222222222222')]
    for pl in Postlist:
        session.add(pl)

if session.query(Toppost).count() == 0:
    Toppostlist = [Toppost(top_id=1,top_postid=2,top_time='2016-10-12 24:33:14',top_categoryid=3),
                   Toppost(top_id=2,top_postid=3,top_time='2016-10-12 24:33:14',top_categoryid=1),
                   Toppost(top_id=3,top_postid=5,top_time='2016-10-12 24:33:14',top_categoryid=2),
                   Toppost(top_id=4,top_postid=7,top_time='2016-10-12 24:33:14',top_categoryid=4)]
    for to in Toppostlist:
        session.add(to)
        

if session.query(Picture).count() == 0:
    Picturelist = [Picture(picture_id=1,picture_name='111',picture_url='44b6cad1-d937-409e-8b55-be681bca6e6e.png',picture_postid=2),
                   Picture(picture_id=2,picture_name='222',picture_url='3b4bb682-b7b9-4ede-ad11-c3d4a21b0470.png',picture_postid=2),
                   Picture(picture_id=3,picture_name='333',picture_url='68e2b4cf-a249-4ff1-8126-e1482a6a57ae.png',picture_postid=2),
                   Picture(picture_id=4,picture_name='444',picture_url='1a320f2a8785f83c50679a6a1c7ebb4b.jpeg',picture_postid=3),
                   Picture(picture_id=5,picture_name='555',picture_url='44b6cad1-d937-409e-8b55-be681bca6e6e.png',picture_postid=4),
                   Picture(picture_id=6,picture_name='666',picture_url='44b6cad1-d937-409e-8b55-be681bca6e6e.png',picture_postid=3),
                   Picture(picture_id=7,picture_name='777',picture_url='44b6cad1-d937-409e-8b55-be681bca6e6e.png',picture_postid=3),
                   Picture(picture_id=8,picture_name='888',picture_url='44b6cad1-d937-409e-8b55-be681bca6e6e.png',picture_postid=4),
                   Picture(picture_id=9,picture_name='999',picture_url='44b6cad1-d937-409e-8b55-be681bca6e6e.png',picture_postid=4),
                   Picture(picture_id=10,picture_name='111',picture_url='44b6cad1-d937-409e-8b55-be681bca6e6e.png',picture_postid=5),
                   Picture(picture_id=11,picture_name='101',picture_url='44b6cad1-d937-409e-8b55-be681bca6e6e.png',picture_postid=5),
                   Picture(picture_id=12,picture_name='121',picture_url='44b6cad1-d937-409e-8b55-be681bca6e6e.png',picture_postid=5),
                   Picture(picture_id=13,picture_name='131',picture_url='44b6cad1-d937-409e-8b55-be681bca6e6e.png',picture_postid=2),
                   Picture(picture_id=14,picture_name='141',picture_url='01aa4b08-1284-11e6-a402-08606ed529d2.jpg',picture_postid=2)]
    for po in Picturelist:
        session.add(po)
      
if session.query(Comment).count() == 0:
    Commentlist = [Comment(comment_id=2,comment_postid=2,comment_userid=2,comment_text='fdasfd',comment_datetime='2016-04-10 17:33:14'),
                   Comment(comment_id=4,comment_postid=2,comment_userid=4,comment_text='fdasfd',comment_datetime='2016-05-05 17:33:14'),
                   Comment(comment_id=6,comment_postid=2,comment_userid=6,comment_text='tryeye',comment_datetime='2016-05-04 17:33:14'),
                   Comment(comment_id=7,comment_postid=2,comment_userid=2,comment_text='etyeye',comment_datetime='2016-05-01 17:33:14'),
                   Comment(comment_id=8,comment_postid=2,comment_userid=4,comment_text='fjhfjhfgd',comment_datetime='2016-05-09 17:33:14'),
                   Comment(comment_id=9,comment_postid=2,comment_userid=6,comment_text='wrtrewgfds',comment_datetime='2016-05-08 17:33:14'),
                   Comment(comment_id=10,comment_postid=2,comment_userid=2,comment_text='hgsghd',comment_datetime='2016-05-10 17:33:14'),
                   Comment(comment_id=11,comment_postid=2,comment_userid=2,comment_text='fghdggvbfcd',comment_datetime='2016-05-11 17:33:14'),       
                   Comment(comment_id=12,comment_postid=2,comment_userid=4,comment_text='dasfa',comment_datetime='2016-05-05 17:33:14'),
                   Comment(comment_id=13,comment_postid=2,comment_userid=6,comment_text='dfasfaf',comment_datetime='2016-04-04 17:33:14'),
                   Comment(comment_id=14,comment_postid=2,comment_userid=6,comment_text='fdaf',comment_datetime='2016-05-12 17:33:14'), 
                   Comment(comment_id=15,comment_postid=2,comment_userid=6,comment_text='qerq',comment_datetime='2016-05-06 17:33:14'),
                   Comment(comment_id=16,comment_postid=2,comment_userid=2,comment_text='此货单乃本人发布',comment_datetime='2016-05-07 17:33:14',),
                   Comment(comment_id=17,comment_postid=2,comment_userid=4,comment_text='不不，楼上是骗子，上次还在买他的电脑用的卡炸了',comment_datetime='2016-05-08 17:33:14'),
                   Comment(comment_id=18,comment_postid=2,comment_userid=6,comment_text='你花多少钱买的？',comment_datetime='2016-05-09 17:33:14'),
                   Comment(comment_id=19,comment_postid=2,comment_userid=4,comment_text='三百。。。。。。。。。',comment_datetime='2016-05-10 17:33:14'),
                   Comment(comment_id=20,comment_postid=2,comment_userid=2,comment_text='他就花了三百',comment_datetime='2016-05-11 17:33:14'),
                   Comment(comment_id=21,comment_postid=2,comment_userid=6,comment_text='三百你确定你买的是电脑而不是一台小霸王学习机',comment_datetime='2016-05-12 17:33:14'),
                   Comment(comment_id=22,comment_postid=2,comment_userid=2,comment_text='那台电脑可花了我一万元买的呢，虽然是10年前',comment_datetime='2016-05-13 17:33:14'),
                   Comment(comment_id=23,comment_postid=2,comment_userid=4,comment_text='噗，你个坑，10我买个电脑用来办公玩游戏的，结果你这台电脑开机半个小时都够我睡一觉不说，打开一个文档的时间都够我减个脚指甲了',comment_datetime='2016-05-14 17:33:14'),
                   Comment(comment_id=24,comment_postid=2,comment_userid=2,comment_text='额，你以为买的人只是当古董拿来摆设而已，谁知道你要用啊',comment_datetime='2016-05-15 17:33:14')]
    for cl in Commentlist:
        session.add(cl)      

    
session.commit()
session.close()  
