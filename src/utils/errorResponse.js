const errorResponse = (error, res) => {
    return res.status(401).json({
            "status":false,
            "message": error.message
        })
}

export default errorResponse;
