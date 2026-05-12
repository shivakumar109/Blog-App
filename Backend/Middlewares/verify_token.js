import jwt from 'jsonwebtoken';
export const verifyToken = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      let token;
      // check Authorization header
      if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      }
      // fallback to cookie
      else if (req.cookies.token) {
        token = req.cookies.token;
      }
      // no token
      if (!token) {
        return res.status(400).json({
          message: "Unauthorized req. Please login"
        });
      }
      // VERIFY TOKEN
      const decodeToken = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      //  role check
      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(decodeToken.role)
      ) {
        return res.status(403).json({
          message: "Forbidden. You don't have permission"
        });
      }

      // attach user info
      req.user = decodeToken;

      next();

    } catch (err) {

      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Session expired. Please login again"
        });
      }

      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "Invalid token. Please login again"
        });
      }

      return res.status(500).json({
        message: "Server error"
      });
    }

  }

}