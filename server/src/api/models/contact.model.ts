import mongoose from 'mongoose';
interface ContactAttrs {
    firstname: string;
    lastname: string;
    email: string;
    contactnumber: number;
    userId: string;

}
interface ContactModel extends mongoose.Model<ContactDoc> {
    build(attrs: ContactAttrs): ContactDoc;
}
interface ContactDoc extends mongoose.Document {
    firstname: string;
    lastname: string;
    email: string;
    contactnumber: number;
    userId: string;
}

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactnumber: {
        type: Number,
        required: true
    },
    userId: {
        type:String,
        required: true
    }
});

contactSchema.statics.build = (attrs: ContactDoc) => {
    return new Contact(attrs)
}
const Contact = mongoose.model<ContactDoc, ContactModel>('Contact', contactSchema);
export { Contact }

