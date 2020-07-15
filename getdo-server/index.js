const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');

//create server
const app = express();

//connect to mongodb
connectDB();

//enable cors
app.use(cors());

//enable express.json
app.use(express.json({ extended: true }));

//app port
const PORT = process.env.PORT || 4000;

// import routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
/*
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));
*/

//arrancar el servidor
app.listen(PORT, () => {
	console.log(`Server is running in port: ${PORT}`);
});
