import React, { useState } from 'react';
import { FaCode, FaCheck, FaClock, FaStar, FaPlay } from 'react-icons/fa';

interface DailyTask {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  language: string;
  estimatedTime: string;
  codeTemplate: string;
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  hints: string[];
  solution: string;
}

interface DailyCodingTasksProps {
  language: string;
  phase: string;
  onOpenCompiler: (language: string, task?: DailyTask) => void;
}

const sampleTasks: DailyTask[] = [
  {
    id: '1',
    title: 'Hello World Program',
    description: 'Write a program that prints "Hello, World!" to the console.',
    difficulty: 'Easy',
    language: 'JavaScript',
    estimatedTime: '5 minutes',
    codeTemplate: `// Write your code here
console.log("Hello, World!");`,
    testCases: [
      { input: '', expectedOutput: 'Hello, World!' }
    ],
    hints: [
      'Use console.log() to print to the console',
      'Make sure to include the exact text with proper capitalization'
    ],
    solution: `console.log("Hello, World!");`
  },
  {
    id: '2',
    title: 'Sum of Two Numbers',
    description: 'Create a function that takes two numbers as parameters and returns their sum.',
    difficulty: 'Easy',
    language: 'JavaScript',
    estimatedTime: '10 minutes',
    codeTemplate: `function add(a, b) {
  // Write your code here
}`,
    testCases: [
      { input: 'add(2, 3)', expectedOutput: '5' },
      { input: 'add(-1, 1)', expectedOutput: '0' },
      { input: 'add(0, 0)', expectedOutput: '0' }
    ],
    hints: [
      'Use the + operator to add numbers',
      'Return the result using the return statement'
    ],
    solution: `function add(a, b) {
  return a + b;
}`
  },
  {
    id: '3',
    title: 'Array Sum',
    description: 'Write a function that calculates the sum of all numbers in an array.',
    difficulty: 'Medium',
    language: 'JavaScript',
    estimatedTime: '15 minutes',
    codeTemplate: `function arraySum(arr) {
  // Write your code here
}`,
    testCases: [
      { input: 'arraySum([1, 2, 3, 4])', expectedOutput: '10' },
      { input: 'arraySum([-1, 0, 1])', expectedOutput: '0' },
      { input: 'arraySum([])', expectedOutput: '0' }
    ],
    hints: [
      'Use a loop to iterate through the array',
      'Keep track of the running sum',
      'Handle the empty array case'
    ],
    solution: `function arraySum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}`
  },
  {
    id: '4',
    title: 'Palindrome Checker',
    description: 'Create a function that checks if a string is a palindrome (reads the same forwards and backwards).',
    difficulty: 'Medium',
    language: 'JavaScript',
    estimatedTime: '20 minutes',
    codeTemplate: `function isPalindrome(str) {
  // Write your code here
}`,
    testCases: [
      { input: 'isPalindrome("racecar")', expectedOutput: 'true' },
      { input: 'isPalindrome("hello")', expectedOutput: 'false' },
      { input: 'isPalindrome("A man a plan a canal Panama")', expectedOutput: 'true' }
    ],
    hints: [
      'Convert string to lowercase and remove spaces',
      'Compare characters from both ends',
      'Use two pointers or reverse the string'
    ],
    solution: `function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/\\s/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}`
  },
  {
    id: '5',
    title: 'FizzBuzz',
    description: 'Write a program that prints numbers 1 to 100, but for multiples of 3 print "Fizz", multiples of 5 print "Buzz", and multiples of both print "FizzBuzz".',
    difficulty: 'Hard',
    language: 'JavaScript',
    estimatedTime: '25 minutes',
    codeTemplate: `function fizzBuzz() {
  // Write your code here
}`,
    testCases: [
      { input: 'fizzBuzz()', expectedOutput: '1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, ...' }
    ],
    hints: [
      'Use a for loop from 1 to 100',
      'Check for multiples of 15 first (FizzBuzz)',
      'Then check for multiples of 3 and 5 separately'
    ],
    solution: `function fizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
      console.log('FizzBuzz');
    } else if (i % 3 === 0) {
      console.log('Fizz');
    } else if (i % 5 === 0) {
      console.log('Buzz');
    } else {
      console.log(i);
    }
  }
}`
  }
];

