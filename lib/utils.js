'use strict';
const log4js = require('log4js');
const fs = require('fs');

/**
 * 获取随机字符串
 * @param {Number} length 
 * @param {String} [type] - l: letter n: number any: any
 */
function getRandomString(length, type) {
    let text = [];

    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if (type == 'n') {              // n: number
        possible = '0123456789';
    }  else if (type == 'l') {      // l: letter
        possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    } else {                        // any
        possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }

    for (let i = 0; i < length; i++) {
        text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }

    return text.join('');
}

/**
 * 获取日志实例
 * @param {String} [category] - console file   default is file
 */
function getLogger(category) {
    if (!fs.existsSync('logs')) fs.mkdirSync('logs');

    log4js.configure({
        appenders: [
            {
                type: 'console',
                category: 'console'
            }, {
                type: 'dateFile',
                filename: 'logs/hfs2.log',
                pattern: '_yyyy-MM-dd',
                alwaysIncludePattern: false,
                category: 'file'
            }
        ],
        replaceConsole: true,
        levels: {
            dateFileLog: 'info'
        }
    });

    return log4js.getLogger(category === 'console' ? 'console' : 'file');
}

module.exports = {
    getRandomString,
    getLogger
};