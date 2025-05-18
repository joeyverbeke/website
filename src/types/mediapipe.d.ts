declare module '@mediapipe/tasks-vision' {
  export class FaceLandmarker {
    static createFromOptions(filesetResolver: FilesetResolver, options: {
      baseOptions: {
        modelAssetPath: string;
        delegate: string;
      };
      outputFaceBlendshapes: boolean;
      outputFacialTransformationMatrixes: boolean;
      numFaces: number;
    }): Promise<FaceLandmarker>;

    constructor(config: {
      baseOptions: {
        modelAssetPath: string;
        delegate: string;
      };
      outputFaceBlendshapes: boolean;
      outputFacialTransformationMatrixes: boolean;
      numFaces: number;
    });
    setOptions(options: {
      baseOptions: {
        modelAssetPath: string;
        delegate: string;
      };
      outputFaceBlendshapes: boolean;
      outputFacialTransformationMatrixes: boolean;
      numFaces: number;
    }): void;
    detect(image: HTMLVideoElement): Promise<{
      faceBlendshapes: Array<{
        categories: Array<{
          score: number;
          categoryName: string;
        }>;
      }>;
    }>;
    close(): void;
  }

  export class FilesetResolver {
    static forVisionTasks(path: string): Promise<FilesetResolver>;
  }
} 