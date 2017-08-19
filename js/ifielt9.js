// This script works around an issue with IE prior to v9, which, if it doesn't recognize an element name, will insert the element
// into the DOM as an empty node with no children; so elements that you expect to be children of the unrecognized element will be
// inserted as siblings.
var e = ("abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark menu meter nav output picture progress section summary template time video").split(' ');
for (var i = 0; i < e.length; i++) { document.createElement(e[i]); }