const languageTasks: { [key: string]: DailyTask[] } = {
  'JavaScript': sampleTasks,
  'Python': [
    {
      id: 'py1',
      title: 'Hello World',
      description: 'Write a Python program that prints "Hello, World!"',
      difficulty: 'Easy',
      language: 'Python',
      estimatedTime: '5 minutes',
      codeTemplate: `# Write your code here
print("Hello, World!")`,
      testCases: [{ input: '', expectedOutput: 'Hello, World!' }],
      hints: ['Use print() function'],
      solution: `print("Hello, World!")`
    },
    {
      id: 'py2',
      title: 'List Operations',
      description: 'Create a list of numbers and find the sum and average.',
      difficulty: 'Easy',
      language: 'Python',
      estimatedTime: '10 minutes',
      codeTemplate: `# Create a list of numbers
numbers = [1, 2, 3, 4, 5]

# Find sum and average
# Write your code here`,
      testCases: [
        { input: 'numbers = [1, 2, 3, 4, 5]', expectedOutput: 'Sum: 15, Average: 3.0' }
      ],
      hints: ['Use sum() function for sum', 'Divide sum by length for average'],
      solution: `numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
average = total / len(numbers)
print(f"Sum: {total}, Average: {average}")`
    },
    {
      id: 'py3',
      title: 'Dictionary Manipulation',
      description: 'Create a dictionary and add/update key-value pairs.',
      difficulty: 'Medium',
      language: 'Python',
      estimatedTime: '15 minutes',
      codeTemplate: `# Create a dictionary
student = {"name": "Alice", "age": 20}

# Add grade and update age
# Write your code here`,
      testCases: [
        { input: 'student = {"name": "Alice", "age": 20}', expectedOutput: '{"name": "Alice", "age": 21, "grade": "A"}' }
      ],
      hints: ['Use dict[key] = value to add/update', 'Access existing keys to update'],
      solution: `student = {"name": "Alice", "age": 20}
student["grade"] = "A"
student["age"] = 21
print(student)`
    }
  ],
  'Java': [
    {
      id: 'java1',
      title: 'Hello World',
      description: 'Write a Java program that prints "Hello, World!"',
      difficulty: 'Easy',
      language: 'Java',
      estimatedTime: '10 minutes',
      codeTemplate: `public class HelloWorld {
    public static void main(String[] args) {
        // Write your code here
    }
}`,
      testCases: [{ input: '', expectedOutput: 'Hello, World!' }],
      hints: ['Use System.out.println()'],
      solution: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
    },
    {
      id: 'java2',
      title: 'Array Sum',
      description: 'Create an array of integers and calculate the sum.',
      difficulty: 'Easy',
      language: 'Java',
      estimatedTime: '15 minutes',
      codeTemplate: `public class ArraySum {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        // Calculate sum here
    }
}`,
      testCases: [
        { input: 'int[] numbers = {1, 2, 3, 4, 5}', expectedOutput: 'Sum: 15' }
      ],
      hints: ['Use a for loop to iterate', 'Keep a running sum variable'],
      solution: `public class ArraySum {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("Sum: " + sum);
    }
}`
    },
    {
      id: 'java3',
      title: 'Class and Objects',
      description: 'Create a simple class with methods and instantiate it.',
      difficulty: 'Medium',
      language: 'Java',
      estimatedTime: '20 minutes',
      codeTemplate: `// Create a Person class
class Person {
    private String name;
    private int age;
    
    // Constructor and methods here
}

public class Main {
    public static void main(String[] args) {
        // Create Person object here
    }
}`,
      testCases: [
        { input: 'Person person = new Person("Alice", 25)', expectedOutput: 'Name: Alice, Age: 25' }
      ],
      hints: ['Create constructor with parameters', 'Add getter methods', 'Use this keyword'],
      solution: `class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
}

public class Main {
    public static void main(String[] args) {
        Person person = new Person("Alice", 25);
        System.out.println("Name: " + person.getName() + ", Age: " + person.getAge());
    }
}`
    }
  ],
  'C++': [
    {
      id: 'cpp1',
      title: 'Hello World',
      description: 'Write a C++ program that prints "Hello, World!"',
      difficulty: 'Easy',
      language: 'C++',
      estimatedTime: '10 minutes',
      codeTemplate: `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`,
      testCases: [{ input: '', expectedOutput: 'Hello, World!' }],
      hints: ['Use cout for output', 'Include iostream header'],
      solution: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`
    },
    {
      id: 'cpp2',
      title: 'Vector Operations',
      description: 'Create a vector and perform basic operations.',
      difficulty: 'Easy',
      language: 'C++',
      estimatedTime: '15 minutes',
      codeTemplate: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5};
    // Find sum and print elements
    return 0;
}`,
      testCases: [
        { input: 'vector<int> numbers = {1, 2, 3, 4, 5}', expectedOutput: 'Sum: 15' }
      ],
      hints: ['Use a for loop to iterate', 'Use size() for vector length'],
      solution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < numbers.size(); i++) {
        sum += numbers[i];
    }
    cout << "Sum: " << sum << endl;
    return 0;
}`
    },
    {
      id: 'cpp3',
      title: 'Class Implementation',
      description: 'Create a simple class with constructor and methods.',
      difficulty: 'Medium',
      language: 'C++',
      estimatedTime: '25 minutes',
      codeTemplate: `#include <iostream>
#include <string>
using namespace std;

class Rectangle {
private:
    double width, height;
public:
    // Constructor and methods here
};

int main() {
    // Create Rectangle object here
    return 0;
}`,
      testCases: [
        { input: 'Rectangle rect(5.0, 3.0)', expectedOutput: 'Area: 15' }
      ],
      hints: ['Create constructor with parameters', 'Add getArea() method', 'Use this pointer'],
      solution: `#include <iostream>
#include <string>
using namespace std;

class Rectangle {
private:
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    
    double getArea() {
        return width * height;
    }
};

int main() {
    Rectangle rect(5.0, 3.0);
    cout << "Area: " << rect.getArea() << endl;
    return 0;
}`
    }
  ],
  'C#': [
    {
      id: 'cs1',
      title: 'Hello World',
      description: 'Write a C# program that prints "Hello, World!"',
      difficulty: 'Easy',
      language: 'C#',
      estimatedTime: '10 minutes',
      codeTemplate: `using System;

class Program {
    static void Main() {
        // Write your code here
    }
}`,
      testCases: [{ input: '', expectedOutput: 'Hello, World!' }],
      hints: ['Use Console.WriteLine()'],
      solution: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`
    }
  ],
  'Go': [
    {
      id: 'go1',
      title: 'Hello World',
      description: 'Write a Go program that prints "Hello, World!"',
      difficulty: 'Easy',
      language: 'Go',
      estimatedTime: '10 minutes',
      codeTemplate: `package main

import "fmt"

func main() {
    // Write your code here
}`,
      testCases: [{ input: '', expectedOutput: 'Hello, World!' }],
      hints: ['Use fmt.Println()'],
      solution: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`
    }
  ],
  'Rust': [
    {
      id: 'rust1',
      title: 'Hello World',
      description: 'Write a Rust program that prints "Hello, World!"',
      difficulty: 'Easy',
      language: 'Rust',
      estimatedTime: '10 minutes',
      codeTemplate: `fn main() {
    // Write your code here
}`,
      testCases: [{ input: '', expectedOutput: 'Hello, World!' }],
      hints: ['Use println! macro'],
      solution: `fn main() {
    println!("Hello, World!");
}`
    }
  ],
  'PHP': [
    {
      id: 'php1',
      title: 'Hello World',
      description: 'Write a PHP program that prints "Hello, World!"',
      difficulty: 'Easy',
      language: 'PHP',
      estimatedTime: '5 minutes',
      codeTemplate: `<?php
// Write your code here
?>`,
      testCases: [{ input: '', expectedOutput: 'Hello, World!' }],
      hints: ['Use echo statement'],
      solution: `<?php
echo "Hello, World!";
?>`
    }
  ],
  'Ruby': [
    {
      id: 'ruby1',
      title: 'Hello World',
      description: 'Write a Ruby program that prints "Hello, World!"',
      difficulty: 'Easy',
      language: 'Ruby',
      estimatedTime: '5 minutes',
      codeTemplate: `# Write your code here`,
      testCases: [{ input: '', expectedOutput: 'Hello, World!' }],
      hints: ['Use puts method'],
      solution: `puts "Hello, World!"`
    }
  ],
  'Swift': [
    {
      id: 'swift1',
      title: 'Hello World',
      description: 'Write a Swift program that prints "Hello, World!"',
      difficulty: 'Easy',
      language: 'Swift',
      estimatedTime: '10 minutes',
      codeTemplate: `import Foundation

// Write your code here`,
      testCases: [{ input: '', expectedOutput: 'Hello, World!' }],
      hints: ['Use print() function'],
      solution: `import Foundation

print("Hello, World!")`
    }
  ],
  'Kotlin': [
    {
      id: 'kotlin1',
      title: 'Hello World',
      description: 'Write a Kotlin program that prints "Hello, World!"',
      difficulty: 'Easy',
      language: 'Kotlin',
      estimatedTime: '10 minutes',
      codeTemplate: `fun main() {
    // Write your code here
}`,
      testCases: [{ input: '', expectedOutput: 'Hello, World!' }],
      hints: ['Use println() function'],
      solution: `fun main() {
    println("Hello, World!")
}`
    }
  ]
};

