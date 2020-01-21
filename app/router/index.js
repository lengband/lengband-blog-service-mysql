'use strict'

module.exports = app => {
  const { router, controller } = app
  const adminauth = app.middleware.adminauth()
  router.get('/api/index', adminauth, controller.index.checkLogin)
  router.post('/api/addArticle', adminauth, controller.index.addArticle)
  router.post('/api/updateArticle', adminauth, controller.index.updateArticle)
  router.get('/api/delArticle/:id', adminauth, controller.index.delArticle)
  router.post('/api/checkLogin', controller.index.checkLogin)
  router.get('/api/getTypeInfo', controller.index.getTypeInfo)
  router.get('/api/getArticleList', controller.index.getArticleList)
  router.get('/api/getArticleById/:id', controller.index.getArticleById)
  router.get('/api/getListById/:id', controller.index.getListById)
}
