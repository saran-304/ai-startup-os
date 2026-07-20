import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Trigger when a new user is created
export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  const db = admin.firestore();
  
  // Create user document in Firestore
  await db.collection('users').doc(user.uid).set({
    email: user.email,
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
    role: 'founder',
    isPremium: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Create startup document
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

// Trigger when a user is deleted
export const onUserDeleted = functions.auth.user().onDelete(async (user) => {
  const db = admin.firestore();
  
  // Delete user data
  await db.collection('users').doc(user.uid).delete();
  await db.collection('startups').doc(user.uid).delete();
  
  // Delete all ghost memories
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

// Aggregate memory statistics
export const aggregateMemoryStats = functions.firestore
  .document('ghost_memories/{memoryId}')
  .onWrite(async (change, context) => {
    const db = admin.firestore();
    const memory = change.after.exists ? change.after.data() : null;
    
    if (!memory) return null;

    const userId = memory.userId;
    
    // Get all memories for user
    const memoriesSnapshot = await db
      .collection('ghost_memories')
      .where('userId', '==', userId)
      .get();
    
    const memories = memoriesSnapshot.docs.map((doc) => doc.data());
    
    // Calculate stats
    const typeCounts: Record<string, number> = {};
    memories.forEach((m) => {
      typeCounts[m.type] = (typeCounts[m.type] || 0) + 1;
    });
    
    // Update user stats
    await db.collection('users').doc(userId).update({
      memoryCount: memories.length,
      memoryTypes: typeCounts,
      lastMemoryAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return null;
  });

// Send welcome email
export const sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  // Implement email sending logic
  // This would integrate with SendGrid or similar service
  console.log(`Welcome email would be sent to ${user.email}`);
  return null;
});

// Scheduled function to clean up old data
export const cleanupOldData = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('UTC')
  .onRun(async (context) => {
    const db = admin.firestore();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Delete old temporary data if needed
    console.log('Cleanup task completed');
    return null;
  });

// HTTP function for health check
export const healthCheck = functions.https.onRequest(async (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Stripe webhook handler (for subscription payments)
export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  // Implement Stripe webhook handling
  // This would process subscription events
  console.log('Stripe webhook received');
  res.status(200).json({ received: true });
});

// Update startup health score
export const updateStartupHealth = functions.firestore
  .document('startups/{startupId}')
  .onWrite(async (change, context) => {
    const db = admin.firestore();
    const startup = change.after.exists ? change.after.data() : null;
    
    if (!startup) return null;

    // Calculate health score based on various factors
    let healthScore = 50;
    
    // Add points for completed validations
    if (startup.ideaValidated) healthScore += 10;
    if (startup.canvasCompleted) healthScore += 10;
    if (startup.roadmapGenerated) healthScore += 10;
    if (startup.teamSize > 1) healthScore += 10;
    if (startup.fundingRaised > 0) healthScore += 10;
    
    // Update health score
    await change.after.ref.update({
      healthScore: Math.min(healthScore, 100),
      healthScoreUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return null;
  });

// Memory search index update
export const updateMemorySearchIndex = functions.firestore
  .document('ghost_memories/{memoryId}')
  .onWrite(async (change, context) => {
    const db = admin.firestore();
    const memory = change.after.exists ? change.after.data() : null;
    
    if (!memory) return null;

    // Update search keywords for better search performance
    const keywords = [
      ...memory.content.toLowerCase().split(' '),
      ...memory.tags.map((t: string) => t.toLowerCase()),
      memory.type.toLowerCase(),
    ].filter((k, i, a) => a.indexOf(k) === i); // Remove duplicates

    await change.after.ref.update({
      searchKeywords: keywords,
    });

    return null;
  });

// Notification trigger
export const sendNotification = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async (snap, context) => {
    const notification = snap.data();
    
    // Send push notification or email based on user preferences
    console.log(`Notification sent to user: ${notification.userId}`);
    return null;
  });
