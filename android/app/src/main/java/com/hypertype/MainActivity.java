package com.hypertype;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Hypertype";
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
      WritableMap params;
      // params.put something
      // filter only Backspace events if you wish etc.
      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                              .emit("onKeyPressed", params);
    }
}
