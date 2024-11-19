const { default: mongoose } = require("mongoose")

 const connectDb =async (url)=>{
    await mongoose.connect(url);
}
module.exports = {
    connectDb
}