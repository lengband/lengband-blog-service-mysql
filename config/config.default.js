/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1571844276159_6727'

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'wangpeng',
      // database
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  }
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  }
  config.cors = {
    origin: app => app.request.header.origin, // 想要在 credentials 的情况下实现 * 的效果，要动态获取 origin
    // origin: 'http://localhost:3001',
    // origin: '*', // 浏览器端 withCredentials: true 的情况下不能设置为*
    credentials: true, // 允许携带cookies
    allowMethods: 'GET,HEAD,POST,PUT,DELETE,PATCH,OPTIONS',
  }
  return {
    ...config,
    ...userConfig,
  }
}
