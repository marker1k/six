// URL Safe Base64: + -> -; / -> _;
// кодирование и раскодирование
// private property
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    fromCharCode = String.fromCharCode;

// public method for encoding
function encode (input, maxLength) {

    maxLength = maxLength || 1e6;
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = utf8_encode(input, maxLength*3/4 | 0);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
            keyStr.charAt(enc1) + keyStr.charAt(enc2) +
            keyStr.charAt(enc3) + keyStr.charAt(enc4);

    }

    return output;
}
function utf8_encode(string, maxLength) {

    string = string.replace(/\r\n/g,"\n");
    var utftext = "", nextChar;

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            nextChar = fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            nextChar = fromCharCode((c >> 6) | 192);
            nextChar += fromCharCode((c & 63) | 128);
        }
        else {
            nextChar =  fromCharCode((c >> 12) | 224);
            nextChar += fromCharCode(((c >> 6) & 63) | 128);
            nextChar += fromCharCode((c & 63) | 128);
        }
        if (utftext.length + nextChar.length > maxLength) break;
        utftext += nextChar;
    }
    return utftext;
}

// public method for decoding
function decode(input) {
    var output = "",
        chr1, chr2, chr3,
        enc1, enc2, enc3, enc4,
        i = 0;

    input = input.replace(/[^A-Za-z0-9\-\_\=]/g, "");

    while (i < input.length) {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output += String.fromCharCode(chr1);

        if (enc3 != 64) {
            output += String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output += String.fromCharCode(chr3);
        }
    }

    return utf8_decode(output);
}
function utf8_decode(utftext) {
    var string = "",
        i = 0,
        c = 0, c2 = 0;

    while (i < utftext.length) {
        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if ((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = utftext.charCodeAt(i+1);
            var c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }

    return string;
}