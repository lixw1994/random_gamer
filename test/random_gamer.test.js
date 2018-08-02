'use strict';
const should = require('should');
const gamerGenerator = require('../module/random_gamer');

describe('random - 简易版', function () {
    it('正确性检验', function (done) {
        let res = gamerGenerator.genSimpleRandomGamer();
        console.log(res);
        res.should.be.an.String();
        res.length.should.equal(6);
        (res[0] >= 'A' && res[0] <= 'Z').should.equal(true);
        (res[1] >= 'A' && res[1] <= 'Z').should.equal(true);
        (res[2] >= '0' && res[2] <= '9').should.equal(true);
        (res[3] >= '0' && res[3] <= '9').should.equal(true);
        (res[4] >= '0' && res[4] <= '9').should.equal(true);
        (res[5] >= '0' && res[5] <= '9').should.equal(true);
        done();
    });
    it('10000 数量时间判定', function (done) {
        for (let i = 0; i < 10000; ++i) {
            let res = gamerGenerator.genSimpleRandomGamer();
            // console.log(res);
            res.should.be.an.String();
            res.length.should.equal(6);
        }
        done();
    });
    it('1000000冲突之后正确性检查', function (done) {
        this.timeout(0);
        for (let i = 0; i < 1000000; ++i) {
            let res = gamerGenerator.genSimpleRandomGamer();
            // console.log(res);
            res.should.be.an.String();
            res.length.should.equal(6);
        }
        done();
    });
    it('半数的表现', function (done) {
        this.timeout(0);
        for (let i = 0; i < 3380000; ++i) {
            let res = gamerGenerator.genSimpleRandomGamer();
            // console.log(res);
            res.should.be.an.String();
            res.length.should.equal(6);
        }
        done();
    });
});

describe('uuid版本', function () {
    it('正确性检查', function (done) {
        let res = gamerGenerator.genHashRandomGamer();
        res.should.be.an.String();
        res.length.should.equal(6);
        (res[0] >= 'A' && res[0] <= 'Z').should.equal(true);
        (res[1] >= 'A' && res[1] <= 'Z').should.equal(true);
        (res[2] >= '0' && res[2] <= '9').should.equal(true);
        (res[3] >= '0' && res[3] <= '9').should.equal(true);
        (res[4] >= '0' && res[4] <= '9').should.equal(true);
        (res[5] >= '0' && res[5] <= '9').should.equal(true);
        done();
    });
    it('10000数量时间判断', function (done) {
        for (let i = 0; i < 10000; ++i) {
            let res = gamerGenerator.genHashRandomGamer();
            // console.log(res);
            res.should.be.an.String();
            res.length.should.equal(6);
        }
        done();
    });
    it('1000000数量冲突正确性检查', function (done) {
        this.timeout(0);
        for (let i = 0; i < 1000000; ++i) {
            let res = gamerGenerator.genHashRandomGamer();
            // console.log(res);
            res.should.be.an.String();
            res.length.should.equal(6);
        }
        done();
    });
    it('半数的表现', function (done) {
        this.timeout(0);
        for (let i = 0; i < 3480000; ++i) {
            let res = gamerGenerator.genHashRandomGamer();
            // console.log(res);
            res.should.be.an.String();
            res.length.should.equal(6);
        }
        done();
    });
});