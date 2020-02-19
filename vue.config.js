module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ["vue", "js"],
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        services: "@/services",
        views: "@/views"
      }
    }
  }
};
