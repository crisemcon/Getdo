const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
	//leer el token del header
	const token = req.header('x-auth-token');
	//revisar si no hay token
	if(!token){
		return res.status(401).json({msg: 'There is no token, permission denied'});
	}
	
	//validar el token
	try {
		const encryption = jwt.verify(token, process.env.SECRETA);
		req.user = encryption.user;
		next();
	} catch (error) {
		res.status(401).json({msg: 'Token is not valid'});
	}

}