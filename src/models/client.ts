import { Schema,Types,model,Model } from "mongoose";
import { Client } from "../interfaces/client";


const billItemSchema = new Schema({
    quantity: {
        type: Number,
        required: true,
    },
    itemDescription: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    }
})

const clientSchema = new Schema<Client>(
    {
        name: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        cc: {
            type: Number,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        chatId: {
            type: String,
            default: '',
        },
        ccExpirationDate: {
            type: String,
            required:true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
     }
)

const ClientModel = model('Clients', clientSchema);

export default ClientModel;