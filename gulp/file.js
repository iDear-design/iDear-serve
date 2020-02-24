const gulp = require('gulp');     // 引用基础模块
const args = require('process.args')();     // 引用传参模块

// 引用相关的task方法
const packagePublish = require('../libs/packagePublish')

gulp.task(
  'maxiaoqu',
  gulp.series(done => {
    done()
  })
)

gulp.task(
  'packagePublish',
  gulp.series(done => {
    console.log(123456, args.add)
    packagePublish()
    done()
  })
)
