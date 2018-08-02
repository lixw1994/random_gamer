'use strict';
const utils = require('../lib/utils');
const uuid = require('uuid');
const logger = utils.getLogger();

// should cache or db
let gamerMap = {
    /**
     * gamer: time
     */
};

/**
 * 简易版生成随机的游戏名称 - 暂无提供灵活的扩展
 */
function genSimpleRandomGamer() {
    let gamer = genGamer();
    if (gamerMap[gamer]) {
        logger.info(`简易版 dup gamer: ${gamer}`);
        genSimpleRandomGamer();
    } else {
        gamerMap[gamer] = Date.now();
    }
    return gamer;
}

// helper
function genGamer() {
    return (utils.getRandomString(2, 'l') + utils.getRandomString(4, 'n')).toUpperCase();
}



/************************ uuid ***********************/
// should cache or db
let hashGamerMap = {};
/**
 * uuid版本
 */
function genHashRandomGamer() {
    let gamer = genHashGamer();
    while (hashGamerMap[gamer]) {
        logger.info(`uuid版 dup gamer: ${gamer}`);
        gamer = genHashGamer();
    }
    return gamer;
}

function genHashGamer() {
    let uniqId = uuid.v4();
    let chunks = uniqId.split('-');
    let res = [];
    for (let i = 0; i < chunks.length; ++i) {
        let chunk = chunks[i];
        if (i === 0) {
            // 字母处理
            let firstLetter = chunk.slice(0, chunk.length / 2);
            firstLetter = String.fromCharCode(parseInt(firstLetter, 16) % 26 + 65);
            res.push(firstLetter);
            let secondLetter = chunk.slice(chunk.length / 2, chunk.length);
            secondLetter = String.fromCharCode(parseInt(secondLetter, 16) % 26 + 65);
            res.push(secondLetter);
        } else {
            // 数字处理
            let number = parseInt(chunk, 16) % 10;
            res.push(number);
        }
    }
    return res.join('');
}

module.exports = {
    genSimpleRandomGamer,
    genHashGamer,
    genHashRandomGamer,
};