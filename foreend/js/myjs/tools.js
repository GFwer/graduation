/*
清除字符串两端的空格
str是输入字符串
*/
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/*
清除字符串左端的空格
str是输入字符串
*/
function ltrim(str) {
    return str.replace(/(^\s*)/g, "");
}

/*
清除字符串右端的空格
str是输入字符串
*/
function rtrim(str) {
    return str.replace(/(\s*$)/g, "");
}

/*
显示提示信息
control是显示控件
labelclass是显示样式
labelinfo是显示内容
*/
function showhint(control, labelclass, labelinfo) {
    control.setAttribute("class", labelclass);
    control.innerHTML = labelinfo;
}

/*
通过控件的id返回控件的value
controlid是控件的id
*/
function valuebyid(controlid) {
    return trim(document.getElementById(controlid).value);
}

/*
清除控件的value
controlid是控件的id
*/
function clearvaluebyid(controlid) {
    document.getElementById(controlid).value = "";
}

/*
清除控件的innerHTMl
controlid是控件的id
*/
function clearinnerhtmlbyid(controlid) {
    document.getElementById(controlid).innerHTML = "";
}

/*
通过控件的id返回控件的innerHTML
controlid是控件的id
*/
function innervaluebyid(controlid) {
    return trim(document.getElementById(controlid).innerHTML);
}

/*
通过控件的id返回控件本身
controlid是控件的id
*/
function objbyid(controlid) {
    return document.getElementById(controlid);
}

/*
通过控件的name返回控件集合
controlname是控件的name
*/
function objsbyname(controlname) {
    return document.getElementsByName(controlname);
}

/*
通过控件的class返回控件集合
controlclass是控件的class
*/
function objsbyclass(controlclass) {
    return document.getElementsByClass(controlclass);
}

/*
判断控件是否有某个样式类
elem是控件
cls是样式类
*/
function hasClass(elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

/*
为控件添加某个样式类
elem是控件
cls是样式类
*/
function addClass(elem, cls) {
    if (!hasClass(elem, cls)) {
        elem.className += ' ' + cls;
    }
}

/*
移除控件的某个样式类
elem是控件
cls是样式类
*/
function removeClass(elem, cls) {
    if (hasClass(elem, cls)) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}


/*
创建控件
obj是控件的类型字符串，如"div", "ol", "span"等
attr是属性字典
innerhtml是空间的innerHTML
*/
function makeobj(obj, attr, innerhtml) {
    var objtemp = document.createElement(obj);
    for (var i in attr) {
        objtemp.setAttribute(i, attr[i]);
    }
    if (typeof (innerhtml) != "undefined") {
        objtemp.innerHTML = innerhtml;
    }
    return objtemp;
}

/*
在某个控件同级之后添加新的控件
newelem是新的控件
targetelem是某个控件
*/
function insertafter(newelem, targetelem) {
    var parent = targetelem.parentNode;
    if (parent.lastChild == targetelem) {
        parent.appendChild(newelem);
    } else {
        parent.insertBefore(newelem, targetelem.nextSibling);
    }
}

/*
清空整个容器
*/
function destroycontainer(containerid) {
    var obj = objbyid(containerid);
    if (obj) {
        var children = obj.childNodes;
        for (var i = children.length - 1; i > 0; i--) {
            obj.removeChild(children[i]);
        }
    }
}