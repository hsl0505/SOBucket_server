const express = require('express');

const router = express.Router();

const { bucketController } = require('../controller');

// * POST /buckets/create
router.post('/create', bucketController.create.post);

// * POST /buckets/fork
router.post('/fork', bucketController.fork.post);

// * GET /buckets/home
router.get('/home', bucketController.home.get);

// * POST /buckets/like
router.post('/like', bucketController.like.post);

// * GET /buckets/mypage
router.get('/mypage', bucketController.mypage.get);

// * GET /buckets/mypage/<:id>
router.get('/mypage/<:id>', bucketController.mypageId.get);

// * GET /buckets/pid/<:id>
router.get('/pid/<:id>', bucketController.pid.get);

module.exports = router;
