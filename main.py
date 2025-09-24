from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
import numpy as np
import face_recognition
from PIL import Image, ImageEnhance
import io
import uuid
from ultralytics import YOLO

app = FastAPI()

# Model YOLO untuk deteksi wajah
yolo_model = YOLO("yolov8n.pt")  # bisa ganti ke model custom jika ada

# sementara simpan encoding user di memory
user_encodings = {}

# --- Preprocessing (crop wajah dengan YOLO) ---
def preprocess_face_image(uploaded_bytes: bytes) -> Image.Image:
    img = Image.open(io.BytesIO(uploaded_bytes)).convert("RGB")
    img_array = np.array(img)

    results = yolo_model(img_array)[0]
    boxes = results.boxes.xyxy.cpu().numpy()
    if len(boxes) == 0:
        raise ValueError("Wajah tidak terdeteksi oleh YOLO.")

    x1, y1, x2, y2 = boxes[0][:4].astype(int)
    top = max(0, y1)
    right = min(img_array.shape[1], x2)
    bottom = min(img_array.shape[0], y2)
    left = max(0, x1)

    face_crop = img.crop((left, top, right, bottom))
    return face_crop

# --- Augmentasi (rotasi, flip, brightness) ---
def augment_face_images(face_img: Image.Image):
    augmented_list = []
    augmented_list.append(face_img.copy())  # original

    flip = face_img.transpose(Image.FLIP_LEFT_RIGHT)
    augmented_list.append(flip)

    rot_plus = face_img.rotate(15, expand=True)
    augmented_list.append(rot_plus)

    rot_minus = face_img.rotate(-15, expand=True)
    augmented_list.append(rot_minus)

    enhancer = ImageEnhance.Brightness(face_img)
    bright_plus = enhancer.enhance(1.2)
    augmented_list.append(bright_plus)

    bright_minus = enhancer.enhance(0.8)
    augmented_list.append(bright_minus)

    return augmented_list

# --- API Enroll ---
@app.post("/enroll")
async def enroll(user_id: int = Form(...), image: UploadFile = None):
    if not image:
        return JSONResponse({"success": False, "message": "No image uploaded"}, status_code=400)

    img_bytes = await image.read()
    try:
        # 1. Preprocess crop wajah
        face_crop = preprocess_face_image(img_bytes)

        # 2. Augmentasi
        augmented_faces = augment_face_images(face_crop)

        # 3. Ambil encoding dari setiap hasil augmentasi
        encodings = []
        for aug_img in augmented_faces:
            arr = np.array(aug_img)
            face_loc = [(0, arr.shape[1], arr.shape[0], 0)]
            e = face_recognition.face_encodings(arr, face_loc)
            if e:
                encodings.append(e[0])

        if not encodings:
            return {"success": False, "message": "Gagal ekstrak encoding wajah"}

        # 4. Ambil rata-rata encoding untuk representasi user
        avg_encoding = np.mean(encodings, axis=0)
        user_encodings[user_id] = avg_encoding.tolist()

        return {"success": True, "message": "Wajah berhasil di-enroll"}
    except Exception as e:
        return {"success": False, "message": str(e)}

# --- API Verify ---
@app.post("/verify")
async def verify(user_id: int = Form(...), image: UploadFile = None):
    if user_id not in user_encodings:
        return {"success": False, "message": "User belum di-enroll"}

    img_bytes = await image.read()
    try:
        # 1. Preprocess crop wajah
        face_crop = preprocess_face_image(img_bytes)
        arr = np.array(face_crop)

        # 2. Ekstrak encoding dari crop
        face_loc = [(0, arr.shape[1], arr.shape[0], 0)]
        encodings = face_recognition.face_encodings(arr, face_loc)
        if not encodings:
            return {"success": False, "message": "Gagal ekstrak encoding wajah"}

        uploaded_encoding = encodings[0]
        known_encoding = np.array(user_encodings[user_id])

        # 3. Hitung jarak
        distance = face_recognition.face_distance([known_encoding], uploaded_encoding)[0]
        threshold = 0.45
        is_match = distance <= threshold

        return {
            "success": True,
            "is_match": is_match,
            "distance": float(distance),
            "threshold": threshold
        }
    except Exception as e:
        return {"success": False, "message": str(e)}
