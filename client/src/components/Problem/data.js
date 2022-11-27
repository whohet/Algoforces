export const AVAILABLE_LANGUAGES = [
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
  { value: "python", label: "Python" },
];

export const AVAILABLE_THEMES = [
  { value: "monokai", label: "Monokai" },
  { value: "github", label: "Github" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "kuroir", label: "Kuroir" },
  { value: "twilight", label: "Twilight" },
  { value: "xcode", label: "XCode" },
  { value: "textmate", label: "Textmate" },
  { value: "solarized_dark", label: "Solarized Dark" },
  { value: "solarized_light", label: "Solarized Light" },
  { value: "terminal", label: "Terminal" },
];
export const DEFAULT_PREFERENCE = {
  language: "cpp",
  fontSize: "14",
  theme: AVAILABLE_THEMES[0],
  tabSize: 4,
};

export const CPP_DATA = {
  label: "C++",
  code: `#include <bits/stdc++.h>
using namespace std;

int main() {
  
    return 0;
}
`,
};

export const JAVA_DATA = {
  label: "Java",
  code: `public class Solution {
    public static int main(String[] args) {
      
    }
}
`,
};

export const PYTHON_DATA = {
  label: "Python",
  code: `import math

print("Hello World")
`,
};

export const LANGUAGE_DATA = {
  cpp: CPP_DATA,
  java: JAVA_DATA,
  python: PYTHON_DATA,
};
