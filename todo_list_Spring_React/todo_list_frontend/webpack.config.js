module.exports={
    reactStrictMode:false,
    webPack5:true,
    resolve:{
        fallback:{ "util": require.resolve("util/") },
    },
    node: {
        fs: "empty"
    },
};