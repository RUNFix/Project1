import { Schema,Types,model,Model } from "mongoose";
import { Alert } from "../interfaces/alert";

const alertSchema = new Schema<Alert>(
    {
        chatId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        state: {
            type: Number,
            default: 0,
            enum: [0,1,2,3,4]
        },
        PDFlink: {
            type: String,
            default:''
        },
        imageLink: {
            type: String,
            default:''
        },
    },
    {
        timestamps: true,
        versionKey: false,
     }
)

const AlertModel = model('Alerts', alertSchema);

export default AlertModel;