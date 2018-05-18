function Ajax(pageName, Mehtod, jData, fnOk, fnFail) {

    $('#loadingBar').show();
    $.ajax({
        type: "POST",
        url: pageName + "/" + Mehtod,
        data: jData, // the data in JSON format.  Note it is *not* a JSON object, is is a literal string in JSON format
        contentType: "application/json; charset=utf-8", // we are sending in JSON format so we need to specify this
        dataType: "json", // the data type we want back.  The data will come back in JSON format
        success: function (data) {
            $('#loadingBar').hide();

            fnOk(data);


            // it's a quirk, but the JSON data comes back in a property called "d"; {"d":"Hello Aidy F"}
        },
        error: function (xhr, status) {

            $('#loadingBar').hide();
            fnFail(xhr);

            switch (status) {

            }
        }
    });


}
var Validator = new Object();
var Messager = new Object();
Messager.errors = new Array();
Messager.info = new Array();
Validator.ClearErrors = function () {
    Messager.errors = new Array();

}
Messager.ClearInfos = function () {
    Messager.info = new Array();



}
mergeArray = function (a1, b1) {
    console.log(a1);
    console.log(b1);
    var keys = Object.keys(b1);
    for (var i = 0; i < keys.length; i++) {
        a1[keys[i]] = b1[keys[i]];

    }
   
}


Validator.CheckEmpty = function (id, caption, row) {
    var val = $("#" + id).val();
    if (val == '') {
        $('#' + id).css('background', 'pink');
        Messager.errors.push((row == null ? "" : " ردیف: " + row + " ") + 'کادر ' + caption + ' نمی تواند خالی رها شود ');
    }
    else {
        $('#' + id).css('background', '');
    }
}


Validator.CheckStringLength = function (id, caption, len, row) {
    var val = $("#" + id).val();
    if (val.length != len) {
        $('#' + id).css('background', 'pink');
        Messager.errors.push((row == null ? "" : " ردیف: " + row + " ") + ' طول عبارت  ' + caption + ' بایستی ' + len + ' حرف یا رقم باَشد');
    }
    else {
        $('#' + id).css('background', '');
    }
}
Validator.CheckRegDate = function (id, caption, len, row) {
    var val = $("#" + id).val();
    if (val == '') {
        $('#' + id).css('background', 'pink');
        Messager.errors.push((row == null ? "" : " ردیف: " + row + " ") + 'کادر ' + caption + ' نمی تواند خالی رها شود ');
    }
    else {
        $('#' + id).css('background', 'pink');
        var parts = val.split('/');
        var year = parseInt(parts[0]);
        var month = parseInt(parts[1]);
        var day = parseInt(parts[2]);
        if ((year < 1300) || (year > 9999) || (month < 1) || (month > 12) || (day < 1) || (day > (month < 7 ? 31 : 30))) {
            Messager.errors.push('تاریخ وارد شده در  ' + caption + ' صحیح نیست ');
            return;
        }


        $('#' + id).css('background', '');
    }


}
Validator.CheckRegInteger = function (id, caption, len, row) {
    var val = $("#" + id).val().replace(/,/g,'');
    if (val == '') {
        $('#' + id).css('background', 'pink');
        Messager.errors.push((row == null ? "" : " ردیف: " + row + " ") + 'کادر ' + caption + ' نمی تواند خالی رها شود ');
    }
    else {
        $('#' + id).css('background', 'pink');

        if ((val == "") || (isNaN(val))) {
            Messager.errors.push('عدد وارد شده در  ' + caption + ' صحیح نیست ');
            return;
        }


        $('#' + id).css('background', '');
    }


}
Validator.CheckRegFloat = function (id, caption, row) {
    var val = $("#" + id).val();
    if (val == '') {
        $('#' + id).css('background', 'pink');
        Messager.errors.push((row == null ? "" : " ردیف: " + row + " ") + 'کادر ' + caption + ' نمی تواند خالی رها شود ');
    }
    else {
        $('#' + id).css('background', 'pink');

        if ((val == "") || (isNaN(parseFloat(val)))) {
            Messager.errors.push('عدد وارد شده در  ' + caption + ' صحیح نیست ');
            return;
        }


        $('#' + id).css('background', '');
    }


}
Validator.CheckRegSelect2 = function (id, caption,row) {
    var val = $("#" + id).val();
    if (val == null) {
        $('#' + id).css('background', 'pink');
        Messager.errors.push((row == null ? "" : " ردیف: " + row + " ") + 'کادر ' + caption + ' نمی تواند خالی رها شود ');
    }
    else {
        $('#' + id).css('background', '');
    }


}
function BackPage() {

    window.history.back(-1);
}

