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
            $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
                document.title = '理工论坛|' + current.$$route.title;
                // $rootScope.title = {};
                // $rootScope.title = current.$$route.title;
                $rootScope.hi = current.$$route.title;
                console.log($rootScope.hi)

                // console.log($rootScope.hi);
            });

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
                templateUrl: 'postlist.html',
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
                                    // console.log($rootScope.mydata)
                                }
                            })
                        ).$promise;
                    }],
                }

            })
            .when('/tab-2', {
                title: '学习交流',
                templateUrl: 'postlist.html',
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
                                    // console.log($rootScope.mydata)
                                }
                            })
                        ).$promise;
                    }],
                }
            })
            .when('/tab-3', {
                title: '吃喝玩乐',
                templateUrl: 'postlist.html',
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
                                    // console.log($rootScope.mydata)
                                }
                            })
                        ).$promise;
                    }],
                }
            })
            .when('/tab-4', {
                title: '失物招领',
                templateUrl: 'postlist.html',
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
            .when('/edit', {
                title: '发布帖子',
                templateUrl: 'edit.html',
                controller: 'testctrl'
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
    .controller('testctrl', function($scope, $location, $anchorScroll) {
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
                    swal("删除！", "你的虚拟文件已经被删除。", "success");
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
        $rootScope.view_ani = function() {

            setTimeout(function() {
                // $('.well').addClass('rotateIn')
                $('.' + classname).removeClass('shake');
            }, 700);
            setTimeout(function() {
                // $('.well').removeClass('rotateIn')
            }, 2000)
        }
        $scope.totalItems = Math.ceil(10 / 10) * 20;
        $scope.currentPage = 1;

        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $log.log('Page changed to: ' + $scope.currentPage);
        };

        $scope.maxSize = 5;
        $scope.bigTotalItems = Math.ceil(64 / 10) * 20;
        $scope.bigCurrentPage = 1;
    })
    .controller('pagectrl', function($scope, $rootScope) {
        // $scope.totalItems = Math.ceil(($scope.total) / 10) * 20;

    })
    .controller('wctrl', function($rootScope, $scope) {
        // console.log(111)
        // $.ajax({
        //     type: "GET",
        //     url: "https://free-api.heweather.com/v5/forecast?city=haerbin&key=48c9dd085d24442d8c0a05f4c151423b",
        //     dataType: "json",
        //     async: false,
        //     //cache:false,
        //     success: function(data) {
        //         $scope.wdata = data.HeWeather5[0].daily_forecast;
        //         // http://openapi.tuling123.com/openapi/api/v2
        //     }
        // })
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


        $scope.wdata = [{
            "astro": {
                "mr": "00:27",
                "ms": "11:02",
                "sr": "03:59",
                "ss": "19:02"
            },
            "cond": {
                "code_d": "205",
                "code_n": "100",
                "txt_d": "多云",
                "txt_n": "晴"
            },
            "date": "2017-05-19",
            "hum": "38",
            "pcpn": "0.0",
            "pop": "0 ",
            "pres": "1006",
            "tmp": {
                "max": "28 ",
                "min": "13 "
            },
            "uv": "8 ",
            "vis": "20 ",
            "wind": {
                "deg": "293 ",
                "dir": "北风 ",
                "sc": "3-4",
                "spd": "12"
            }
        }, {
            "astro": {
                "mr": "01:00 ",
                "ms": "12:07 ",
                "sr": "03:58 ",
                "ss": "19:04 "
            },
            "cond": {
                "code_d": "101",
                "code_n": "101",
                "txt_d": "多云",
                "txt_n": "多云"
            },
            "date": "2017-05-20 ",
            "hum": "37 ",
            "pcpn": "0.0 ",
            "pop": "45 ",
            "pres": "1013 ",
            "tmp": {
                "max": "24",
                "min": "11"
            },
            "uv": "7 ",
            "vis": "18 ",
            "wind": {
                "deg": "143",
                "dir": "东北风 ",
                "sc": "微风 ",
                "spd": "6 "
            }
        }, {
            "astro": {
                "mr": "01:30 ",
                "ms": "13:16 ",
                "sr": "03:57 ",
                "ss": "19:05 "
            },
            "cond": {
                "code_d": "300",
                "code_n": "300",
                "txt_d": "阵雨",
                "txt_n": "阵雨"
            },
            "date": "2017-05-21 ",
            "hum": "59 ",
            "pcpn": "8.9 ",
            "pop": "100 ",
            "pres": "1017 ",
            "tmp": {
                "max": "14 ",
                "min": "8 "
            },
            "uv": "3 ",
            "vis": "16 ",
            "wind": {
                "deg": "82 ",
                "dir": "东风 ",
                "sc": "3-4 ",
                "spd": "17 "
            }
        }]
    })
