import mongoose from "mongoose";
import User from "../models/usermodel.js"


const runMigration = async () => {
    try {
        const result = await User.updateMany(
            { twoFactorEnabled: { $exists: false } }, // only users missing the field
            {
                $set: {
                    twoFactorSecret: null,
                    twoFactorEnabled: false
                }
            }
        );

        if (result.modifiedCount > 0) {
            console.log(`✅ Migration done : ${result.modifiedCount} users updated`);
        } else {
            console.log("✅ Migration : No users needed updating");
        }

    } catch (error) {
        console.log(`❌ Migration failed : ${error}`);
    }
};

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongo db connected")

        await runMigration();

//         const users = await User.find({ 
// username: { $exists: true } });
// console.log(users);
    } catch (error) {
        console.log(`error in connecting db : ${error}`);
        process.exit(1)
    }
}

export default connectDB;