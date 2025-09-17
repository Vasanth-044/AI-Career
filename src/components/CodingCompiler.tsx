import React, { useState, useEffect } from 'react';
import { FaPlay, FaStop, FaCopy, FaDownload, FaCode, FaTerminal, FaCheck, FaTimes } from 'react-icons/fa';

interface CompilerProps {
  language: string;
  initialCode?: string;
  onClose: () => void;
}

interface ExecutionResult {
  output: string;
  error: string;
  executionTime: number;
}

const languageTemplates: { [key: string]: string } = {
  'JavaScript': `// Welcome to JavaScript Compiler
console.log("Hello, World!");

// Try some basic operations
let name = "Developer";
let age = 25;
console.log(\`Hello, \${name}! You are \${age} years old.\`);

// Simple function example
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("World"));`,
  'Python': `# Welcome to Python Compiler
print("Hello, World!")

# Try some basic operations
name = "Developer"
age = 25
print(f"Hello, {name}! You are {age} years old.")

# Simple function example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
  'Java': `// Welcome to Java Compiler
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Try some basic operations
        String name = "Developer";
        int age = 25;
        System.out.println("Hello, " + name + "! You are " + age + " years old.");
        
        // Simple method example
        System.out.println(greet("World"));
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}`,
  'C++': `// Welcome to C++ Compiler
#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    
    // Try some basic operations
    string name = "Developer";
    int age = 25;
    cout << "Hello, " << name << "! You are " << age << " years old." << endl;
    
    // Simple function example
    cout << greet("World") << endl;
    
    return 0;
}

string greet(string name) {
    return "Hello, " + name + "!";
}`,
  'C#': `// Welcome to C# Compiler
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
        
        // Try some basic operations
        string name = "Developer";
        int age = 25;
        Console.WriteLine($"Hello, {name}! You are {age} years old.");
        
        // Simple method example
        Console.WriteLine(Greet("World"));
    }
    
    static string Greet(string name) {
        return $"Hello, {name}!";
    }
}`,
  'Go': `// Welcome to Go Compiler
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    
    // Try some basic operations
    name := "Developer"
    age := 25
    fmt.Printf("Hello, %s! You are %d years old.\\n", name, age)
    
    // Simple function example
    fmt.Println(greet("World"))
}

func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}`,
  'Rust': `// Welcome to Rust Compiler
fn main() {
    println!("Hello, World!");
    
    // Try some basic operations
    let name = "Developer";
    let age = 25;
    println!("Hello, {}! You are {} years old.", name, age);
    
    // Simple function example
    println!("{}", greet("World"));
}

fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}`,
  'PHP': `<?php
// Welcome to PHP Compiler
echo "Hello, World!\\n";

// Try some basic operations
$name = "Developer";
$age = 25;
echo "Hello, $name! You are $age years old.\\n";

// Simple function example
echo greet("World") . "\\n";

function greet($name) {
    return "Hello, $name!";
}
?>`,
  'Ruby': `# Welcome to Ruby Compiler
puts "Hello, World!"

# Try some basic operations
name = "Developer"
age = 25
puts "Hello, #{name}! You are #{age} years old."

# Simple method example
puts greet("World")

def greet(name)
    "Hello, #{name}!"
end`,
  'Swift': `// Welcome to Swift Compiler
import Foundation

print("Hello, World!")

// Try some basic operations
let name = "Developer"
let age = 25
print("Hello, \\(name)! You are \\(age) years old.")

// Simple function example
print(greet("World"))

func greet(_ name: String) -> String {
    return "Hello, \\(name)!"
}`,
  'Kotlin': `// Welcome to Kotlin Compiler
fun main() {
    println("Hello, World!")
    
    // Try some basic operations
    val name = "Developer"
    val age = 25
    println("Hello, $name! You are $age years old.")
    
    // Simple function example
    println(greet("World"))
}

