// 将接口地址抽离封装,方便之后对接口地址的改变

// 加分号的作用是防止函数被其他变量调用,例如,function (function(){})()
; (function (w) {
    // 将baseURL定义成变量,方便之后更改基地址
    let baseURL = 'http://localhost:8080/api/v1';
    const BigNew = {
        baseURL: baseURL,                                       //基地址
        user_login: baseURL + '/admin/user/login',              //用户登录
        user_info: baseURL + '/admin/user/info',                //获取用户信息
        user_detail: baseURL + '/admin/user/detail',            //获取用户详情
        use_edit: baseURL + '/admin/user/edit',                 //编辑用户信息
        category_list: baseURL + '/admin/category/list',        //所有文章类别
        category_add: baseURL + '/admin/category/add',          //新增文章类别
        category_search: baseURL + '/admin/category/search',    //根据id查询指定文章类别
        category_edit: baseURL + '/admin/category/edit',        //编辑文章类别
        category_delete: baseURL + '/admin/category/delete',    //删除文章类别
        article_query: baseURL + '/admin/article/query',        //文章搜索
        article_publish: baseURL + '/admin/article/publish',    //发布文章
        article_search: baseURL + '/admin/article/search',      //根据id获取文章信息
        article_edit: baseURL + '/admin/article/edit',          //文章编辑
        article_delete: baseURL + '/admin/article/delete',      //删除文章
        data_info: baseURL + '/admin/data/info',                //获取统计数据
        data_article: baseURL + '/admin/data/article',          //日新增文章数据统计
        data_category: baseURL + '/admin/data/category',        //各类型文章数量统计
        data_visit: baseURL + '/admin/data/visit',              //日文章访问量
        comment_search: baseURL + '/admin/comment/search',      //文章评论搜索
        comment_pass: baseURL + '/admin/comment/pass',          //评论审核通过
        comment_reject: baseURL + '/admin/comment/reject',      //评论审核不通过
        comment_delete: baseURL + '/admin/comment/delete'       //删除评论
    }
    // 暴露接口
    w.BigNew = BigNew;
})(window)