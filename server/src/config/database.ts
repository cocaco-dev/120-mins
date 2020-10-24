import mongoose from "mongoose";


export let checkConnection =  (dbPath : string) => {
    const db = mongoose.connection;
    db.once('open', _ => {
    console.log('Database connected successfully:', dbPath)
    });

}
export let connectDB = async (db : string) => {
        await mongoose.connect(db,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true ,
                useCreateIndex: true
            }) 
        console.log('DB Connected');
}


