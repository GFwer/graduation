listdictafter = []
            for a in listdict:
                if a not in listdictafter:
                    listdictafter.append(a)
            while len(lsitdictafter) == pagesize:
                postlistb = session.query(Post.post_title,Post.post_time,Post.post_content,Post.post_userid,Post.post_id).filter_by(post_categoryid=categoryid).order_by(Post.post_time).offset(startposi).limit(pagesizeafter).all()
            for lista in postlist:
                dicta = {}
                dicta["psot_id"] = lista[4]
                dicta["post_title"] = lista[0]
                dicta["post_time"] = lista[1]
                dicta["post_content"] = lista[2]
                user_name = session.query(User.user_name).filter_by(user_id=lista[3]).all()
                username = user_name[0][0]
                dicta["user_name"] = username
                listdictafter.append(dicta)
