import { defineConfig } from "cypress";
import { devServer } from '@cypress/webpack-dev-server'

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/"
  },
  component: {
    //@ts-expect-error
    devServer(devServerConfig) {
      return devServer({
        ...devServerConfig,
        framework: 'create-react-app',
        webpackConfig: require('./webpack.config.js')
      })
    }
  }
});