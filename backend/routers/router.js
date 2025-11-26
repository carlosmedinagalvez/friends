//const express = require('express')
import express from 'express'
const router = express.Router()
//const presignedurl = require('getpresignedurl')
import * as getpresignedurl from './getpresignedurl.js'

router.get('/users', (req, res) => {
    const r = getpresignedurl.generatePresignedPost()
    console.log(r);
    res.send(r)
  });

//module.exports = router
export default router