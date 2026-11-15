const errorMessages = {
  // Firestore
  "permission-denied": "مش مسموح لك تنفّذ العملية دي.",
  unauthenticated: "لازم تسجّل دخول الأول.",
  unavailable: "الخدمة مش متاحة دلوقتي، حاول تاني بعد شوية.",
  "not-found": "العنصر ده مش موجود (ممكن يكون اتمسح).",
  "resource-exhausted": "تم تجاوز الحد المسموح، حاول تاني لاحقًا.",
  "deadline-exceeded": "العملية أخدت وقت أطول من اللازم، حاول تاني.",

  // Auth
  "auth/invalid-email": "الإيميل مش مكتوب صح.",
  "auth/weak-password": "كلمة المرور ضعيفة، لازم 6 حروف على الأقل.",
  "auth/email-already-in-use": "الإيميل ده مسجّل قبل كده.",
  "auth/invalid-credential": "الإيميل أو كلمة المرور غلط.",
  "auth/too-many-requests": "محاولات كتير، استنى شوية وحاول تاني.",
  "auth/network-request-failed": "فيه مشكلة في الاتصال بالنت.",
};

export const getErrorMsg = (error) => {
  return errorMessages[error.code] || "____";
};
