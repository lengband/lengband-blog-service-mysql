'use strict'

const EggController = require('egg').Controller

class Controller extends EggController {

  // 判断用户名密码是否正确
  async checkLogin() {
    const userName = this.ctx.request.body.userName
    const password = this.ctx.request.body.password
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
      "' AND password = '" + password + "'"
    const res = await this.app.mysql.query(sql)
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime()
      this.ctx.session.openId = { openId }
      this.ctx.body = { data: '登录成功', openId }
    } else {
      this.ctx.body = { data: '登录失败' }
    }
  }

  // 后台文章分类信息
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type')
    this.ctx.body = { data: resType }
  }

  // 添加文章
  async addArticle() {
    const tmpArticle = this.ctx.request.body
    // tmpArticle.
    const result = await this.app.mysql.insert('article', tmpArticle)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId
    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    }
  }

  // 修改文章
  async updateArticle() {
    const tmpArticle = this.ctx.request.body
    const result = await this.app.mysql.update('article', tmpArticle)
    const updateSuccess = result.affectedRows === 1
    this.ctx.body = {
      isScuccess: updateSuccess,
    }
  }

  // 获得文章列表
  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.create_time as create_time,' +
      // "FROM_UNIXTIME(article.create_time, '%Y-%m-%d %H:%i:%s') as create_time," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id'
    const resList = await this.app.mysql.query(sql)
    this.ctx.body = { list: resList }
  }

  // 根据文章ID得到文章详情，用于修改文章
  async getArticleById() {
    const id = this.ctx.params.id
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      'article.create_time as create_time,' +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  // 删除文章
  async delArticle() {
    const id = this.ctx.params.id
    const res = await this.app.mysql.delete('article', { id })
    this.ctx.body = { data: res }
  }

  async index() {
    this.ctx.body = 'lengband-blog-service index'
  }

  // 根据类别ID获得文章列表
  async getListById() {
    const id = this.ctx.params.id
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.create_time as create_time,' +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE type_id=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }
}

module.exports = Controller
