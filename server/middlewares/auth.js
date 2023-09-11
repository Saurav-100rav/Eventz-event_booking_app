const jwt = require('jsonwebtoken');

const verifyUser = (req,res,next)=>{
      // Check if a JWT token is present in cookies
            const token = req.cookies.token;
            // console.log("Token = ",token);
            if (!token) {
                return res.status(401).json({ "msg": 'Unauthorized,No Token found' });
            }
            try {
                // Verify the JWT token
                const decoded = jwt.verify(token, process.env.SECRET_KEY); // Replace with your actual secret key
                console.log("decoded=",decoded);

                // Attach the decoded user information to the request object
                req.id = decoded.id;
            
                // Continue to the protected route
                next();
              } catch (err) {
                return res.status(401).json({ message: 'Unauthorized' });
              }
}
module.exports =verifyUser;