Validator.ShowErrors = function () {
    $('#myModalLabel').html('خطا');
    var str = '';
    for (var l = 0; l < Messager.errors.length; l++) {
        str += Messager.errors[l] + "</br>";

    }
    $('.modal-body').html(str);
    $('#myModal').modal()
}
Validator.RegEmail = function (id, caption) {


    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var r = re.test($('#' + id).val());
    if (r == false) {
        $('#' + id).css('background', 'pink');
        Messager.errors.push(' پست الکترونیک وارد شده در  ' + caption + ' صحیح نیست ');
    }
    else {
        $('#' + id).css('background', '');
    }

}
Messager.ShowInfo = function (title) {
    $('#myModalLabel').html(title);
    var str = '';
    for (var l = 0; l < Messager.info.length; l++) {
        str += Messager.info[l] + "</br>";

    }
    $('.modal-body').html(str);
    $('#myModal').modal()
}
function TableViewAjax(name, data, fnOk, fnFailOk) {
    Ajax('Home', name, JSON.stringify(data), function (dx) {

        if (dx.code != 0) {
            Validator.ClearErrors();
            Messager.errors.push(dx.Message);
            Validator.ShowErrors();
            fnFailOk(dx.Message);
            if (dx.code == 401) {
                setTimeout(function () { window.location='/home/LogIn' }, 2000);

            }
        }
        else {
            dx.records = JSON.parse(dx.retrunValue).Records;
            for (var l = 0; l < dx.records.length; l++) {
                dx.records[l].RowState = 'NoChange';
                dx.records[l].selected = false;
                dx.records[l].rndId = Math.round(Math.random() * 99999999999999);


            }
            fnOk(dx);

        }

    },
    function (data) {

        Messager.errors.push('خطا نامشخص');
        Validator.ShowErrors();
        fnFailOk('خطا نا مشخص');
    })



}

function ScallerAjax(name, data, fnOk, fnFailOk) {
    Ajax('Home', name, JSON.stringify(data), function (dx) {

        if (dx.code != 0) {
            Validator.ClearErrors();
            Messager.errors.push(dx.Message);
            Validator.ShowErrors();
            fnFailOk(dx.Message);
            if (dx.code == 401) {
                setTimeout(function () { window.location = '/home/LogIn' }, 2000);

            }
        }
        else {
            fnOk(dx);

        }

    },
    function (data) {

        Messager.errors.push('خطا نامشخص');
        Validator.ShowErrors();
        fnFailOk('خطا نا مشخص');
    })



}


function ScallerAjax(name, data, fnOk, fnFailOk) {
    Ajax('Home', name, JSON.stringify(data), function (dx) {

        if (dx.code != 0) {
            Validator.ClearErrors();
            Messager.errors.push(dx.Message);
            Validator.ShowErrors();
            fnFailOk(dx.Message);
            if (dx.code == 401) {
                setTimeout(function () { window.location = '/home/LogIn' }, 2000);

            }
        }
        else {
            fnOk(dx);

        }

    },
    function (data) {

        Messager.errors.push('خطا نامشخص');
        Validator.ShowErrors();
        fnFailOk('خطا نا مشخص');
    })



}


Messager.ShowMessage = function (title, message) {
    Messager.ClearInfos();
    Messager.info.push(message);
    Messager.ShowInfo(title);

}
function toInput(key, value) {
    var obj = new Object();
    obj.key = key;
    obj.value = value;
    return obj;
}

function ConfirmAsk(message, strFun) {
    $('#myModalLabel').html('تایید');
    $('.modal-body').html(message);
    $('#myModalYesNo').modal();
    window.confirmFun = strFun;
}

function NormalResult() {
    $('a[pdaajaxsyntax]').each(function () { $(this).attr('onClick', $(this).attr('pdaajaxsyntax')) });
    $('[moneytype="yes"]').each(function () { NumberInput(null, $(this)[0]) });
}
function Num(v) {

    try {
        if (v === undefined) {
            return 0;
        }
        return parseFloat(v.replace(/,/g, ''));
    }
    catch (ex) {
        return 0;

    }

}

