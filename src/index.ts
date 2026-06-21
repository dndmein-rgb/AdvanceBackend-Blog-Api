import {app} from "./app.js"
import { PORT } from "./config/config.js"
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
