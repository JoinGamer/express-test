const { cloneDeep } = require('lodash')
const SUCCESS  = 'success'
const FAIL = 'fail'
const successResult = {
    resultCode: '0',
    errMsg: '',
    data: [],
    errCode: 0
}

const errResult = {
    resultCode: '-1',
    errMsg: '',
    data: [],
    errCode: -1
}

function setResultInfo(data, type) {
    const result = cloneDeep(type === SUCCESS ? successResult : errResult);
    return Object.assign(result, data)
}

module.exports = {
    successResult, errResult, setResultInfo, SUCCESS, FAIL
}