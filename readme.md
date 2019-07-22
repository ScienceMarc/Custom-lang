# M-lang
This is a little project I've been working on to see if I could make a functioning interpreted programming language.

This language is currently very bare bones. It is barely passed Turing Completeness and strange bugs do occur occasionally.

The code must be contained in the same folder as the interpreter and must be named "code.mls". This is subject to change.

# Syntax
!Case sensitive!
## num
Declares a floating point number
#### example: num x = 10

## string
Declares a string, warning, not well supported and may get removed in future. Do not use.
#### example: string x = "Hello World!"

## print
Prints the contents between it's parentheses into the console in yellow.
#### example: print("Hello World")

## jump
Takes 1 or 2 arguments. If only one argument is given it will always jump. The second argument is a condition, currently only supporting equality checks such as x==2. The first number provided is the line number it will jump to.

#### example: jump(1)  => jumps to line 1
#### example 2: jump(1,x==2) => jumps to line 1 if x is equal to 2

## Arithmetic
Currently only addition and subtraction is supported. So x + 2 and 2 - 1 work but 7 * x or x / 2 do not.

## Running the code.
The code is written under [NodeJS](https://nodejs.org/en/) so NodeJS is required to run the unpackaged code on your machine. The included "index.js" file contains all of the important code for the project.

To run the code, enter these commands into the terminal:
```Shell Session
> npm install
> node ./index.js
```

If you would like to package the code into a single executable without the need of having node installed on the client computer, run these commands.

```Shell Session
> npm install
> npm install -g pkg
> pkg ./index.js
```
This will generate executable files for all three major platforms, Windows, OSX, and Linux.
A prebuilt windows binary is provided under the "build" folder named "interpreter.exe".

For more options, refer to the [pkg documentation](https://www.npmjs.com/package/pkg)