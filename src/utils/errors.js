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

  // Auth: تغيير كلمة المرور
  "auth/requires-recent-login":
    "لأسباب أمنية، سجّل دخولك تاني وبعدها غيّر كلمة المرور.",
  "auth/wrong-password": "كلمة المرور الحالية غلط.",
  "auth/user-mismatch": "البيانات دي مش بتاعة الحساب المسجّل حاليًا.",
  "auth/user-token-expired": "الجلسة انتهت، سجّل دخولك تاني.",
  "auth/user-disabled": "الحساب ده متوقّف.",
  "auth/user-not-found": "الحساب ده مش موجود.",
  "auth/missing-password": "اكتب كلمة المرور.",
};

export const getErrorMsg = (error) => {
  return errorMessages[error.code] || "حصل خطأ غير متوقع حاول مرة أخرى";
};
