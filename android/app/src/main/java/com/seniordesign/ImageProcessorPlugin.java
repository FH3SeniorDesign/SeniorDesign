package com.seniordesign; // replace com.your-app-name with your app’s name

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

import android.content.Context;
import android.content.ContentResolver;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.ImageFormat;
import android.graphics.Rect;
import android.graphics.YuvImage;
import android.media.Image;
import android.util.Log;
import android.net.Uri;
import android.provider.MediaStore;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.camera.core.ImageProxy;
import androidx.camera.core.internal.YuvToJpegProcessor;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;

import org.tensorflow.lite.DataType;
import org.tensorflow.lite.InterpreterApi;
import org.tensorflow.lite.InterpreterFactory;
import org.tensorflow.lite.Tensor;
import org.tensorflow.lite.support.common.FileUtil;
import org.tensorflow.lite.support.common.ops.NormalizeOp;
import org.tensorflow.lite.support.image.ImageProcessor;
import org.tensorflow.lite.support.image.TensorImage;
import org.tensorflow.lite.support.image.ops.ResizeOp;
import org.tensorflow.lite.support.tensorbuffer.TensorBuffer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.MappedByteBuffer;
import java.util.HashMap;
import java.util.Map;

import android.util.Log;

public class ImageProcessorPlugin extends ReactContextBaseJavaModule {
    private Context context;

    ImageProcessorPlugin(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    // add to CalendarModule.java
    @Override
    public String getName() {
        return "ImageProcessorPlugin";
    }

    @ReactMethod
    public void makePrediction(String path, Callback callback) {
        Uri uri = Uri.parse(path);
        Log.d("ImageProcessorPlugin", path);

        // Bitmap bitmap = BitmapFactory.decodeFile(path);
        Bitmap bitmap = null;
        try {
            bitmap = MediaStore.Images.Media.getBitmap(context.getContentResolver(), uri);
        }
        catch (Exception e) {
            Log.d("ImageProcessorPlugin", "oops");
        }

        InterpreterApi tflite = null;

        try {
            MappedByteBuffer tfliteModel = FileUtil.loadMappedFile(context, "ml/mliqa_tflite_mobilenet.tflite");
            tflite = new InterpreterFactory().create(tfliteModel, new InterpreterApi.Options());
        } catch (IOException e) {
            Log.e("tflite", "Error reading model", e);
        }

        ImageProcessor imageProcessor = new ImageProcessor.Builder()
                .add(new ResizeOp(448, 448, ResizeOp.ResizeMethod.BILINEAR))
                .add(new NormalizeOp(0.0f, 255.0f))
                .build();

        TensorImage tensorImage = new TensorImage(DataType.FLOAT32);

        tensorImage.load(bitmap);

        tensorImage = imageProcessor.process(tensorImage);

        Map<Integer, Object> indicesToOutputsMap = new HashMap<>();
        float[][] outBuf0 = new float[1][7];
        float[][] outBuf1 = new float[1][1];

        indicesToOutputsMap.put(0, outBuf0);
        indicesToOutputsMap.put(1, outBuf1);

        if (tflite != null) {
            Log.d("tflite", "model loaded successfully");
            tflite.runForMultipleInputsOutputs(new Object[] { tensorImage.getBuffer() }, indicesToOutputsMap);
        }

        String distortionLabels[] = {"blurry", "shaky", "bright", "dark", "grainy", "none", "other"};

        // convert to JSON
        HashMap<String, Float> res = new HashMap<>();
        for (float i : outBuf1[0]) {
            res.put("global_quality", i);
        }
        for (int i = 0; i < outBuf0[0].length; i++) {
            res.put(distortionLabels[i], outBuf0[0][i]);
        }
        WritableNativeMap map = new WritableNativeMap();
        for (Map.Entry<String, Float> entry : res.entrySet()) {
            map.putString(entry.getKey(), entry.getValue().toString());
        }
        callback.invoke(map);
    }
}