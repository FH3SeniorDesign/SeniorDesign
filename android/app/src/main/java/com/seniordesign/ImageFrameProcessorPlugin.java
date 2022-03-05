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
    private ImageDistortionModel model;

    ImageFrameProcessorPlugin(Context context) {
        super("scanImage");
        this.model = new ImageDistortionModel(context);
    }

    @Nullable
    @androidx.camera.core.ExperimentalGetImage
    @Override
    public Object callback(@NonNull ImageProxy image, @NonNull Object[] params) {
        if (image.getImage() == null) {
            Log.e("frameprocessor", "Image is null, returning empty result");
            return ImageDistortionResult.empty().toJson();
        }
        ImageDistortionResult result = model.evaluate(ImageHelper.toBitmap(image.getImage()));
        return result.toJson();
    }
}
