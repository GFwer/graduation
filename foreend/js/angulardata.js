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
angular.module('myapp', ['ngRoute', 'ngHolder', 'chieffancypants.loadingBar', 'ngAnimate'])
    .filter("sanitize", ['$sce', function($sce) {
        return function(htmlCode) {
            return $sce.trustAsHtml(htmlCode);
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
        });

        $rootScope.$on('$routeChangeSuccess', function() {
            // var time = $timeout(function(){},1000);
            // time.then(cfpLoadingBar.complete());
            setTimeout(function() { cfpLoadingBar.complete() }, 300)

        });
        // Do the same with $routeChangeError
    })
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/', {
                templateUrl: 'postlist.html',
                controller: 'testctrl',
                // title:'首页',
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
                                    console.log($rootScope.mydata)
                                }
                            })
                        ).$promise;
                    }],
                }

            })
            .when('/tab-2', {
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
                                    console.log($rootScope.mydata)
                                }
                            })
                        ).$promise;
                    }],
                }
            })
            .when('/tab-3', {
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
                                    console.log($rootScope.mydata)
                                }
                            })
                        ).$promise;
                    }],
                }
            })
            .when('/tab-4', {
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
    .controller('datactrl', function($rootScope, $scope) {
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
    })
    .controller('wctrl', function($rootScope, $scope) {
        console.log(111)
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
