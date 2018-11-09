if (WScript.Arguments.length == 0) {
    WScript.Quit();
}
var fnMD5 = '';
if (WScript.Arguments.Named.Exists("md5"))
    fnMD5 = WScript.Arguments.Named("md5");
var text = new Array();
for (var i=0; i<WScript.Arguments.Unnamed.Count; i++)
    text.push(WScript.Arguments.Unnamed(i));
var fso = new ActiveXObject("Scripting.FileSystemObject");
var scriptPath = fso.GetFile(WScript.ScriptFullName).ParentFolder;
strWavFileName = scriptPath+'/../cms/cached/voice/sapi_'+fnMD5+'.wav';
strMp3FileName = scriptPath+'/../cms/cached/voice/sapi_'+fnMD5+'.mp3';
var wShell = WScript.CreateObject("Wscript.Shell");
if (!fso.FileExists(strMp3FileName)) {//no cached file
    var sv = WScript.CreateObject("SAPI.SpVoice");
    var oFilestream = WScript.CreateObject("SAPI.SpFileStream");
    sv.WaitUntilDone(-1);    // Don't be loud
    //save to wav
    oFilestream.Open(strWavFileName, 3, false);
    sv.AudioOutputStream = oFilestream;
    sv.speak(text.join(' '),0);
    oFilestream.close();
    //convert wav to mp3
    var strCommand = scriptPath+"/lame.exe -V0 "+strWavFileName+" "+strMp3FileName;
    wShell.run(strCommand, 0, true); //WaitUntilDone
    //delete wav
    if(fso.FileExists(strWavFileName)){
        fso.DeleteFile(strWavFileName,true);
    }
}
