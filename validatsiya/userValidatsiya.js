const validateRequest = (req, requiredFields) => {
    for (const field of requiredFields) {
        if (!req.body[field]) {
            return `${field} maydoni majburiy!`;
        }
    }
    return null; 
};
module.exports = validateRequest
