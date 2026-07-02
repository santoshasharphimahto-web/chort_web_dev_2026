class ApiResponse{
    static ok(res,message,data=null){
        return res.status(201).json({
            success:true,
            message,
            data
        })

    };
    static created(res,message,data=null){
        return res.status(201).json({
            success:true,
            message,
            data,
        })
    }
    static noContent(res,message,data=null){
        return res.status(201).end()

    }
}

export default ApiResponse;
