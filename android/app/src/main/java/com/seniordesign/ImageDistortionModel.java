package com.seniordesign;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.ImageFormat;
import android.graphics.Rect;
import android.graphics.YuvImage;
import android.media.Image;
import android.util.Log;

import org.tensorflow.lite.DataType;
import org.tensorflow.lite.InterpreterApi;
import org.tensorflow.lite.InterpreterFactory;
import org.tensorflow.lite.support.common.FileUtil;
import org.tensorflow.lite.support.common.ops.NormalizeOp;
import org.tensorflow.lite.support.image.ImageProcessor;
import org.tensorflow.lite.support.image.TensorImage;
import org.tensorflow.lite.support.image.ops.ResizeOp;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.MappedByteBuffer;
import java.util.HashMap;
import java.util.Map;

public class ImageDistortionModel {
    private InterpreterApi tflite;

    public ImageDistortionModel(Context context) {
        try {
            MappedByteBuffer tfliteModel = FileUtil.loadMappedFile(context, "ml/mliqa_tflite_mobilenet.tflite");
            this.tflite = new InterpreterFactory().create(tfliteModel, new InterpreterApi.Options());
        } catch (IOException e) {
            Log.e("tflite", "Error reading model", e);
        }
    }

    public ImageDistortionResult evaluate(Bitmap image) {
        if (tflite == null) {
            Log.d("tflite", "model was not loaded, image will not be evaluated");
            return ImageDistortionResult.empty();
        }

        ImageProcessor imageProcessor = new ImageProcessor.Builder()
                .add(new ResizeOp(448, 448, ResizeOp.ResizeMethod.BILINEAR))
                .add(new NormalizeOp(0.0f, 255.0f))
                .build();

        TensorImage tensorImage = new TensorImage(DataType.FLOAT32);

        tensorImage.load(image);

        tensorImage = imageProcessor.process(tensorImage);

        Map<Integer, Object> indicesToOutputsMap = new HashMap<>();
        float[][] outBuf0 = new float[1][7];
        float[][] outBuf1 = new float[1][1];
        indicesToOutputsMap.put(0, outBuf0);
        indicesToOutputsMap.put(1, outBuf1);

        tflite.runForMultipleInputsOutputs(new Object[] { tensorImage.getBuffer() }, indicesToOutputsMap);

        return new ImageDistortionResult(outBuf1[0][0], outBuf0[0][0], outBuf0[0][1], outBuf0[0][2], outBuf0[0][3], outBuf0[0][4], outBuf0[0][5], outBuf0[0][6]);
    }
}
