// angular.module('myapp', [])
//     .controller('datactrl', function($scope) {
//         $scope.getdata = function(figure, num) {
//             $.ajax({
//                 type: "GET",
//                 // url: "http://openapi.tuling123.com/openapi/api/v2",
//                 url: url + "/v1/post/list/?category_name=" + figure + "&startposi=" + num + "&pagesize=" + "5",
//                 dataType: "json",
//                 // async: false,
//                 // data: mydata,
//                 //cache:false,
//                 success: function(data) {
//                     console.log(data)
//                 }
//             })
//         }
//     })
angular.module('myapp', ['ngRoute', 'ngHolder', 'chieffancypants.loadingBar', 'ngAnimate', 'ui.bootstrap', 'ngSanitize'])
    .filter("sanitize", ['$sce', function($sce) {
        return function(htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
    }])
    .filter("del", ['$sce', function($sce) {
        return function(input) {
            return input.replace(/\s*/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<img*?<\/img>/g, "").replace(/<\/?[^>]*>/g, "").replace(/(\r)/g, "").replace(/(\t)/g, "").replace(/(\n)/g, "")
        }
    }])
    .filter("replace", [function() {
        return function(input) {
            return input.replace(/tihuanfu/g, '&');
        }
    }])
    .config(function(cfpLoadingBarProvider) {
        // true is the default, but I left this here as an example:
        cfpLoadingBarProvider.includeSpinner = true;
        // cfpLoadingBarProvider.latencyThreshold = 500;
    })
    .run(function($rootScope, cfpLoadingBar, $timeout) {
        $rootScope.$on('$routeChangeStart', function() {
            cfpLoadingBar.start();
            $('.view').removeClass('ng-fadeInLeftShort')
                // $('.view').addClass('animated fadeOutRight');
                // setTimeout(function() { $('.view').removeClass('fadeOutRight')}, 300)
                // console.log('start')
        });

        $rootScope.$on('$routeChangeSuccess', function() {
            $('.view').addClass('ng-fadeInLeftShort')
                // console.log('nonono')
                // var time = $timeout(function(){},1000);
                // time.then(cfpLoadingBar.complete());
            setTimeout(function() { cfpLoadingBar.complete() }, 300)

            // $('.view').removeClass('');
            // $('.view').addClass('animated fadeInLeft');
            // setTimeout(function() { $('.view').removeClass('fadeInLeft')}, 700)
        });

        // Do the same with $routeChangeError
    })
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/', {
                templateUrl: 'postlistadmin.html',
                controller: 'testctrl',
                title: '校内信息',
                resolve: {
                    post: ['$rootScope', function($rootScope) {
                        (
                            $.ajax({
                                type: "GET",
                                async: false,
                                url: url + "/v1/post/list/?category_name=0&startposi=" + num + "&pagesize=" + "10",
                                dataType: "json",
                                success: function(res) {
                                    $rootScope.mydata = res.inforesult;
                                    $rootScope.item = res.infomsg;
                                    // console.log($rootScope.mydata)
                                }
                            })
                        ).$promise;
                    }],
                }

            })
            .when('/tab-2', {
                title: '学习交流',
                templateUrl: 'postlistadmin.html',
                controller: 'testctrl',
                resolve: {
                    post: ['$rootScope', function($rootScope) {
                        (
                            $.ajax({
                                type: "GET",
                                url: url + "/v1/post/list/?category_name=1&startposi=" + num + "&pagesize=" + "10",
                                dataType: "json",
                                async: false,
                                success: function(res) {
                                    $rootScope.mydata = res.inforesult;
                                    $rootScope.item = res.infomsg;
                                    // console.log($rootScope.item)
                                    // console.log($rootScope.mydata)
                                }
                            })
                        ).$promise;
                    }],
                }
            })
            .when('/tab-3', {
                title: '吃喝玩乐',
                templateUrl: 'postlistadmin.html',
                controller: 'testctrl',
                resolve: {
                    post: ['$rootScope', function($rootScope) {
                        (
                            $.ajax({
                                type: "GET",
                                async: false,
                                url: url + "/v1/post/list/?category_name=2&startposi=" + num + "&pagesize=" + "10",
                                dataType: "json",
                                success: function(res) {
                                    $rootScope.mydata = res.inforesult;
                                    $rootScope.item = res.infomsg;
                                    // console.log($rootScope.mydata)
                                }
                            })
                        ).$promise;
                    }],
                }
            })
            .when('/tab-4', {
                title: '失物招领',
                templateUrl: 'postlistadmin.html',
                controller: 'testctrl',
                resolve: {
                    post: ['$rootScope', function($rootScope) {
                        (
                            $.ajax({
                                async: false,
                                type: "GET",
                                url: url + "/v1/post/list/?category_name=3&startposi=" + num + "&pagesize=" + "10",
                                dataType: "json",
                                success: function(res) {
                                    $rootScope.mydata = res.inforesult;
                                    $rootScope.other = res;
                                    // console.log($rootScope.mydata)
                                }
                            })
                        ).$promise;
                    }],
                }
            })
            //             .when('/:postid', {
            //     // templateUrl: 'postlist.html',
            //     template:"<p>hi</p>",
            //     controller: 'testctrl',
            //     resolve: {
            //         post: ['$rootScope','$routeParams','$route', function($rootScope,$routeParams) {
            //                                     console.log(JSON.stringify($route.current.params)
            //             console.log($routeParams)
            //             (
            //                 $.ajax({
            //                     async: false,
            //                     type: "GET",
            //                     url: url+"/v1/post/id/?"+"post_id=" + $routeParams.postid,
            //                     dataType: "jsonp",
            //                     success: function(res) {
            //                         $rootScope.mydata = res.inforesult;
            //                         $rootScope.other = res;
            //                         // console.log($rootScope.mydata)
            //                     }
            //                 })
            //             ).$promise;
            //         }],
            //     }
            // })
            .when('/post/:postid', {
                title: '帖子详情',
                templateUrl: 'postdetail.html',
                controller: 'testctrl',
                resolve: {
                    postdetail: ['$rootScope', '$routeParams', '$route', function($rootScope, $routeParams, $route) {
                        (
                            // console.log($route.current.params);
                            $.ajax({
                                async: false,
                                type: "GET",
                                url: url + "/v1/post/id/detail/?" + "post_id=" + $route.current.params.postid,
                                dataType: "json",
                                success: function(res) {

                                    $rootScope.detaildata = res.inforesult;
                                    $rootScope.detailother = res.inforesult.post_comments;
                                    // console.log($rootScope.mydata)
                                }
                            })
                        ).$promise;
                    }]
                }
            })
            .when('/userlist', {
                title: '用户管理',
                templateUrl: 'userlist.html',
                controller: 'testctrl',
                resolve: {
                    postdetail: ['$rootScope', '$routeParams', '$route', function($rootScope, $routeParams, $route) {
                        (
                            // console.log($route.current.params);
                            $.ajax({
                                async: false,
                                type: "GET",
                                url: url + "/v1/user/list/",
                                dataType: "json",
                                success: function(res) {

                                    $rootScope.userlist = res.inforesult;
                                    // $rootScope.detailother = res.inforesult.post_comments;
                                    // console.log($rootScope.mydata)
                                }
                            })
                        ).$promise;
                    }]
                }
            })
            .when('/edit', {
                title: '发布帖子',
                templateUrl: 'edit.html',
                controller: 'testctrl'
            })
            .when('/change', {
                title: '修改密码',
                templateUrl: 'change.html',
                controller: 'testctrl'
            })
            .when('/search', {
                title: '搜索',
                templateUrl: 'search.html',
                controller: 'testctrl'
            })
            .when('/show/:username', {
                title: '帖子展示',
                templateUrl: 'show.html',
                controller: 'testctrl',
                resolve: {
                    postdetail: ['$rootScope', '$routeParams', '$route', function($rootScope, $routeParams, $route) {
                        // $rootScope.mypost = [];
                        (
                            // console.log($route.current.params);
                            $.ajax({
                                async: false,
                                type: "GET",
                                url: url + "/v1/post/show/?username=" + $route.current.params.username,
                                dataType: "json",
                                success: function(res) {
                                    $rootScope.postshow = res.inforesult

                                    // console.log($rootScope.mypost1)
                                    // $rootScope.detailother = arr.post_comments;
                                    // console.log($rootScope.mydata)
                                }
                            }), $.ajax({
                                async: false,
                                type: "GET",
                                url: url + "/v1/post/comment/?username=" + $route.current.params.username,
                                dataType: "json",
                                success: function(res) {
                                    $rootScope.commentshow = res.inforesult;

                                    // $rootScope.detailother = arr.post_comments;
                                    // console.log($rootScope.mydata)
                                }
                            })
                        ).$promise;
                    }]
                }
            })
            .when('/mypost', {
                title: '我的帖子',
                templateUrl: 'personal.html',
                controller: 'testctrl',
                resolve: {
                    postdetail: ['$rootScope', '$routeParams', '$route', function($rootScope, $routeParams, $route) {
                        // $rootScope.mypost = [];
                        (
                            // console.log($route.current.params);
                            $.ajax({
                                async: false,
                                type: "GET",
                                url: url + "/v1/post/mypostlist/?category_name=0&startposi=0&pagesize=20&usertoken_str=" + getCookie("usertoken"),
                                dataType: "json",
                                success: function(res) {
                                    $rootScope.mypost1 = res.inforesult;

                                    // console.log($rootScope.mypost1)
                                    // $rootScope.detailother = arr.post_comments;
                                    // console.log($rootScope.mydata)
                                }
                            }), $.ajax({
                                async: false,
                                type: "GET",
                                url: url + "/v1/post/mypostlist/?category_name=1&startposi=0&pagesize=20&usertoken_str=" + getCookie("usertoken"),
                                dataType: "json",
                                success: function(res) {
                                    $rootScope.mypost2 = res.inforesult;

                                    // $rootScope.detailother = arr.post_comments;
                                    // console.log($rootScope.mydata)
                                }
                            }), $.ajax({
                                async: false,
                                type: "GET",
                                url: url + "/v1/post/mypostlist/?category_name=2&startposi=0&pagesize=20&usertoken_str=" + getCookie("usertoken"),
                                dataType: "json",
                                success: function(res) {
                                    $rootScope.mypost3 = res.inforesult;

                                    // $rootScope.detailother = arr.post_comments;
                                    // console.log($rootScope.mydata)
                                }
                            }),
                            $.ajax({
                                async: false,
                                type: "GET",
                                url: url + "/v1/post/mypostlist/?category_name=3&startposi=0&pagesize=20&usertoken_str=" + getCookie("usertoken"),
                                dataType: "json",
                                success: function(res) {
                                    $rootScope.mypost4 = res.inforesult;

                                    // console.log(,$rootScope.item2,$rootScope.item3,$rootScope.item4)
                                    // console.log($rootScope.mypost)
                                    // $rootScope.detailother = res.inforesult.post_comments;
                                    // console.log($rootScope.mydata)
                                }
                            })
                        ).$promise;
                    }]
                }
            })
            // "/v1/post/mypostlist/?category_name=3&startposi=0&pagesize=20&usertoken_str=" + getCookie("usertoken")
            .otherwise({
                // templateUrl: 'postlist.html'
            });
        // $locationProvider.html5Mode(true);
    })
    .controller('testctrl', function($scope, $location, $anchorScroll, $rootScope) {
        var urlarr2 = window.location.href.split('#/');
        var lasturl2 = urlarr2[1];
        if (lasturl2 == 'tab-2') {
            $('#2').addClass('bordercss mdui-tab-active');
            $('#1').removeClass('bordercss mdui-tab-active');
            $('#3').removeClass('bordercss mdui-tab-active');
            $('#4').removeClass('bordercss mdui-tab-active');
        } else if (lasturl2 == 'tab-3') {
            $('#3').addClass('bordercss mdui-tab-active');
            $('#1').removeClass('bordercss mdui-tab-active');
            $('#2').removeClass('bordercss mdui-tab-active');
            $('#4').removeClass('bordercss mdui-tab-active');
        } else if (lasturl2 == 'tab-4') {
            $('#4').addClass('bordercss mdui-tab-active');
            $('#1').removeClass('bordercss mdui-tab-active');
            $('#3').removeClass('bordercss mdui-tab-active');
            $('#2').removeClass('bordercss mdui-tab-active');
        } else {
            $('#1').addClass('bordercss mdui-tab-active');
            $('#2').removeClass('bordercss mdui-tab-active');
            $('#3').removeClass('bordercss mdui-tab-active');
            $('#4').removeClass('bordercss mdui-tab-active');
        }
        $rootScope.down = function(id) {
            swal({
                    title: "取消置顶",
                    text: "确定将帖子取消置顶！",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定！",
                    closeOnConfirm: false
                },
                function() {
                    swal("取消！", "帖子已经取消置顶。", "success");
                    var usertoken = getCookie("usertoken");
                    var xmlHttp1 = new XMLHttpRequest();
                    xmlHttp1.onreadystatechange = function() {
                        if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
                            var result = JSON.parse(xmlHttp1.responseText);
                            window.location.reload();
                        }
                    };
                    var backendurl = url + "/v1/post/top/cancel/";
                    xmlHttp1.open("POST", backendurl, true);
                    xmlHttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xmlHttp1.send("usertoken_str=" + usertoken + "&post_id=" + id);
                });
        }
        $rootScope.deleteuser = function(user_id) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    result = JSON.parse(xmlHttp.responseText);
                    mdui.snackbar({
                        message: result["infomsg"]
                    });
                    if (result['infomsg'] == '数据库错误') { swal("删除！", result["infomsg"], "warning"); } else {
                        swal("删除！", result["infomsg"], "success");
                        window.location.reload();
                    }
                }
            };
            swal({
                    title: "确定删除吗？",
                    text: "你将无法恢复用户！",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定删除！",
                    closeOnConfirm: false
                },
                function() {
                    var backendurl = url + "/v1/user/del/";
                    xmlHttp.open("POST", backendurl, true);
                    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xmlHttp.send("user_id=" + user_id);
                });
        }
        $rootScope.airport = function(id) {
            // console.log(id)
            var urlarr3 = window.location.href.split('#/');
            // console.log(1)
            var catr = 0;
            var lasturl3 = urlarr3[urlarr3.length - 1];
            if (lasturl3 == 'tab-2') {
                catr = 1;
            }
            if (lasturl3 == "tab-3") {
                catr = 2;
            }
            if (lasturl3 == "tab-4") {
                catr = 3;
            }
            swal({
                    title: "置顶",
                    text: "确定将置顶帖子！",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定！",
                    closeOnConfirm: false
                },
                function() {
                    swal("成功！", "帖子已经置顶。", "success");
                    var usertoken = getCookie("usertoken");
                    var xmlHttp1 = new XMLHttpRequest();
                    xmlHttp1.onreadystatechange = function() {
                        if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
                            var result = JSON.parse(xmlHttp1.responseText);
                            window.location.reload();
                        }
                    };
                    var backendurl = url + "/v1/post/top/";
                    xmlHttp1.open("POST", backendurl, true);
                    xmlHttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xmlHttp1.send("usertoken_str=" + usertoken + "&post_id=" + id + "&category_name=" + catr);
                });

        }
        $rootScope.totalItems = Math.ceil(($rootScope.item) / 10) * 10;
        $rootScope.setPage = function(pageNo) {
            $rootScope.currentPage = pageNo;
        };
        $rootScope.currentPage = 1;
        $rootScope.maxSize = 5;
        $rootScope.pageChange = function(page) {
            // $rootScope.totalItems = Math.ceil(($rootScope.item) / 10) * 10;
            console.log($rootScope.item);
            $rootScope.bigTotalItems = 100;
            $rootScope.bigCurrentPage = 10;
            $rootScope.page(page);
            $rootScope.apidomain = [];
            $rootScope.apipath = [];
        };
    })
    .controller('searchctrl', function($scope, $rootScope) {
        $scope.searchcontent = function() {
            // $scope.x = $scope.search
            var e = document.getElementById("catr");
            var select = getClass(e);
            var gatcon = document.getElementsByClassName("searchcon")[0].value;
            if (select == "" || gatcon == "") {
                mdui.snackbar({
                    message: '分类或内容不能为空！'
                });
            } else {
                if (select == 0) {
                    $.ajax({
                        async: false,
                        type: "GET",
                        url: url + "/v1/post/searchtitle/?" + "key=" + gatcon,
                        dataType: "json",
                        success: function(res) {
                            $rootScope.getre = res.inforesult;
                            // console.log($rootScope.mydata)
                        }
                    })

                } else if (select == 1) {
                    $.ajax({
                        async: false,
                        type: "GET",
                        url: url + "/v1/post/search/?" + "key=" + gatcon,
                        dataType: "json",
                        success: function(res) {
                            $rootScope.getre = res.inforesult;
                            // console.log($rootScope.mydata)
                        }
                    })
                }
            }
        }

    })
    .controller('changectrl', function($scope, $rootScope) {
        $rootScope.changepwd = function() {
            var old = document.getElementsByClassName('old')[0].value;
            var new1 = document.getElementsByClassName('new1')[0].value;
            var new2 = document.getElementsByClassName('new2')[0].value;
            var name = getCookie("username")
            if (old == "" || new1 == "" || new2 == "") {
                mdui.snackbar({
                    message: '内容均不能为空！'
                });

            } else if (new1 != new2) {
                mdui.snackbar({
                    message: '两次输入的密码不一致！'
                });
            } else {
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        result = JSON.parse(xmlHttp.responseText);
                        if (result['infostatus'] == true) {
                            mdui.snackbar({
                                message: '修改成功！'
                            });
                            setTimeout(secede(), 1000)
                        } else {
                            mdui.snackbar({
                                message: result['infomsg']
                            });
                        }
                    }
                };
                var backendurl = url + "/v1/user/change/";
                xmlHttp.open("POST", backendurl, true);
                xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlHttp.send("name=" + name + "&pwd=" + old + "&new=" + new2);
            }

        }
    })
    .controller('mypostctrl', function($scope) {
        $scope.newDeleteMyPost = function(post_id) {
            usertoken = getCookie("usertoken");
            // var r = confirm("是否确认要删除该帖子？");
            // if (r == true) {
            //     var xmlHttp1 = new XMLHttpRequest();
            //     xmlHttp1.onreadystatechange = function() {
            //         if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
            //             var result = JSON.parse(xmlHttp1.responseText);
            //             console.log(result);
            //             alert(result.infomsg);
            //             if (result.infostatus == true) {
            //                 window.location.href = "../html/login.html#/mypost";
            //             }
            //         }
            //     };
            //     var backendurl = url + "/v1/post/delete/";
            //     xmlHttp1.open("POST", backendurl, true);
            //     xmlHttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            //     xmlHttp1.send("usertoken_str=" + usertoken + "&post_id=" + post_id);
            // }
            swal({
                    title: "确定删除吗？",
                    text: "你将无法恢复帖子！",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定删除！",
                    closeOnConfirm: false
                },
                function() {
                    swal("删除！", "你的帖子已经删除。", "success");
                    var xmlHttp1 = new XMLHttpRequest();
                    xmlHttp1.onreadystatechange = function() {
                        if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
                            var result = JSON.parse(xmlHttp1.responseText);
                            // console.log(result);
                            // alert(result.infomsg);
                            if (result.infostatus == true) {
                                window.location.reload();
                            }
                        }
                    };
                    var backendurl = url + "/v1/post/delete/";
                    xmlHttp1.open("POST", backendurl, true);
                    xmlHttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xmlHttp1.send("usertoken_str=" + usertoken + "&post_id=" + post_id);
                });

        }
    })
    .controller('datactrl', function($rootScope, $scope, $log, $location, $anchorScroll) {
        $scope.scrollTo = function(id) {
                $location.hash(id);
                $anchorScroll();
            }
            // $rootScope.getdata = function(num) {
            //     console.log(window.figure)
            //     $.ajax({
            //         type: "GET",
            //         // url: "http://openapi.tuling123.com/openapi/api/v2",
            //         url: url + "/v1/post/list/?category_name=" + window.figure + "&startposi=" + num + "&pagesize=" + "5",
            //         dataType: "json",
            //         // async: false,
            //         // data: mydata,
            //         //cache:false,
            //         success: function(res) {
            //             $rootScope.mydata = res;
            //             console.log($rootScope.mydata)


        //         }

        //     })
        // }
        // $scope.totalItems = 10;
        // $scope.setPage = function(pageNo) {
        //     $scope.currentPage = pageNo;
        // };
        // $scope.currentPage = 1;
        // $scope.maxSize = Math.ceil(($rootScope.total) / 10)
        // $scope.pageChanged = function(page, size) {
        //     $rootScope.bigTotalItems = 100;
        //     $rootScope.bigCurrentPage = 10;
        //     // $scope.getpage((page - 1) * 10, size);
        //     $scope.apidomain = [];
        //     $scope.apipath = [];
        // };
        $rootScope.page = function(cpage) {
            var cat = 0;
            var page = (cpage - 1) * 10;
            var urlarr = window.location.href.split('#/');
            // console.log(1)
            var lasturl = urlarr[urlarr.length - 1];
            if (lasturl == 'tab-2') {
                cat = 2;
            }
            if (lasturl == "tab-3") {
                cat = 3;
            }
            if (lasturl == "tab-4") {
                cat = 4;
            }
            $.ajax({
                async: false,
                type: "GET",
                url: url + "/v1/post/list/?category_name=" + cat + "&startposi=" + page + "&pagesize=" + "10",
                dataType: "json",
                success: function(res) {
                    $rootScope.mydata = res.inforesult;
                    $rootScope.other = res;
                    // console.log($rootScope.mydata)
                }
            })
        }
        $rootScope.view_ani = function() {

                setTimeout(function() {
                    // $('.well').addClass('rotateIn')
                    $('.' + classname).removeClass('shake');
                }, 700);
                setTimeout(function() {
                    // $('.well').removeClass('rotateIn')
                }, 2000)
            }
            // $rootScope.totalItems = Math.ceil($rootScope.item / 10) * 20;
            // $rootScope.currentPage = 1;

        // $rootScope.setPage = function(pageNo) {
        //     $rootScope.currentPage = pageNo;
        // };

        // $rootScope.pageChanged = function(cpage) {
        //     $rootScope.page(cpage);
        // };

        // $rootScope.maxSize = 5;
        // $rootScope.bigTotalItems = Math.ceil(($rootScope.item) / 10) * 20;
        // $rootScope.bigCurrentPage = 1;

    })
    .controller('pagectrl', function($scope, $rootScope) {
        // $scope.totalItems = Math.ceil(($scope.total) / 10) * 20;

    })
    .controller('wctrl', function($rootScope, $scope) {
        $rootScope.ismobile = function() {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
                    return true;
                } else {
                    return false;
                }
            }
            // console.log(111)
        $.ajax({
            type: "GET",
            url: "https://free-api.heweather.com/v5/forecast?city=haerbin&key=48c9dd085d24442d8c0a05f4c151423b",
            dataType: "json",
            async: false,
            //cache:false,
            success: function(data) {
                $scope.wdata = data.HeWeather5[0].daily_forecast;
                // http://openapi.tuling123.com/openapi/api/v2
            }
        })
        $rootScope.school = function(figure) {
            // var oParent = document.getElementById('two'); // 父级对象
            // oParent.innerHTML = "";
            // for (var i = 0; i < 4; i++) {
            //     document.getElementById("school" + i).style.backgroundColor = "inherit";
            // }
            // document.getElementById("school" + figure).style.backgroundColor = "orange";
            window.figure = figure;
            // $rootScope.getdata(0);
            // fun(figure, 0);
        }
        $scope.user = getCookie("username");
        $scope.user1 = $scope.user.substr(0, 1).toUpperCase();


        // $scope.wdata = [{
        //     "astro": {
        //         "mr": "00:27",
        //         "ms": "11:02",
        //         "sr": "03:59",
        //         "ss": "19:02"
        //     },
        //     "cond": {
        //         "code_d": "205",
        //         "code_n": "100",
        //         "txt_d": "多云",
        //         "txt_n": "晴"
        //     },
        //     "date": "2017-05-19",
        //     "hum": "38",
        //     "pcpn": "0.0",
        //     "pop": "0 ",
        //     "pres": "1006",
        //     "tmp": {
        //         "max": "28 ",
        //         "min": "13 "
        //     },
        //     "uv": "8 ",
        //     "vis": "20 ",
        //     "wind": {
        //         "deg": "293 ",
        //         "dir": "北风 ",
        //         "sc": "3-4",
        //         "spd": "12"
        //     }
        // }, {
        //     "astro": {
        //         "mr": "01:00 ",
        //         "ms": "12:07 ",
        //         "sr": "03:58 ",
        //         "ss": "19:04 "
        //     },
        //     "cond": {
        //         "code_d": "101",
        //         "code_n": "101",
        //         "txt_d": "多云",
        //         "txt_n": "多云"
        //     },
        //     "date": "2017-05-20 ",
        //     "hum": "37 ",
        //     "pcpn": "0.0 ",
        //     "pop": "45 ",
        //     "pres": "1013 ",
        //     "tmp": {
        //         "max": "24",
        //         "min": "11"
        //     },
        //     "uv": "7 ",
        //     "vis": "18 ",
        //     "wind": {
        //         "deg": "143",
        //         "dir": "东北风 ",
        //         "sc": "微风 ",
        //         "spd": "6 "
        //     }
        // }, {
        //     "astro": {
        //         "mr": "01:30 ",
        //         "ms": "13:16 ",
        //         "sr": "03:57 ",
        //         "ss": "19:05 "
        //     },
        //     "cond": {
        //         "code_d": "300",
        //         "code_n": "300",
        //         "txt_d": "阵雨",
        //         "txt_n": "阵雨"
        //     },
        //     "date": "2017-05-21 ",
        //     "hum": "59 ",
        //     "pcpn": "8.9 ",
        //     "pop": "100 ",
        //     "pres": "1017 ",
        //     "tmp": {
        //         "max": "14 ",
        //         "min": "8 "
        //     },
        //     "uv": "3 ",
        //     "vis": "16 ",
        //     "wind": {
        //         "deg": "82 ",
        //         "dir": "东风 ",
        //         "sc": "3-4 ",
        //         "spd": "17 "
        //     }
        // }]
    })
