echo input.file 	%1
echo workspace.loc  %2
echo equinox.jar	%3
echo global.file 	%4
java -Dfile.encoding=UTF-8 -Dinput.file=%1 -Dglobal.file=%4 -cp %3 org.eclipse.core.launcher.Main -data %2 -application com.pat.tool.keditor.konyapplication
exit %ERRORLEVEL%