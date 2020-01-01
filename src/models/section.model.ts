import mongoose, { Model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

import { ISectionDoc } from '../interfaces';

const SectionSchema = new mongoose.Schema<ISectionDoc>({
    name : {
        type : String,
        required : true,
        lowercase : true,
        index : true,
        unique : true
    },
    userId : {type : Schema.Types.ObjectId, ref : 'User'},
    fontSize : {type : Number, default : 16},
    fontColor : {type : String, default : '#fff'},
    backgroundColor : {type : String, default : '#fff'},
    image : {
        type : String
    },
    backgroundImage : {
        type : String
    },
    title : {
        type : String
    },
    paragraph : {
        type : String
    }
    
}, {timestamps : true});

//Schema setters
SectionSchema.set('toJSON', {
    transform : function(doc, ret){
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        delete ret.password;
    }
})

//plugins
SectionSchema.plugin(mongoosePaginate);

//methods

//Method to save/insert sections
SectionSchema.statics.insertSection = async(userObj : any) =>{
    return SectionModel.create(userObj);
}

//Method to search for any query
SectionSchema.statics.search = async(searchQuery : any, options: any) => {
    //@ts-ignore
    return SectionModel.paginate(searchQuery, options);
    // return UserModel.find(searchQuery);
}

//Method to search for single document
SectionSchema.statics.searchOne = async(searchQuery : any) => {
    return SectionModel.findOne(searchQuery);
}

//Method to update a single document
SectionSchema.statics.updateOne = async(searchQuery : any, updateQuery : any) => {
    return SectionModel.findOneAndUpdate(searchQuery, updateQuery, {new : true});
}

//Method to remove a single document
SectionSchema.statics.deleteOne = async(searchQuery : any) => {
    return SectionModel.findOneAndRemove(searchQuery);
}

interface ISectionModel extends Model<ISectionDoc> {
    insertSection : (userObj : any) => Promise<ISectionDoc>;
    search : (searchQuery : any, options: any) => Promise<ISectionDoc[]>;
    searchOne : (searchQuery : any) => Promise<ISectionDoc>;
    updateOne : (searchQuery : any, updateQuery : any) => any;
    deleteOne : (searchQuery : any) => any;
};

export const SectionModel = mongoose.model<ISectionDoc, ISectionModel>('Country', SectionSchema);
