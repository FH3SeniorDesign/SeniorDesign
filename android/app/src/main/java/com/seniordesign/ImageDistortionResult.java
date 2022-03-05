package com.seniordesign;

import com.facebook.react.bridge.WritableNativeMap;

public class ImageDistortionResult {
    private float globalQuality;
    private float blurry;
    private float shaky;
    private float bright;
    private float dark;
    private float grainy;
    private float none;
    private float other;

    public ImageDistortionResult(float globalQuality, float blurry, float shaky, float bright, float dark, float grainy, float none, float other) {
        this.globalQuality = globalQuality;
        this.blurry = blurry;
        this.shaky = shaky;
        this.bright = bright;
        this.dark = dark;
        this.grainy = grainy;
        this.none = none;
        this.other = other;
    }

    public static ImageDistortionResult empty() {
        return new ImageDistortionResult(0, 0, 0, 0, 0, 0, 0, 0);
    }

    public WritableNativeMap toJson() {
        WritableNativeMap map = new WritableNativeMap();
        map.putDouble("globalQuality", globalQuality);
        map.putDouble("blurry", blurry);
        map.putDouble("shaky", shaky);
        map.putDouble("bright", bright);
        map.putDouble("dark", dark);
        map.putDouble("grainy", grainy);
        map.putDouble("none", none);
        map.putDouble("other", other);
        return map;
    }
}
