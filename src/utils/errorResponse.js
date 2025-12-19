const errorResponse = (error, res) => {
    return res.status(500).json({
            "status":false,
            "message": error.message
        })
}

export default errorResponse;
