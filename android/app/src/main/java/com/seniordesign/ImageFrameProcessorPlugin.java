package com.seniordesign;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.ImageFormat;
import android.graphics.Rect;
import android.graphics.YuvImage;
import android.media.Image;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.camera.core.ImageProxy;
import androidx.camera.core.internal.YuvToJpegProcessor;

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
import java.nio.ByteBuffer;
import java.nio.MappedByteBuffer;
import java.util.HashMap;
import java.util.Map;

public class ImageFrameProcessorPlugin extends FrameProcessorPlugin {
    private Context context;

    ImageFrameProcessorPlugin(Context context) {
        super("scanImage");
        this.context = context;
    }

    @Nullable
    @androidx.camera.core.ExperimentalGetImage
    @Override
    public Object callback(@NonNull ImageProxy image, @NonNull Object[] params) {
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

        tensorImage.load(toBitmap(image.getImage()));

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
        return map;

//        WritableNativeArray array = new WritableNativeArray();
//        for (double i : outBuf1[0]) {
//            array.pushDouble(i);
//        }
//
//        return array;
    }

    // https://stackoverflow.com/a/58568495
    private Bitmap toBitmap(Image image) {
        Image.Plane[] planes = image.getPlanes();
        ByteBuffer yBuffer = planes[0].getBuffer();
        ByteBuffer uBuffer = planes[1].getBuffer();
        ByteBuffer vBuffer = planes[2].getBuffer();

        int ySize = yBuffer.remaining();
        int uSize = uBuffer.remaining();
        int vSize = vBuffer.remaining();

        byte[] nv21 = new byte[ySize + uSize + vSize];
        // U and V are swapped
        yBuffer.get(nv21, 0, ySize);
        vBuffer.get(nv21, ySize, vSize);
        uBuffer.get(nv21, ySize + vSize, uSize);

        YuvImage yuvImage = new YuvImage(nv21, ImageFormat.NV21, image.getWidth(), image.getHeight(), null);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        yuvImage.compressToJpeg(new Rect(0, 0, yuvImage.getWidth(), yuvImage.getHeight()), 75, out);

        byte[] imageBytes = out.toByteArray();
        return BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.length);
    }
}
