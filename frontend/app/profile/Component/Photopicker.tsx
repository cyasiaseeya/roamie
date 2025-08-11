// component/photopicker.ts
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

export type PhotoAsset = {
  uri: string;
  width?: number;
  height?: number;
  fileName?: string;
  type?: string; // mime
};

export type CompressOptions = {
  maxWidth?: number;   // 기본 1080
  maxHeight?: number;  // 기본 1080
  quality?: number;    // 0~1, 기본 0.8
  format?: ImageManipulator.SaveFormat; // 기본 JPEG (Android는 WEBP도 가능)
};

/** ImagePicker.Asset -> PhotoAsset */
function toPhotoAsset(
  asset: ImagePicker.ImagePickerAsset | undefined
): PhotoAsset | null {
  if (!asset || !asset.uri) return null;
  return {
    uri: asset.uri!,
    width: asset.width ?? undefined,
    height: asset.height ?? undefined,
    fileName: asset.fileName ?? undefined,
    type: asset.type ?? undefined,
  };
}

/** 원본 PhotoAsset을 주면 압축/리사이즈된 PhotoAsset 반환 */
export async function compressPhoto(
  src: PhotoAsset,
  opts: CompressOptions = {}
): Promise<PhotoAsset> {
  const {
    maxWidth = 1080,
    maxHeight = 1080,
    quality = 0.8,
    format = ImageManipulator.SaveFormat.JPEG,
  } = opts;

  // 리사이즈 타겟 계산 (비율 유지)
  const w = src.width ?? maxWidth;
  const h = src.height ?? maxHeight;

  let targetW = w;
  let targetH = h;

  const overW = w > maxWidth;
  const overH = h > maxHeight;

  if (overW || overH) {
    const ratio = Math.min(maxWidth / w, maxHeight / h);
    targetW = Math.round(w * ratio);
    targetH = Math.round(h * ratio);
  }

  const result = await ImageManipulator.manipulateAsync(
    src.uri,
    [{ resize: { width: targetW, height: targetH } }],
    {
      compress: quality, // 0~1
      format,            // JPEG 권장(플랫폼 호환성 좋음)
    }
  );

  // mime/type 갱신
  const outType =
    format === ImageManipulator.SaveFormat.PNG
      ? "image/png"
      : format === ImageManipulator.SaveFormat.WEBP
      ? "image/webp"
      : "image/jpeg";

  return {
    uri: result.uri,
    width: result.width,
    height: result.height,
    fileName: src.fileName ?? undefined,
    type: outType,
  };
}

/** 갤러리에서 사진 선택 + 압축 */
export async function pickFromLibrary(
  compressOpts?: CompressOptions
): Promise<PhotoAsset | null> {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) {
    console.warn("앨범 접근 권한이 거부되었습니다.");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1, // 원본 최대 품질로 받아서, 아래에서 우리가 제어
    selectionLimit: 1,
  });

  if (result.canceled) return null;
  const raw = toPhotoAsset(result.assets?.[0]);
  if (!raw) return null;

  return await compressPhoto(raw, compressOpts);
}

/** 카메라로 사진 촬영 + 압축 */
export async function takePhoto(
  compressOpts?: CompressOptions
): Promise<PhotoAsset | null> {
  const perm = await ImagePicker.requestCameraPermissionsAsync();
  if (!perm.granted) {
    console.warn("카메라 접근 권한이 거부되었습니다.");
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 1, // 원본 최대 품질로 받아서, 아래에서 우리가 제어
  });

  if (result.canceled) return null;
  const raw = toPhotoAsset(result.assets?.[0]);
  if (!raw) return null;

  return await compressPhoto(raw, compressOpts);
}
