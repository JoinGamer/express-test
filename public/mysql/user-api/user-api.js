
function getCreateUserSql() {
    return 'insert into user_info.user (username,nick_name, password, email, level, age) value (?,?,?,?,1,?)'
}

function getSearchUserSql(params) {
    const { userName, pageSize=10, curPage=1 } = params || {};
    if(userName){
        return `select * from user_info.user where username=? and password=? limit ${(curPage -1 ) * pageSize}, ${pageSize}`
    }else{
        return `select * from user_info.user limit ${(curPage -1 ) * pageSize}, ${pageSize}`;
    }
}

module.exports = {
    getCreateUserSql,
    getSearchUserSql
}