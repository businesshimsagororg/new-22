import { Request, Response, NextFunction } from "express";
import { admin, db, missingEnv } from "../config/firebaseConfig.ts";
import { adminEmails, AuthRequest } from "../middleware/authMiddleware.ts";

export const getHealth = (req: Request, res: Response) => {
  res.json({
    ok: true,
    firebaseAdminConfigured: missingEnv.length === 0,
    adminEmailsConfigured: adminEmails.size > 0
  });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  const email = (req.user.email || "").toLowerCase();
  const isAdminEmail = adminEmails.has(email);

  if (isAdminEmail && req.user.admin !== true) {
    try {
      await admin.auth().setCustomUserClaims(req.user.uid, { admin: true });
      return res.json({
        uid: req.user.uid,
        email: req.user.email,
        name: req.user.name || "",
        picture: req.user.picture || "",
        isAdmin: true,
        shouldRefreshToken: true
      });
    } catch (error) {
      console.error("Error setting custom claim:", error);
    }
  }

  res.json({
    uid: req.user.uid,
    email: req.user.email,
    name: req.user.name || "",
    picture: req.user.picture || "",
    isAdmin: req.user.admin === true || isAdminEmail
  });
};

export const updateMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { displayName, phoneNumber } = req.body;
    const uid = req.user.uid;
    const updatePayload: any = {};
    if (displayName) updatePayload.displayName = displayName;
    if (phoneNumber) updatePayload.phoneNumber = phoneNumber;
    await admin.auth().updateUser(uid, updatePayload);
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    next(error);
  }
};

export const getAdminSummary = (req: AuthRequest, res: Response) => {
  res.json({
    ok: true,
    message: "Admin token verified",
    email: req.user.email
  });
};

export const seedDatabase = async (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "Seed database is not allowed in production" });
  }
  if (!db) return res.status(500).json({ error: "Database not configured" });
  const seedProducts = [
    { name: "খাঁটি মধু (১ কেজি)", price: 850, category: "মধু", inStock: true, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCB6fgntTFKD3D_VHU9fRS2Goumz9I_DxbdgzLTQ29a_AXavgXUYcApVQ46x0HggDAjgSUdryFgQCY3LiDtq0Ag0zdrmc92ey1NyUtsx4CqNSO_Ea2bGQE4X6k91ybPChNmC2TrV9BO9DTK5fmP_FoSVDydXRjXy1aDFJHAZ-2YhhL3BsL7gZq3QW1n_5sLs3f-kk653Fx4Cq2bb9Ohtat03OywQiuVopb3p0uff-GWSxY_ShE9pMm5pLjYLb7D0adTcJm-hHakqvA", createdAt: admin.firestore.FieldValue.serverTimestamp() },
    { name: "সরিষার তেল (১ লিটার)", price: 320, category: "তেল", inStock: true, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAcH_P37UseyTfDouXtNP_oprPpYKLvlkyvO8PG0Nv7VWV9Qf-7f1Y8BmvwDlmFg-0gvtmZ8i4Jg0u66QGZCTnYoWauqQxKvfilSBuBBISgYiRVxub7_N38jqWdBfxEXUscagXxlx0uccfoO7s-yqJtb64ay3r6Iht974zL-qm3rU3IV46uy-tb-2ByV4MTqG084sNqeGMzbIw4WskW_X24o5J2MgXO_QukpEqMskUyEUgVQRm7WicNoaHPwb1wSEevXk-zd_i2UQ", createdAt: admin.firestore.FieldValue.serverTimestamp() },
    { name: "কালোজিরা তেল (১০০ মিলি)", price: 450, category: "তেল", inStock: true, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHWhYB-E3MN2OSd-cNDgxAb4UoxlWeoFlq3rnMPF8KAiUXUbSXmao8-UqQVIkBIp8z3_RuVh4Fldb_e3G1AkWSMkFvY1QJIhUXDdi3Hh4VXUu4OwlNrZbNqzm-_5leMISqlcRbOZkUog_ZiF9HuMActymW9-oXHyKDFuQ_mm4oCOeCsq7SdDUSQL9DbEojP850z1E6EknagaOB68llHZsZodCP_65Pkr8j6f_LtQnWi9j_kAHnHUHqUALQdnE0alWdd47pmLE3wYg", createdAt: admin.firestore.FieldValue.serverTimestamp() }
  ];
  try {
    for (const p of seedProducts) {
      await db.collection("products").add(p);
    }
    res.json({ success: true, message: "Seed data inserted" });
  } catch (error) {
    next(error);
  }
};
