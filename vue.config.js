const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  // Webpack 설정 수정
  configureWebpack: {
    devtool: 'source-map' // eval 대신 source-map 사용
  },

  // 추가로 chainWebpack 사용 (필요한 경우)
  chainWebpack: config => {
    config.devtool('source-map'); // chainWebpack 방식으로도 설정 가능
  }
});
