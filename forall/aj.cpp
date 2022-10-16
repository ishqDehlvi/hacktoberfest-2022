#include<iostream>
using namespace std;

// Recursive program to print all subsets of a given string
void subsets(string input, string output){
    if(input.length() == 0){
        cout << output << endl;
        return;
    }

    string output1 = output;
    string output2 = output;
    output2.push_back(input[0]);
    input.erase(0, 1);

    subsets(input, output1);
    subsets(input, output2);

    return;
}

int main() {
    string input;
    cout << "Enter input as a string: ";
    getline(cin, input);

    subsets(input, "");
}