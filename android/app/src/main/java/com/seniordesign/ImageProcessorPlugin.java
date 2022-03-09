package com.seniordesign;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.graphics.Bitmap;
import android.util.Log;
import android.net.Uri;
import android.provider.MediaStore;

public class ImageProcessorPlugin extends ReactContextBaseJavaModule {
    private ImageDistortionModel model;

    ImageProcessorPlugin(ReactApplicationContext context) {
        super(context);
        this.model = new ImageDistortionModel(context);
    }

    @Override
    public String getName() {
        return "ImageProcessorPlugin";
    }

    @ReactMethod
    public void makePrediction(String path, Promise promise) {
        Uri uri = Uri.parse(path);
        Log.d("imageprocessor", "Loading image from path: " + path);

        Bitmap bitmap = null;
        try {
            bitmap = MediaStore.Images.Media.getBitmap(getReactApplicationContext().getContentResolver(), uri);
        } catch (Exception e) {
            Log.d("imageprocessor", "Unable to load bitmap");
            promise.reject("Load image error", e);
        }

        ImageDistortionResult result = model.evaluate(bitmap);

        promise.resolve(result.toJson());
    }
}