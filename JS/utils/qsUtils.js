/*************************************predefined*************************************/

/**
 * query String
 * @return {[type]} [description]
 */
function getQueryString() {
    return window.location.search.substr(1);
}

/**
 * format query string into an array of binary arrays
 * @return array
 */
function getParaArray() {
    var qs = arguments[0] || getQueryString();
    if (qs) {
        var paraArr = qs.split('&');
        if (paraArr) {
            var paras = paraArr.map(function(item, index, paraArr) {
                return item.split('=');
            });
            return paras; //[[para,val1],[para,val2]...]
        }
        return;
    }
}

/**
 * both key and value are essential, otherwise kick off
 * @return {Array}
 */
function getValidParaArray() {
    var qs = arguments[0] || getQueryString();
    if (qs) {
        // var paraArr = qs.split('&');
        var paraArr = getParaArray();
        if (paraArr) {
            var paras = paraArr;
            var validParas = [];
            for (var i = paras.length - 1; i >= 0; i--) {
                if ((paras[i][0] && paras[i][1])) {
                    // && 
                    // if((paras[i][0].indexOf('category') == 0 || paras[i][0].indexOf('prop') == 0)&&(typeof (paras[i][1]) == 'number') || (paras[i][1].indexOf('sort') ))
                    // //TODO filter invalid parameters~
                    validParas.push([paras[i][0], paras[i][1]]);
                }
            };
            return validParas; //[[para,val1],[para,val2]...]
        }
        return null;
    }
    return null;
}

/**
 * qs -> map of paras[key, value];
 * @param  {[Map]} paraMap
 * @return {[String]} 
 */
function initQueryMap(paraMap) {
    var paraArray = getValidParaArray();
    if (paraArray && paraArray.length) {
        paraArray.map(function(item, index, arr) {
            if (item[0] && item[1] && paraMap) {
                paraMap.set(item[0], item[1]);
            }
        });
    }
}

/**
 * [removeOtherCategoryItemInMap description]
 * @param  {[type]} paraMap    [description]
 * @param  {[type]} categoryId [description]
 * @return {[type]}            [description]
 */
function removeOtherCategoryItemInMap(paraMap, categoryId) {

    var category = categoryId || paraMap.get('category') || 1;
    /*  unsuitable for chrome
    for (var [key, value] of paraMap) {
        if (key.indexOf('prop') == 0 && !(key.indexOf('prop' + category) == 0)) {
            paraMap.delete(key);
        }
    }
    */
    paraMap.forEach(function(value, key) {
        if (key.indexOf('prop') == 0 && !(key.indexOf('prop' + category) == 0)) {
            paraMap.delete(key);
        }
    });
}


/**
 * get a [key,value] from an id like 'category-1','prop101-2', etc.
 * @param  {[type]} id [description]
 * @return {[key, value] or null} 
 */
function getPara(id) {
    if (id) {
        var i = id.indexOf('-');
        var key = id.slice(0, i);
        var value = id.slice(i + 1, id.length);
        return [key, value];
    }
    return null;
}

/**
 * concate key=value to make a query string
 * @param  {Map} paraMap
 * @return {String}         query string to make a url
 */
function makeQueryStringFromParaMap(paraMap) {
    if (paraMap) {
        var qs = '';
        /*  unsuitable for chrome
        for (var [key, value] of paraMap) {
            if (qs.length) {
                // qs.concat('&', key, '=', value);
                qs = qs + '&' + key + '=' + value;
            } else {
                // qs.concat('?', key, '=', value);
                qs = qs + '?' + key + '=' + value;
            }
        };
        */
        paraMap.forEach(function(value, key) {
            if (qs.length) {
                // qs.concat('&', key, '=', value);
                qs = qs + '&' + key + '=' + value;
            } else {
                // qs.concat('?', key, '=', value);
                qs = qs + '?' + key + '=' + value;
            }
        });
        return qs;
    }
    return '';
}

/**
 * filter and jump to the filtered page
 */
function jump(paraMap) {
    var qs = makeQueryStringFromParaMap(paraMap);
    window.location.href = window.location.pathname + qs;
}

/**********************************end of predefined*********************************/
