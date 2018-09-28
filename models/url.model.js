var Schema = mongoose.Schema;

var urlSchema = new Schema({
    original_url: { 
        type: String, 
        required: true
    },
    short_url: { 
        type: String, 
        required: true
    }
});

var Url = mongoose.model("Url", urlSchema);