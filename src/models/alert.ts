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
            required: true,
            enum: [1,2,3]
        },
        link: {
            type: String,
            required:true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
     }
)

const AlertModel = model('Alerts', alertSchema);

export default AlertModel;