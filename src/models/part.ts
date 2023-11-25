import { Schema,Types,model,Model } from "mongoose";
import { Part } from "../interfaces/part";

const partSchema = new Schema <Part> ({
    marca: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 100
    },
    image: {
        type: String,
        required: true
    },
})

const PartModel = model('Parts', partSchema);

export default PartModel;