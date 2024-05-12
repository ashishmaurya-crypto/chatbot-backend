
const checkSessions = async (req, res, next) => {
    console.log('active checkSessions');
    next();
}


const requestInterceptor = async (req, res, next) => {
    console.log('active request interceptor');
    next();
}


module.exports = { requestInterceptor, checkSessions };