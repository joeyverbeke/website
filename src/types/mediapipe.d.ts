// MediaPipe types are now handled dynamically to avoid build-time dependency issues
// The actual MediaPipe library is loaded client-side only

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