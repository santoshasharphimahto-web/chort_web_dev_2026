import User from "./auth.model.js"
import { accessTokenVerify } from "../../common/utiles/token/verficationToken.js"
import ApiError from "../../common/utiles/res/api-error.js";

async function authme(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        let token;

        if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            throw ApiError.unauthorized("not a authorizedToken");
        }

        // 1. Added 'await' just in case accessTokenVerify returns a promise
        const decoded = await accessTokenVerify(token); 
        
        // 2. Fallback check for both 'id' and '_id' from the token payload
        const targetId = decoded?.id || decoded?._id;
        if (!targetId) {
            throw ApiError.unauthorized("Invalid token payload structure");
        }

        // 3. Find user in database
        const user = await User.findById(targetId);
        if (!user) {
            throw ApiError.forbidden("please login again");
        }

        // 4. Attach user details to request object
        req.user = {
            id: user._id,
            name: user.name,
            role: user.role,
            email: user.email
        };

        next();
    } catch (error) {
        next(error); 
    }
}

const roleBaseAccesaced = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return next(ApiError.forbidden("you do not have a permission to acces"));
        }
        next();
    };
};

export {
    roleBaseAccesaced,
    authme
};