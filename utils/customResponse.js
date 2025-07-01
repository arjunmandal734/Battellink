const customResponse = (res, response) => {
    const data = response.data || false;
    const message = response.message || "Massage";

    return res.status(200).json({
        success: true,
        message,
        data,
    });
}

export default customResponse;