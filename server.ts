import * as app from './app'

import * as mongoose from "mongoose";

mongoose.default.connect(process.env.LOCAL_CONN_STR!, {dbName: process.env.DB_NAME,});

app.default.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
})
