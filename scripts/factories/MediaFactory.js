class MediaFactory {
    constructor(data) {
        if (data.image != undefined && data.image != '') {
            return new MediaImage(data)
        } else if (data.video != undefined && data.video != '') {
            return new MediaVideo(data)
        } else {
            throw 'Unknown type format'
        }
    }
 }