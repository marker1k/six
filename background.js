var d = document;
	source = d.getElementById("source");
makeDecode = function() {
    source.value = decode(source.value);
}

makeEencode = function() {
    source.value = encode(source.value);
}
d.getElementById("decode").addEventListener("click", makeDecode, false);
d.getElementById("encode").addEventListener("click", makeEencode, false);