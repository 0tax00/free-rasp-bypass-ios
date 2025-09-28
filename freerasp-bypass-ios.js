console.log("[+] freerasp-bypass-ios");
if (ObjC.available) {
    const cls = ObjC.classes.FreeraspReactNative;
    const method = cls['- talsecStart:withResolver:withRejecter:'];
    if (method) { method.implementation = new NativeCallback(() => {}, 'void', []); }
}
