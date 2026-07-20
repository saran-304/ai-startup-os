"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = exports.updateMemorySearchIndex = exports.updateStartupHealth = exports.stripeWebhook = exports.healthCheck = exports.cleanupOldData = exports.sendWelcomeEmail = exports.aggregateMemoryStats = exports.onUserDeleted = exports.onUserCreated = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
admin.initializeApp();
exports.onUserCreated = functions.auth.user().onCreate(async (user) => {
    const db = admin.firestore();
    await db.collection('users').doc(user.uid).set({
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        role: 'founder',
        isPremium: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    await db.collection('startups').doc(user.uid).set({
        userId: user.uid,
        name: '',
        description: '',
        stage: 'idea',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`User document created for ${user.uid}`);
});
exports.onUserDeleted = functions.auth.user().onDelete(async (user) => {
    const db = admin.firestore();
    await db.collection('users').doc(user.uid).delete();
    await db.collection('startups').doc(user.uid).delete();
    const memoriesSnapshot = await db
        .collection('ghost_memories')
        .where('userId', '==', user.uid)
        .get();
    const batch = db.batch();
    memoriesSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();
    console.log(`User data deleted for ${user.uid}`);
});
exports.aggregateMemoryStats = functions.firestore
    .document('ghost_memories/{memoryId}')
    .onWrite(async (change, context) => {
    const db = admin.firestore();
    const memory = change.after.exists ? change.after.data() : null;
    if (!memory)
        return null;
    const userId = memory.userId;
    const memoriesSnapshot = await db
        .collection('ghost_memories')
        .where('userId', '==', userId)
        .get();
    const memories = memoriesSnapshot.docs.map((doc) => doc.data());
    const typeCounts = {};
    memories.forEach((m) => {
        typeCounts[m.type] = (typeCounts[m.type] || 0) + 1;
    });
    await db.collection('users').doc(userId).update({
        memoryCount: memories.length,
        memoryTypes: typeCounts,
        lastMemoryAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return null;
});
exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
    console.log(`Welcome email would be sent to ${user.email}`);
    return null;
});
exports.cleanupOldData = functions.pubsub
    .schedule('0 0 * * *')
    .timeZone('UTC')
    .onRun(async (context) => {
    const db = admin.firestore();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    console.log('Cleanup task completed');
    return null;
});
exports.healthCheck = functions.https.onRequest(async (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
    });
});
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    console.log('Stripe webhook received');
    res.status(200).json({ received: true });
});
exports.updateStartupHealth = functions.firestore
    .document('startups/{startupId}')
    .onWrite(async (change, context) => {
    const db = admin.firestore();
    const startup = change.after.exists ? change.after.data() : null;
    if (!startup)
        return null;
    let healthScore = 50;
    if (startup.ideaValidated)
        healthScore += 10;
    if (startup.canvasCompleted)
        healthScore += 10;
    if (startup.roadmapGenerated)
        healthScore += 10;
    if (startup.teamSize > 1)
        healthScore += 10;
    if (startup.fundingRaised > 0)
        healthScore += 10;
    await change.after.ref.update({
        healthScore: Math.min(healthScore, 100),
        healthScoreUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return null;
});
exports.updateMemorySearchIndex = functions.firestore
    .document('ghost_memories/{memoryId}')
    .onWrite(async (change, context) => {
    const db = admin.firestore();
    const memory = change.after.exists ? change.after.data() : null;
    if (!memory)
        return null;
    const keywords = [
        ...memory.content.toLowerCase().split(' '),
        ...memory.tags.map((t) => t.toLowerCase()),
        memory.type.toLowerCase(),
    ].filter((k, i, a) => a.indexOf(k) === i);
    await change.after.ref.update({
        searchKeywords: keywords,
    });
    return null;
});
exports.sendNotification = functions.firestore
    .document('notifications/{notificationId}')
    .onCreate(async (snap, context) => {
    const notification = snap.data();
    console.log(`Notification sent to user: ${notification.userId}`);
    return null;
});
//# sourceMappingURL=index.js.map