function DailyCodingTasks({ language, phase, onOpenCompiler }: DailyCodingTasksProps) {
  const [selectedTask, setSelectedTask] = useState<DailyTask | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const tasks = languageTasks[language] || languageTasks['JavaScript'];
  const phaseTasks = tasks.filter(task => {
    if (phase === 'Beginner') return task.difficulty === 'Easy';
    if (phase === 'Intermediate') return task.difficulty === 'Medium';
    if (phase === 'Advanced') return task.difficulty === 'Hard';
    return true;
  });

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => new Set([...prev, taskId]));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FaCode className="text-blue-600" />
          Daily Coding Tasks - {language}
        </h3>
        <button
          onClick={() => onOpenCompiler(language)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FaPlay className="text-sm" />
          Open Compiler
        </button>
      </div>

      <div className="grid gap-4">
        {phaseTasks.map((task) => (
          <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                <div className="flex items-center gap-3 text-xs">
                  <span className={`px-2 py-1 rounded-full ${getDifficultyColor(task.difficulty)}`}>
                    {task.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <FaClock className="text-xs" />
                    {task.estimatedTime}
                  </span>
                  {completedTasks.has(task.id) && (
                    <span className="flex items-center gap-1 text-green-600">
                      <FaCheck className="text-xs" />
                      Completed
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => setSelectedTask(task)}
                  className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  View Details
                </button>
                <button
                  onClick={() => onOpenCompiler(language, task)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Start Coding
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{selectedTask.title}</h3>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">{selectedTask.description}</p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Code Template:</h4>
                  <pre className="text-sm text-gray-800 bg-white p-3 rounded border overflow-x-auto">
                    <code>{selectedTask.codeTemplate}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Test Cases:</h4>
                  <div className="space-y-2">
                    {selectedTask.testCases.map((testCase, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded">
                        <div className="text-sm">
                          <span className="font-medium">Input:</span> {testCase.input || 'No input'}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Expected Output:</span> {testCase.expectedOutput}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Hints:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {selectedTask.hints.map((hint, index) => (
                      <li key={index}>{hint}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      onOpenCompiler(language, selectedTask);
                      setSelectedTask(null);
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Start Coding
                  </button>
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyCodingTasks;
