if (WScript.Arguments.length == 0) {
    //WScript.Arguments.ShowUsage(); //who will read this in console?
    WScript.Quit();
}
var text = new Array();
for (var i=0; i<WScript.Arguments.Unnamed.Count; i++)
    text.push(WScript.Arguments.Unnamed(i));

    var sv = WScript.CreateObject("SAPI.SpVoice");
    sv.WaitUntilDone(-1);
    //speak
    sv.speak(text.join(' '),0);
   
