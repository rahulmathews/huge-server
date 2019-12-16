import express, {Request, Response, NextFunction} from 'express';
const userRouter = express.Router();

import createError from 'http-errors';
import * as _ from 'lodash';

// import categoryRouter from './category.routes';
import {UserModel} from '../models';
import {SessionMiddleware, AuthMiddleware} from '../middlewares';
import {UserController} from '../controllers';

//Initialize controllers
const userController = new UserController();

//Session Middleware
let session = new SessionMiddleware();

//Authentication Middleware
let authMiddleware = new AuthMiddleware();

//Function to extract either the already existing session or create new session
const sessionExtractionFn = async(req:Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    return session.extractExistingSessionOrInitializeNewSession(req, res, next)
}

//Middleware to verfiy the Ids from parameters
const idVerificationMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    try{
        userRouter.param('userId', function(req, res, next, val){
            if(_.isNil(val)){
                let error = createError(400, 'User Id is either null or undefined');
                throw error
            }

            UserModel.findOne({_id : val})
            .then(function(userDoc){
                if(!userDoc){
                    let error = createError(400, 'Invalid User Id');
                    throw error
                }
                _.set(res.locals, 'docs.userDoc', userDoc);
                // res.locals.userDoc = userDoc;
                return next();
            })
            .catch(function(err){
                next(err);
            })
        })
        return next();
    }
    catch(err){
        next(err);
    }
}


/* Ping Api*/
userRouter.get('/ping', function(req, res, next) {
  res.send('pong');
});

//Router-level Middlewares

//Id Verfication Middleware
userRouter.use(idVerificationMiddleware);

//User Routes

userRouter.get('/:userId([0-9A-Za-z]{24})/countries', 
    authMiddleware.authJwt,
    sessionExtractionFn,
    (req, res, next) => userController.registerUser(req, res, next)
)

export default userRouter;
