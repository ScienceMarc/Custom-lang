#include <iostream>
#include <string>
#include <fstream>

using namespace std;

int main(){
    string filename;
    getline(cin, filename);
    ifstream file;
    filename += ".mln";
    file.open(filename);

    string line;
    int loc;
    int alloc = -1;
    bool allocb = false;
    int* integers = new int[0];

    if (file.is_open()){
        while (getline(file, line)){
            //Alloc
            for (int i = 0; i <= line.length(); i++) {
                if (line[i] == '/' && line[i+1] == '/') {i=line.length();}
                if (line[i] == 'a' && line[i+1] == 'l' && line[i+2] == 'l' && line[i+3] == 'o' && line[i+4] == 'c' && line[i+5] == ' ') {
                    string temp;
                    for (int lenloc = 6; line[i+lenloc] != ','; lenloc++) {
                        temp += line[i+lenloc];
                    }
                    alloc = stoi(temp);
                    
                }
            }
            if (!allocb) {
                delete integers;
                integers = new int[alloc];
                allocb = true;
            }
            //Int
            for (int i = 0; i <= line.length(); i++) {
                if (line[i] == '/' && line[i+1] == '/') {i=line.length();}
                if (line[i] == 'i' && line[i+1] == 'n' && line[i+2] == 't' && line[i+3] == ' ') {
                    string temp;
                    int lenloc;
                    for (lenloc = 4; line[i+lenloc] != ','; lenloc++) {
                        temp += line[i+lenloc];
                    }
                    loc = stoi(temp);
                    temp = "";
                    if (line[i+lenloc+1] == '$') {
                        for (lenloc++; line[i+lenloc+1] != ','; lenloc++){
                            temp += line[i+lenloc+1];
                        }
                        int tempi = stoi(temp);
                        integers[loc] = integers[tempi];
                    }
                    else {
                        for (lenloc++; line[i+lenloc] != ','; lenloc++){
                            temp += line[i+lenloc];
                        }
                    integers[loc] = stoi(temp);
                    }
                }
            }
            //Add
            for (int i = 0; i <= line.length(); i++) {
                if (line[i] == '/' && line[i+1] == '/') {i=line.length();}
                if (line[i] == 'a' && line[i+1] == 'd' && line[i+2] == 'd' && line[i+3] == ' ') {
                    int a,b;
                    string temp;
                    int lenloc;
                    for (lenloc = 4; line[i+lenloc] != ','; lenloc++) {
                        temp += line[i+lenloc];
                    }
                    loc = stoi(temp);
                    temp = "";
                    if (line[i+lenloc+1] == '$'){
                        for (lenloc+=2; line[i+lenloc] != ','; lenloc++){
                            temp += line[i+lenloc];
                        }
                        a = integers[stoi(temp)];
                    }
                    else {
                        for (lenloc++; line[i+lenloc] != ','; lenloc++){
                            temp += line[i+lenloc];
                        }
                        a = stoi(temp);
                    }
                    temp = "";
                    if (line[i+lenloc+1] == '$') {
                        for (lenloc+=2; line[i+lenloc] != ','; lenloc++){
                            temp += line[i+lenloc];
                        }
                        b = integers[stoi(temp)];
                    }
                    else {
                        for (lenloc++; line[i+lenloc] != ','; lenloc++){
                            temp += line[i+lenloc];
                        }
                        b = stoi(temp);
                    }
                    integers[loc]=a+b;
                }
            }
            //pl
            for (int i = 0; i <= line.length(); i++) {
                if (line[i] == '/' && line[i+1] == '/') {i=line.length();}
                if (line[i] == 'p' && line[i+1] == 'l' && line[i+2] == ' ') {
                    string temp;
                    int lenloc;
                    for (lenloc = 4; line[i+lenloc] != ','; lenloc++) {
                        temp += line[i+lenloc];
                    }
                    cout << integers[stoi(temp)] << endl;
                }
            }
        }
    }
    cin.get();
    return 0;
}