function blockNonIntNumber(e) {
    if (e.charCode == 0) {

        return true;
    }



    if (e.charCode == 45) {

        return true;
    }
    if (e.charCode < 48) {

        return false;
    }
    if (e.charCode > 57) {

        return false;
    }
    return true;
}
function blockNonTimeNumber(e) {
    if (e.charCode == 0) {

        return true;
    }
    if (e.charCode == 58) {

        return true;
    }
    if (e.charCode < 48) {

        return false;
    }
    if (e.charCode > 57) {

        return false;
    }
    return true;

}
function ReformatDate(con) {
    var r = $('#' + con).val();
    if (r.length == 8) {
        par = r.split('/');
        if (par.length == 1) {
            $('#' + con).val(r.substring(0, 4) + '/' + r.substring(4, 6) + '/' + r.substring(6, 8));

        }

    }
}

function blockNonDateNumber(e) {


    if (e.charCode < 47) {

        return false;
    }
    if (e.charCode > 57) {

        return false;
    }
    return true;

}
var sss;
var sss;
function Select2AjaxInit(id, fun) {

    var r = $('#' + id).select2({

        ajax: {
            url: "/Home/Select2Ajax",
            dataType: 'json',
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            params: {
                contentType: 'application/json; charset=utf-8'
            },
            quietMillis: 100,
            data: fun,
            processResults: function (data) {
                sss = data.results;


                return data;
            }

        }
    });

    return r;

}
function Select2AjaxInitTable(id, fun) {
    var valx = $('#' + id).val();
    var r = $('#' + id).select2({

        ajax: {
            url: "/Home/Select2AjaxTable",
            dataType: 'json',
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            params: {
                contentType: 'application/json; charset=utf-8'
            },
            quietMillis: 100,
            data: fun,
            processResults: function (data) {
                sss = data.results;


                return data;
            }

        }
    });
    
    return r;

}
function NumberInput(e, t) {
    t.value = t.value.replace(/,/g, '');
    t.value = addCommas(t.value);

}
function ShowAsMoney(v) {
 
    v = v.toString().replace(/,/g, '');
    v = addCommas(v);
    return v;
}
function ShowBoolean(v) {
    switch (v) {
        case 'True':
            return 'بله';
            break;
        case 'False':
            return 'خیر';
            break;
        case '':
            return 'نا مشخص';
            break;

    }

}
//درج کاما برای عدد
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


