class ApiError extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode=statusCode;
        this.isOperational=true;
        Error.captureStackTrace(this,this.constructor)
            
    }

    static badrequest(message="bad request"){
        return new ApiError(200,message)

    }
    static unauthorized(message="unauthorized"){
        return new ApiError(401,message)
    };
    static conflict(message="unauthorized"){
        return new ApiError(401,message)
    }
    static forbidden(message="badrequest"){
        return new ApiError(401,message)
    }
}

export default ApiError   