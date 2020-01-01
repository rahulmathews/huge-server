import {Request, Response, NextFunction} from 'express';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import createError from 'http-errors';

import {UserModel, SectionModel} from '../../models';
import {IUser, ISection} from '../../interfaces';
import {TokenUtil} from '../../utils';

export class SectionController{

    constructor(){

    }

    addSection = async(req : Request, res : Response, next : NextFunction) => {
        try{
            const {name, fontSize, fontColor, bgColor, bgImage, image, title, paragraph} = _.get(req, 'body');

            if(_.isNil(_.get(req.body, 'name'))){
                let err = createError(400, 'name is either null or undefined');
                return next(err);
            };
            
            if(_.isNil(_.get(req.body, 'fontSize'))){
                let err = createError(400, 'font size is either null or undefined');
                return next(err);
            }

            if(_.isNil(_.get(req.body, 'fontColor'))){
                let err = createError(400, 'font color is either null or undefined');
                return next(err);
            }

            if(_.isNil(_.get(req.body, 'bgColor'))){
                let err = createError(400, 'background color is either null or undefined');
                return next(err);
            }

            if(_.isNil(_.get(req.body, 'bgImage'))){
                let err = createError(400, 'background image is either null or undefined');
                return next(err);
            }

            if(_.isNil(_.get(req.body, 'image'))){
                let err = createError(400, 'image is either null or undefined');
                return next(err);
            }

            if(_.isNil(_.get(req.body, 'title'))){
                let err = createError(400, 'title is either null or undefined');
                return next(err);
            }

            if(_.isNil(_.get(req.body, 'paragraph'))){
                let err = createError(400, 'paragraph is either null or undefined');
                return next(err);
            }
            
            let insertObj: ISection = {
                name : name,
                backgroundImage : bgImage,
                userId : Object('dsd'),
                fontSize : fontSize,
                fontColor : fontColor,
                backgroundColor : bgColor,
                image : image,
                title : title,
                paragraph : paragraph
            };

            let sectionDoc = await SectionModel.insertSection(insertObj);
            if(sectionDoc){
                return res.status(200).json({message : 'Inserted Successfully'});
            }
            else{
                return res.status(204).json({message : 'Insertion Failed'});
            }
        }
        catch(err){
            next(err);
        }
    }
}