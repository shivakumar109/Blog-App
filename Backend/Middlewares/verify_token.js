import jwt from 'jsonwebtoken';

export const verifyToken = (...allowedRoles) => {
     return async (req, res, next) => {
          try {
               //read token from req
               let token = req.cookies.token; //{token:""}
               //console.log("token ",token);
               if (!token) {
                    return res.status(400).json({ message: "Unauthorized req.Plz login" })
               }
               //verify the validity of token(decoding the token)
               let decodeToken = jwt.verify(token, process.env.JWT_SECRET);

               //check if role is allowed
               if (!allowedRoles.includes(decodeToken.role)) {
                    return res.status(403).json({ message: "forbidden, You don't have the permmision" })
               }
               //attach user info to req for use in routes
               req.user = decodeToken;
               //forward to next middleware/route
               next()
          } catch (err) {
               //jwt.verify throws if taoken is invalide or expried
               if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ message: "session expried Please login again" })
               }
               if (err.name === "JsonWebTokenError") {
                    return res.status(401).json({ message: "Invalid token Please login again" })
               }
               //next(err);
          }
     }
}