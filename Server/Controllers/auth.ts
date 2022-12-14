import express from 'express';

// need passport functionality
import passport from 'passport';

// need to include the User model for authentication functions
import User from '../Models/user';

// import { UserDisplayName } from '../Util'; 

// Display Functions
export function DisplayLoginPage(req: express.Request, res: express.Response , next: express.NextFunction)
{ if(!req.user) 
    {
        return res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: ''});
    }
    return res.redirect('/movie-list');
    
}

export function DisplayRegisterPage(req: express.Request, res: express.Response , next: express.NextFunction)
{
    if(!req.user ) 
    {
        return   res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: ''});
    }
    return res.redirect('/movie-list');
   
}

// Processing Functions
export function ProcessLoginPage(req: express.Request, res: express.Response , next: express.NextFunction)
{
    passport.authenticate('local', function(err, user, info)
    {
        //are there server errors?
        if(err) 
        {
            console.error(err); 
            res.end(err);
        }
        //are ther login errors?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error!');
            return res.redirect('/login');
        }
        //no error we have good user name password
        req.logIn(user, function(err)
        {
            //are there db error?
            if(err) 
            {
                console.error(err); 
                res.end(err);
            }
            return res.redirect('/movie-list');
        })
    }) (req,res,next);
}


export function ProcessRegisterPage(req: express.Request, res: express.Response , next: express.NextFunction)
{
    //instantiate  a new user object
    let newUser = new User
    ({
       username : req.body.username,
       EmailAddress : req.body.emailAddress,
       DisplayName : req.body.firstName + " " + req.body.lastName
    });
    User.register(newUser, req.body.password, function(err)
    {
        if(err)
        {
            if(err.name == "UserExistsError")
            {
                console.error('ERROR: User Already Exists!');
                req.flash('registerMessage', 'Registration Error!');
            }
            else 
            {
                console.error(err.name); // other error
                req.flash('registerMessage', 'Server Error');
            }
            return res.redirect('/register');
        }

        // if everything is ok - user has been registered

        // automatically login the user
        return passport.authenticate('local')(req, res, function()
        {
            return res.redirect('/login');
        });

    })

}


export function ProcessLogoutPage(req: express.Request, res: express.Response , next: express.NextFunction)
{
    
}
