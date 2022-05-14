export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }                                                                        
    res.redirect('/login');
}

export const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.rol === 'admin') {
        return next();
    }
    res.redirect('/login');
}

export const alreadyAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}