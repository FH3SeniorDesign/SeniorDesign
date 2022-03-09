import ImageEditor from '@react-native-community/image-editor';
import {ImageDistortionResult} from 'models/ImageDistortionResult';
import {RegionalImageDistortionResult} from 'models/RegionalImageDistortionResult';
import {NativeModules} from 'react-native';

const ImageProcessorPlugin: ImageProcessorPluginInterace =
  NativeModules.ImageProcessorPlugin;

interface ImageProcessorPluginInterace {
  makePrediction(path: string): Promise<object>;
}

export class ImageProcessor {
  static async evaluateGlobal(path: string): Promise<ImageDistortionResult> {
    const resultObject: object = await ImageProcessorPlugin.makePrediction(
      path,
    );

    return ImageDistortionResult.from(resultObject);
  }

  static async evaluateRegions(
    path: string,
    imageWidth: number,
    imageHeight: number,
    rows: number = 3,
    columns: number = 3,
  ): Promise<RegionalImageDistortionResult> {
    const croppedImagePaths: string[][] = await ImageProcessor.cropRegions(
      path,
      imageWidth,
      imageHeight,
      rows,
      columns,
    );
    const predictionPromises: Promise<ImageDistortionResult>[][] =
      croppedImagePaths.map((row: string[]) => {
        return row.map((croppedImagePath: string) => {
          return ImageProcessor.evaluateGlobal(croppedImagePath);
        });
      });
    const imageDistortionResults: ImageDistortionResult[][] = await Promise.all(
      predictionPromises.map((row: Promise<ImageDistortionResult>[]) => {
        return Promise.all(row);
      }),
    );

    return new RegionalImageDistortionResult(imageDistortionResults);
  }

  private static async cropRegions(
    path: string,
    imageWidth: number,
    imageHeight: number,
    rows: number,
    columns: number,
  ): Promise<string[][]> {
    const croppedWidth: number = imageWidth / columns;
    const croppedHeight: number = imageHeight / rows;
    const cropImagePromises: Promise<string>[][] = Array(rows)
      .fill(null)
      .map(() => Array(columns));

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const cropData = {
          offset: {x: j * croppedWidth, y: i * croppedHeight},
          size: {width: croppedWidth, height: croppedHeight},
        };
        cropImagePromises[i][j] = ImageEditor.cropImage(path, cropData);
      }
    }

    return Promise.all(
      cropImagePromises.map((row: Promise<string>[]) => {
        return Promise.all(row);
      }),
    );
  }
}
