import {Document, Schema} from 'mongoose';

export interface ISection{
    name : string;
    userId : Schema.Types.ObjectId;
    fontSize : number;
    fontColor : string;
    backgroundColor : string;
    image : string;
    backgroundImage : string;
    title : string;
    paragraph : string;
}

export interface ISectionDoc extends ISection, Document {
    _id: Schema.Types.ObjectId
};