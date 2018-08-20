const Auth = {
    verify: function (req, res, next) {
        req.user = {
            id: 'fucking-id'
        };

        next();
    },
    authenticate: function (req, res, next) {
    }
};

export default Auth;