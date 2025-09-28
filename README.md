## Description

This script bypasses iOS freeRASP security framework by intercepting the main initialization method `talsecStart:withResolver:withRejecter:` and replacing it with an empty function.

## Usage

```bash
frida -U -f <bundle_identifier> -l freerasp-bypass-ios.js
```
```bash
frida --codeshare 0tax00/ios-freerasp-bypass -f YOUR_BINARY
```

## How to Discover Security Frameworks

### 1. Connect to the app
```bash
frida -U -f com.example.app
```

### 2. List security-related classes
```javascript
Object.keys(ObjC.classes).filter(name => 
    name.toLowerCase().includes('freerasp') || 
    name.toLowerCase().includes('talsec') ||
    name.toLowerCase().includes('security')
)
```

### 3. Analyze class methods
```javascript
const cls = ObjC.classes.FreeraspReactNative;
console.log("Methods:", cls.$ownMethods);
```

### 4. Test method existence
```javascript
const method = cls['- talsecStart:withResolver:withRejecter:'];
console.log("Method exists:", !!method);
```

## Header File Analysis

When analyzing IPA files, look for:
- `FreeraspReactNative.h` - Main class header
- Method signatures like `- (void)talsecStart:(id)start withResolver:(id)resolver withRejecter:(id)rejecter;`

## Script Structure

```javascript
console.log("[+] freerasp-bypass-ios");
if (ObjC.available) {
    const cls = ObjC.classes.FreeraspReactNative;
    const method = cls['- talsecStart:withResolver:withRejecter:'];
    if (method) {
        method.implementation = new NativeCallback(() => {}, 'void', []);
    }
}
```

## Disclaimer

This tool is for educational and authorized penetration testing purposes only. Use responsibly and only on applications you own or have explicit permission to test.
