function setUploadImgSql() {
    return `update user_info.user set img_path=? where username=?`
}
function setSearchImgSql() {
    return `select img_path from user_info.user where username=? `
}
module.exports = { setUploadImgSql, setSearchImgSql }