fun greet(name: String): String {
    return "Hello, $name!"
}`
};

function CodingCompiler({ language, initialCode, onClose }: CompilerProps) {
  const [code, setCode] = useState(initialCode || languageTemplates[language] || languageTemplates['JavaScript']);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const supportedLanguages = [
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 
    'PHP', 'Ruby', 'Swift', 'Kotlin'
  ];

  useEffect(() => {
    if (language !== selectedLanguage) {
      setCode(languageTemplates[language] || languageTemplates['JavaScript']);
      setSelectedLanguage(language);
    }
  }, [language, selectedLanguage]);

  const executeCode = async () => {
    setIsRunning(true);
    setError('');
    setOutput('');
    
    const startTime = Date.now();

    try {
      // Simulate code execution with different behaviors based on language
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const endTime = Date.now();
      setExecutionTime(endTime - startTime);

      // Simulate different outputs based on language and code content
      let simulatedOutput = '';
      
      if (code.includes('console.log') || code.includes('print') || code.includes('println')) {
        // Extract print statements and simulate their output
        const lines = code.split('\n');
        lines.forEach(line => {
          if (line.includes('console.log') || line.includes('print') || line.includes('println')) {
            // Simple regex to extract string literals
            const match = line.match(/(?:console\.log|print|println)\s*\(\s*["'`](.*?)["'`]\s*\)/);
            if (match) {
              simulatedOutput += match[1] + '\n';
            }
          }
        });
      }

      // Add some simulated output if none found
      if (!simulatedOutput) {
        simulatedOutput = `Code executed successfully in ${selectedLanguage}!\nExecution completed without errors.`;
      }

      setOutput(simulatedOutput);
    } catch (err) {
      setError('Execution failed: ' + (err as Error).message);
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = () => {
    const extension = getFileExtension(selectedLanguage);
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileExtension = (lang: string): string => {
    const extensions: { [key: string]: string } = {
      'JavaScript': 'js',
      'Python': 'py',
      'Java': 'java',
      'C++': 'cpp',
      'C#': 'cs',
      'Go': 'go',
      'Rust': 'rs',
      'PHP': 'php',
      'Ruby': 'rb',
      'Swift': 'swift',
      'Kotlin': 'kt'
    };
    return extensions[lang] || 'txt';
  };

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    setCode(languageTemplates[newLanguage] || '');
    setOutput('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FaCode className="text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Code Compiler</h2>
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              {supportedLanguages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Code Editor</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50"
                >
                  <FaCopy className="text-xs" />
                  Copy
                </button>
                <button
                  onClick={downloadCode}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50"
                >
                  <FaDownload className="text-xs" />
                  Download
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 p-4 font-mono text-sm border-0 resize-none focus:outline-none"
              placeholder="Write your code here..."
              spellCheck={false}
            />
          </div>

          {/* Output Panel */}
          <div className="w-1/2 flex flex-col border-l border-gray-200">
            <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <FaTerminal className="text-gray-600" />
                Output
              </h3>
              <button
                onClick={executeCode}
                disabled={isRunning}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isRunning
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isRunning ? (
                  <>
                    <FaStop className="text-xs" />
                    Running...
                  </>
                ) : (
                  <>
                    <FaPlay className="text-xs" />
                    Run Code
                  </>
                )}
              </button>
            </div>
            
            <div className="flex-1 p-4">
              {isRunning && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Executing code...</p>
                  </div>
                </div>
              )}
              
              {!isRunning && output && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-green-600 mb-2">
                    <FaCheck className="text-xs" />
                    Execution completed in {executionTime}ms
                  </div>
                  <pre className="bg-gray-50 p-3 rounded text-sm text-gray-800 whitespace-pre-wrap overflow-auto max-h-96">
                    {output}
                  </pre>
                </div>
              )}
              
              {!isRunning && error && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-red-600 mb-2">
                    <FaTimes className="text-xs" />
                    Execution failed
                  </div>
                  <pre className="bg-red-50 p-3 rounded text-sm text-red-800 whitespace-pre-wrap overflow-auto max-h-96">
                    {error}
                  </pre>
                </div>
              )}
              
              {!isRunning && !output && !error && (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <FaPlay className="text-4xl mb-2 mx-auto text-gray-300" />
                    <p>Click "Run Code" to execute your program</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>Language: {selectedLanguage}</span>
              <span>Lines: {code.split('\n').length}</span>
              <span>Characters: {code.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodingCompiler;

