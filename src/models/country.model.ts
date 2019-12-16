import mongoose, { Model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

import { IUserDoc } from '../interfaces';

const CountrySchema = new mongoose.Schema<IUserDoc>({
    name : {
        type : String,
        required : true,
        lowercase : true,
        index : true,
        unique : true
    },
    userId : {type : Schema.Types.ObjectId, ref : 'User'},
    region : {type : String},
    description : {type : String},
    continent : {type : String},
    states : [{type : String}],

    
}, {timestamps : true});

//Schema setters
CountrySchema.set('toJSON', {
    transform : function(doc, ret){
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        delete ret.password;
    }
})

//plugins
CountrySchema.plugin(mongoosePaginate);

//methods

//Method to save/insert users
CountrySchema.statics.insertUser = async(userObj : any) =>{
    return CountryModel.create(userObj);
}

//Method to search for any query
CountrySchema.statics.search = async(searchQuery : any, options: any) => {
    //@ts-ignore
    return CountryModel.paginate(searchQuery, options);
    // return UserModel.find(searchQuery);
}

//Method to search for single document
CountrySchema.statics.searchOne = async(searchQuery : any) => {
    return CountryModel.findOne(searchQuery);
}

//Method to update a single document
CountrySchema.statics.updateOne = async(searchQuery : any, updateQuery : any) => {
    return CountryModel.findOneAndUpdate(searchQuery, updateQuery, {new : true});
}

//Method to remove a single document
CountrySchema.statics.deleteOne = async(searchQuery : any) => {
    return CountryModel.findOneAndRemove(searchQuery);
}

interface IUserModel extends Model<IUserDoc> {
    insertUser : (userObj : any) => Promise<IUserDoc>;
    search : (searchQuery : any, options: any) => Promise<IUserDoc[]>;
    searchOne : (searchQuery : any) => Promise<IUserDoc>;
    updateOne : (searchQuery : any, updateQuery : any) => any;
    deleteOne : (searchQuery : any) => any;
};

export const CountryModel = mongoose.model<IUserDoc, IUserModel>('Country', CountrySchema);
