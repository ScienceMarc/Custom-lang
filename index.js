const fs = require("fs");
const colors = require("colors");


let start = process.hrtime();

let code = fs.readFileSync("code.mls") //Load's code 
//TODO: make this read files not named "code"

code = code.toString().replace(/\s*\/\/.*/g, "") //Removes comments
code = code.split(/(?:\r\n|\r|\n)/g); //Splits code by line

console.log("[====Executing====]".blue.inverse)
for (let i in code) {
    console.log(code[i].blue.inverse)
}
console.log("[=================]".blue.inverse)
console.log("\n\n\n")


let vars = []
let coreFunctions = [{ name: "print", func: "print" }, { name: "jump", func: "jump" }] //List of built in functions

for (let line = 0; line < code.length; line++) {
    let code = fs.readFileSync("code.mls")

    code = code.toString().replace(/\s*\/\/.*/g, "")
    code = code.split(/(?:\r\n|\r|\n)/g);

    if (/([a-zA-Z]+\s*(\+|-|\*|\/)\s*-*\d+(\.\d+)*)|(-*\d+(\.\d+)*\s*(\+|-)\s*[a-zA-Z]+)/.exec(code[line])) { //Substitute to do addition/subtraction/multiplication/division
        let string = /([a-zA-Z]+\s*(\+|-|\*|\/)\s*-*\d+(\.\d+)*)|(-*\d+(\.\d+)*\s*(\+|-)\s*[a-zA-Z]+)/.exec(code[line])[0];
        if (/^[a-zA-Z]+/.exec(string)) {
            let subject = /^[a-zA-Z]+/.exec(string);
            for (let i in vars) {
                if (vars[i]["name"] == subject) {
                    subject = vars[i]["value"]
                    string = string.replace(/^[a-zA-Z]+/, subject);
                    code[line] = code[line].replace(/([a-zA-Z]+\s*(\+|-|\*|\/)\s*-*\d+(\.\d+)*)|(-*\d+(\.\d+)*\s*(\+|-)\s*[a-zA-Z]+)/, string)
                }
            }
        }
        if (/[a-zA-Z]+$/.exec(string)) {
            let subject = /[a-zA-Z]+$/.exec(string);
            for (let i in vars) {
                if (vars[i]["name"] == subject) {
                    subject = vars[i]["value"]
                    string = string.replace(/[a-zA-Z]+$/, subject);
                    code[line] = code[line].replace(/([a-zA-Z]+\s*(\+|-|\*|\/)\s*-*\d+(\.\d+)*)|(-*\d+(\.\d+)*\s*(\+|-)\s*[a-zA-Z]+)/, string)
                }
            }
        }
    }
    else if (/[a-zA-Z]+\s*(\+|-|\*|\/)\s*[a-zA-Z]+/.exec(code[line])) { // Special case when both sides are variables
        let string = /[a-zA-Z]+\s*(\+|-|\*|\/)\s*[a-zA-Z]+/.exec(code[line])[0];
        let a = /^[a-zA-Z]+/.exec(string)[0];
        let b = /[a-zA-Z]+$/.exec(string)[0];
        
        for (let i in vars) {
            if (vars[i]["name"] == a) {
                a = vars[i]["value"].toString();
            }
            if (vars[i]["name"] == b) {
                b = vars[i]["value"].toString();
            }
        }
        
        string = string.replace(/^[a-zA-Z]+/,a);
        string = string.replace(/[a-zA-Z]+$/,b);
        code[line] = code[line].replace(/[a-zA-Z]+\s*(\+|-|\*|\/)\s*[a-zA-Z]+/,string);
    }
    if (/-*\d+(\.\d+)*(\s*\+\s*-*\d+(\.\d+)*)+/.exec(code[line])) { //Detects addition
        let string = /-*\d+(\.\d+)*(\s*\+\s*-*\d+(\.\d+)*)+/.exec(code[line])[0]
        let a = parseFloat(/^-*\d+(\.\d+)*/.exec(string)[0])
        let b = parseFloat(/-*\d+(\.\d+)*$/.exec(string)[0])

        code[line] = code[line].replace(/-*\d+(\.\d+)*(\s*\+\s*-*\d+(\.\d+)*)+/, (a + b).toString())
    }
    else if (/-*\d+(\.\d+)*(\s*-\s*-*\d+(\.\d+)*)+/.exec(code[line])) { //Detects subtraction
        let string = /-*\d+(\.\d+)*(\s*-\s*-*\d+(\.\d+)*)+/.exec(code[line])[0]
        let a = parseFloat(/^-*\d+(\.\d+)*/.exec(string)[0])

        let b = parseFloat(/-*\d+(\.\d+)*$/.exec(string)[0])
        code[line] = code[line].replace(/-*\d+(\.\d+)*(\s*-\s*-*\d+(\.\d+)*)+/, (a - b).toString())
    }
    else if (/-*\d+(\.\d+)*(\s*\*\s*-*\d+(\.\d+)*)+/.exec(code[line])) { //Detects multiplication
        let string = /-*\d+(\.\d+)*(\s*\*\s*-*\d+(\.\d+)*)+/.exec(code[line])[0]
        let a = parseFloat(/^-*\d+(\.\d+)*/.exec(string)[0])

        let b = parseFloat(/-*\d+(\.\d+)*$/.exec(string)[0])
        code[line] = code[line].replace(/-*\d+(\.\d+)*(\s*\*\s*-*\d+(\.\d+)*)+/, (a * b).toString())
    }
    else if (/-*\d+(\.\d+)*(\s*\/\s*-*\d+(\.\d+)*)+/.exec(code[line])) { //Detects division
        let string = /-*\d+(\.\d+)*(\s*\/\s*-*\d+(\.\d+)*)+/.exec(code[line])[0]
        let a = parseFloat(/^-*\d+(\.\d+)*/.exec(string)[0])

        let b = parseFloat(/-*\d+(\.\d+)*$/.exec(string)[0])
        code[line] = code[line].replace(/-*\d+(\.\d+)*(\s*\/\s*-*\d+(\.\d+)*)+/, (a / b).toString())
    }
    if (/^[a-zA-Z]+\s*=\s*([a-zA-Z]+|\d+(\.\d+)*)/.exec(code[line])) { //Variable reassignment
        if (/[a-zA-Z]+\s*=\s*[a-zA-Z]+/.exec(code[line])) {
            let string = /[a-zA-Z]+$/.exec(/[a-zA-Z]+\s*=\s*[a-zA-Z]+/.exec(code[line])[0])[0];
            for (let i in vars) {
                if (vars[i]["name"] == string) {
                    string = vars[i]["value"].toString()
                    code[line] = code[line].replace(/[a-zA-Z]+$/, string)
                }
            }
        }
        let subject = /^[a-zA-Z]+/.exec(code[line])[0]
        for (let i in vars) {
            if (vars[i]["name"] == subject) {
                vars[i]["value"] = parseFloat(/\d+(\.\d+)*$/.exec(code[line])[0])
            }
        }
    }
    if (/(num)|(string)\s[a-zA-Z]+/.exec(code[line])) { //* Variable assignment
        //!UPDATE THIS FOR NEW TYPES^^^^
        let variable = { name: "", type: null, value: null };

        if (/num\s/.exec(code[line])) { //Type of number, to be treated as float
            variable.type = "number";
        }
        else if (/string\s/.exec(code[line])) {
            variable.type = "string";
        }
        else {
            console.log("ERROR: UNSUPPORTED TYPE ON LINE " + (line + 1)); //TODO: Implement better error handling
            console.log("> " + code[line])
            break;
        }
        variable.name = /\s[a-zA-Z]+/.exec(code[line])[0].substr(1)
        for (let i in vars) {
            if (vars[i]["name"] == variable.name) {
                if (vars[i]["type"] == variable.type) {
                    console.log("error, variable already defined on line:" + (line + 1))
                    while (true);
                }
                else {
                    console.log("ERROR: VARIABLE ALREADY ASIGNED TO ANOTHER TYPE: Tried to assign " + variable.type + "to " + vars[i]["type"])
                }
            }
        }
        if (variable.type == "number") {
            if (/\d+(\.\d+)*$/.exec(code[line])) {
                variable.value = parseFloat(/\d+(\.\d+)*$/.exec(code[line]))
            }
            else variable.value = 0;
        }
        else if (variable.type == "string") {
            if (/".*"$/.exec(code[line])) {
                variable.value = /".*"$/.exec(code[line])[0].substr(1, /".*"$/.exec(code[line])[0].length - 2);
            }
            else variable.value = 0;
        }
        vars.push(variable)
        continue;
    }
    else if (/.+(\(.*\))/.exec(code[line])) { //Function call
        let functionName = /[^\(]*/.exec(code[line])[0];
        for (i in coreFunctions) {
            if (coreFunctions[i]["name"] == functionName) {
                if (coreFunctions[i]["func"] == "print") {
                    for (j in vars) {
                        if (/\([^\)]*/.exec(code[line])[0].substr(1) == vars[j].name) {
                            console.log(vars[j].value)
                            break;
                        }
                    }
                    if (/".*"/.exec(code[line])) {
                        console.log(/".*"/.exec(code[line])[0].substr(1, /".*"/.exec(code[line])[0].length - 2).yellow)
                    }
                    else if (/\(-*\d+(\.\d+)*\)/.exec(code[line])) {
                        console.log(/\(-*\d+(\.\d+)*\)/.exec(code[line])[0].substr(1, /\(-*\d+(\.\d+)*\)/.exec(code[line])[0].length - 2))
                    }
                    break;
                }
                if (coreFunctions[i]["func"] == "jump") {
                    if (/\(\d+\)/.exec(code[line])) {
                        //console.log(/\(\d+(\.\d+)*\)/.exec(code[line])[0].substr(1,/\(\d+(\.\d+)*\)/.exec(code[line])[0].length - 2))
                        line = parseInt(/\(\d+\)/.exec(code[line])[0].substr(1, /\(\d+\)/.exec(code[line])[0].length - 2)) - 2
                        continue;
                    }
                    else if (/,[^\)]*/.exec(code[line])) {
                        let condition = /,[^\)]*/.exec(code[line])[0].substr(1)

                        let a = /^([a-zA-Z]+|\d+(\.\d+)*)/.exec(condition)[0];
                        let b = /([a-zA-Z]+|\d+(\.\d+)*)$/.exec(condition)[0];
                        if (parseFloat(a).toString() == "NaN") {
                            for (let i in vars) {
                                if (vars[i]["name"] == a) {
                                    a = vars[i]["value"]
                                }
                            }
                        }
                        if (parseFloat(b).toString() == "NaN") {
                            for (let i in vars) {
                                if (vars[i]["name"] == b) {
                                    b = vars[i]["value"]
                                }
                            }
                        }
                        if (/==/.exec(condition)) { //Equality


                            if (parseFloat(a) === parseFloat(b)) {
                                line = parseInt(/\(\d+/.exec(code[line])[0].substr(1)) - 2
                                continue;
                            }
                        }
                    }
                }
            }
            continue;
        }
    }
}

let end = process.hrtime(start);

console.log(`\n\n[Execution completed in ${end[1] / 1000000} ms]`.green)