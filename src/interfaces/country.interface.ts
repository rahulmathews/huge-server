import {Document, Schema} from 'mongoose';


export interface ICountry{
    username: string;
    password: string;
    userType?: 'USER' | 'ADMIN';
    gender?: 'MALE' | 'FEMALE' | 'OTHERS';
    occupation?: string;
    emails?: Array<{
        value : string,
        primary : boolean,
    }>;
    phones?: Array<{
        value : string,
        primary : boolean,
    }>;
    images?: Array<{
        link : string,
        primary : boolean,
    }>;
}

export interface ICountryDoc extends ICountry, Document {
    _id: Schema.Types.ObjectId
};