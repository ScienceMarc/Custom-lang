@echo off
call "C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\VC\Auxiliary\Build\vcvarsall.bat" x64

cl /EHsc /Z7 main.cpp
del main.obj
del mln.exe
ren main.exe mln.exe
exit