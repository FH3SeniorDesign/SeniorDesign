package com.seniordesign;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.graphics.Bitmap;
import android.util.Log;
import android.net.Uri;
import android.provider.MediaStore;

import com.facebook.react.bridge.Callback;

public class ImageProcessorPlugin extends ReactContextBaseJavaModule {
    private ImageDistortionModel model;

    ImageProcessorPlugin(ReactApplicationContext context) {
        super(context);
        this.model = new ImageDistortionModel(context);
    }

    // add to CalendarModule.java
    @Override
    public String getName() {
        return "ImageProcessorPlugin";
    }

    @ReactMethod
    public void makePrediction(String path, Callback callback) {
        Uri uri = Uri.parse(path);
        Log.d("imageprocessor", "Loading image from path: " + path);

        Bitmap bitmap = null;
        try {
            bitmap = MediaStore.Images.Media.getBitmap(getReactApplicationContext().getContentResolver(), uri);
        } catch (Exception e) {
            Log.d("imageprocessor", "Unable to load bitmap");
        }

        ImageDistortionResult result = model.evaluate(bitmap);
        callback.invoke(result.toJson());
    }
}