/**
 * @Define UUID Component - used to generate the uuid;
 * @name uuid.js
 * @author journey
 * @license BSD
 */

"use strict";
var uuidTemplate = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
function generateUUID() {
    return uuidTemplate.replace(/[xy]/g, function(c) {
        var r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export {generateUUID};
