import MimeLookup from 'mime-lookup';
import MimeDb from 'mime-db';

export var mime = new MimeLookup(MimeDb);
export default mime;