function TinyMceEditor(id) {

    tinymce.EditorManager.remove();
    tinymce.init({ selector: '#' + id, plugins: 'print preview fullpage searchreplace autolink directionality  visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime lists textcolor wordcount imagetools contextmenu colorpicker textpattern help', toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat', language: 'fa_IR' });


}
function goToLink(link) {
    var d = document.createElement('a');
    d.href = link;
    document.body.appendChild(d);
    d.click();

    document.removeChild(d);
}
function Para(id) {
    r = document.getElementById('txt' + id);
    if (r != null) {
        if (r.getAttribute('Type') == 'Number') {
            return parseFloat($('#txt' + id).val());
        }
        else {
            return $('#txt' + id).val()
        }
    }
    else {
        return $('#txt' + id).val();

    }

}


var JsEventInterface = new Object();
JsEventInterface.beforeValidate = null;
JsEventInterface.afterVaildate = null;
JsEventInterface.BeforeSubmit = null;
JsEventInterface.AfterSubmit = null;
JsEventInterface.BeforeOkReqSubmit = null;
JsEventInterface.AfterOkReqSubmit = null;
JsEventInterface.BeforeFailReqSubmit = null;
JsEventInterface.AfterFailReqSubmit = null;
JsEventInterface.BeforeReadTable = null;
JsEventInterface.AfterReadTable = null;
JsEventInterface.BeforeOkReqReadTable = null;
JsEventInterface.AfterOkReqReadTable = null;
JsEventInterface.BeforeFailReqReadTable = null;
JsEventInterface.AfterFailReqReadTable = null;
JsEventInterface.BeforeSelect2AjaxInit = null;
JsEventInterface.AfterSelect2AjaxInit = null;
JsEventInterface.BeforeSelect2AjaxGrab = null;
JsEventInterface.AfterSelect2AjaxGrab = null;
JsEventInterface.BeforeInitForm = null;
JsEventInterface.AfterInitForm = null;
JsEventInterface.BeforeInitStartValue = null;
JsEventInterface.AfterInitStartValue = null;
JsEventInterface.BeforeOkReqInitStartValue = null;
JsEventInterface.AfterOkReqInitStartValue = null;
JsEventInterface.BeforeFailReqInitStartValue = null;
JsEventInterface.PageChange = null;
JsEventInterface.BeforeInitAjaxAction = null;
JsEventInterface.AfterInitAjaxAction = null;
JsEventInterface.BeforeOkReqInitAjaxAction = null;
JsEventInterface.AfterOkReqInitAjaxAction = null;
JsEventInterface.BeforeFailReqInitAjaxAction = null;

function CheckAllTable(b) {
    $('[tableCheck]').each(function () {
        $(this).attr('checked', b);
        sendCheckboxToRecord($(this)[0]);
    });


}
function sendCheckboxToRecord(obj) {

    angular.element(obj).scope().record.selected = obj.checked;
}


lastRecord = null;

function MergeNow(v) {
    console.log(JSON.stringify(v));
    var keys = Object.keys(v[0]);
  
    for (var i = 0; i < keys.length; i++) {
  
        if ((keys[i] != "rndId") && (keys[i] != "selected") && (keys[i] != "RowState")) {
            
            lastRecord[keys[i]] = v[0][keys[i]];
        }
    }
    currentScope.$apply({});
}
function GoValuePage(e, st, link) {
 
    if (e.keyCode == 13) {
        var d = document.createElement('a');
        d.href = '#/' + link + '/' + st;
  
        document.body.appendChild(d);
        d.click();
        document.body.removeChild(d);
    }
}
function ExportXls() {
    tableTarget = document.getElementsByTagName('table')[0];
    var data = "<?xml version=\"1.0\" standalone=\"yes\"?><DocumentElement>";
    var header = new Array();
    var th = tableTarget.getElementsByTagName('th');

    for (var q = 0; q < th.length; q++) {
        header.push(th[q].innerText.replace(/ /g, '_').replace(/\\/g, '_').replace(/\(/g, '_').replace(/\)/g, '_'));
    }
    var row = tableTarget.getElementsByTagName('tr');
    for (var k = 0; k < row.length; k++) {
        {
            if (true) {
                q = row[k].getElementsByTagName('td');
                if (q.length != 0) {
                    data += "<report>\r\n";
                    for (var e = 0; e < q.length; e++) {
                        if (q[e].innerText.length == 10) {
                            var kw = q[e].innerText.split('\\');

                            if (kw.length == 3) {

                                data += "<" + header[e] + ">" + kw[2] + '\\' + kw[1] + '\\' + kw[0] + "</" + header[e] + ">\r\n"
                            }
                            else {

                                data += "<" + header[e] + ">" + q[e].innerText + "</" + header[e] + ">\r\n"
                            }
                        }
                        else {

                            data += "<" + header[e] + ">" + q[e].innerText + "</" + header[e] + ">\r\n"
                        }


                    }

                    data += "\r\n</report>\r\n";

                }

            }

        }

    }

    /*
    var row = tableTarget.getElementsByTagName('tr');
    for (var k = 0; k < row.length; k++) {
        {
            if (isHidden(row[k]) == false) {
                var q = row[k].getElementsByTagName('th');
                for (var w = 0; w < q.length; w++) {
                    data += '"' + q[w].innerText + '";';
                }
                q = row[k].getElementsByTagName('td');
                for (var w = 0; w < q.length; w++) {
                    data += '"' + q[w].innerText + '";';
                }
                data += "\r\n";
            }

        }

    }*/
    data += "</DocumentElement>";
    var a = document.createElement('a');
    a.innerHTML = "Click here";
    a.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(data);
    a.target = '_blank';
    a.download = 'report.xls';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function LogOut() {
    var a = document.createElement('a');
    a.innerHTML = "Click here";
    a.href = "/home/LogOut";
 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

}

function GenStyleForTableResponse() {
    var d = document.getElementsByTagName('table');
    if (d.length == 0) {
        return;

    }
    var th = d[0].getElementsByTagName('th');
    var r = '';
    for (var l = 0; l < th.length; l++) {
        r+='td:nth-of-type(' + (l+1).toString() +'):before { content: "' + th[l].innerText +'"; }'

    }
    var sty = document.createElement('style');
    sty.innerHTML = r;
    document.body.appendChild(sty);
}