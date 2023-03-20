const express = require('express');
const router = express.Router();
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const { setResultInfo, SUCCESS, FAIL } = require('../public/common/common-result')
const mysql_connect = require('../public/mysql/mysql-db');
const { setUploadImgSql, setSearchImgSql } = require('../public/mysql/img-api/upload-img')
const { existFolder } = require('../public/common/common-utils')
router.post('/upload', async (req, res) => {
    const { userName } = req.query || {};
    if (!userName) {
        res.send(setResultInfo({ errMsg: '账号信息不存在' }), FAIL)
        return
    }
    const uploadPath = path.resolve(__dirname, `../public/images/${userName}`)
    await existFolder(uploadPath)
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadPath;
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (Object.keys(files || {}).length) {
            let newPath = path.resolve(form.uploadDir, files.file.originalFilename);
            fs.renameSync(files.file.filepath, newPath);
            mysql_connect.query(setUploadImgSql(newPath), [newPath, userName], (err, data) => {
                if (err) {
                    const errRes = setResultInfo({ errMsg: err.sqlMessage }, FAIL)
                    res.send(errRes);
                } else {
                    res.send(setResultInfo({ data }, SUCCESS))
                }
            })
            return
        }
        res.send(setResultInfo({ errMsg: 'files is null' }, FAIL))
    })
})

router.get('/download', (req, res) => {
    const { userName } = req.query || {}
    if (!userName) {
        res.send(setResultInfo({ errMsg: '账号信息不存在' }), FAIL)
        return
    }
    mysql_connect.query(setSearchImgSql(), [userName], (err, data) => {
        if(err){
            res.send(setResultInfo({errMsg: err.sqlMessage}), FAIL);
            return
        }
        if(data && data.length === 1){
            const imgPath = data[0]['img_path'];
            if(imgPath){
                const fileName = path.basename(imgPath)
                fs.readFile(imgPath, (err, file) => {
                    if(err){
                        res.send(setResultInfo({errMsg: err},FAIL))
                    }
                    res.writeHead(200, {
                        'Content-Type': 'application/force-download',
                        'Content-Disposition': 'attachment; filename=' + fileName
                    })
                    res.end(file);
                })
                return
            }
        }
        res.send(setResultInfo({errMsg: '查询不到文件或图片'},FAIL))
    })
})


module.exports = router;