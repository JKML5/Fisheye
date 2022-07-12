class MediaFactory {
    constructor(data, type) {
        if (type === 'image') {
            return new MediaImage(data)
        } else if (type === 'video') {
            return new MediaVideo(data)
        } else {
            throw 'Unknown type format'
        }
    }
 }