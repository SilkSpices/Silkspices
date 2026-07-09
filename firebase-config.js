// firebase-config.js
// ✅ SILK SPICES - Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { 
    getFirestore, collection, addDoc, getDocs, doc, 
    getDoc, updateDoc, deleteDoc, query, where, orderBy, setDoc,
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { 
    getAuth, signInWithEmailAndPassword, signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// 🔥 YOUR FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyA40F-pJ2-a6kbLxEQJQEymLm-cZwGmZJw",
    authDomain: "silk-spices.firebaseapp.com",
    projectId: "silk-spices",
    storageBucket: "silk-spices.firebasestorage.app",
    messagingSenderId: "625782561518",
    appId: "1:625782561518:web:869489f4c3a33e040371ff",
    measurementId: "G-SKDVL9BR3V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ==========================================
// 🎨 CATEGORY METADATA (for UI display)
// ==========================================
export const CATEGORY_METADATA = {
    powder:  { label: 'Powders',           icon: '🥄', color: '#e67e22' },
    masala:  { label: 'Signature Masalas', icon: '🥘', color: '#c0392b' },
    whole:   { label: 'Whole Spices',      icon: '🌰', color: '#8e44ad' },
    special: { label: 'Special Blends',    icon: '✨', color: '#16a085' }
};

// ==========================================
// 📦 PRODUCTS SEED DATA (28 Products)
// ==========================================
// 💰 EACH product has its own "customPricing" — edit any product/variant freely
// 
// 📝 HOW TO UPDATE PRICES:
//    - To change ONE variant of ONE product → edit that specific number
//    - To add a new variant → add a new line like '2kg': 1899
//    - To remove a variant → delete that line
//    - Weight labels can be anything: '50g', '100g', '250g', '500g', '1kg', '2kg', '5kg' etc.
// ==========================================

export const PRODUCTS_SEED = [
    // ─── POWDERS ──────────────────────────────────────────
    { 
        id: 1, 
        name: "Turmeric Powder", 
        category: "powder", 
        rating: 4.9, 
        reviews: 487, 
        badge: "best", 
        emoji: "🌕",
        shortDesc: "Pure & fresh ground turmeric with high curcumin content",
        description: "Premium quality turmeric powder made from carefully selected turmeric roots. Rich in curcumin, this vibrant yellow spice adds authentic flavor and beautiful color to your dishes. Known for its anti-inflammatory properties.",
        images: { packaged: "images/turmeric-packaged.jpg" },
        customPricing: { '100g': 89, '250g': 219, '500g': 429, '1kg': 849 }
    },
    { 
        id: 2, 
        name: "Tikha Lal Chili Powder", 
        category: "powder", 
        rating: 4.8, 
        reviews: 612, 
        badge: "best", 
        emoji: "🌶️",
        shortDesc: "Hot & vibrant red chili powder for authentic spice",
        description: "Fiery red chili powder made from sun-dried red chilies. Adds intense heat and rich color to your curries.",
        images: { packaged: "images/tikha-lal-packaged.jpg" },
        customPricing: { '100g': 99, '250g': 239, '500g': 469, '1kg': 929 }
    },
    { 
        id: 3, 
        name: "Kashmiri Chili Powder", 
        category: "powder", 
        rating: 4.9, 
        reviews: 589, 
        badge: "best", 
        emoji: "🔴",
        shortDesc: "Mild heat with brilliant red color",
        description: "Authentic Kashmiri chili powder that gives your dishes a beautiful deep red color without excessive heat.",
        images: { packaged: "images/kashmiri-packaged.jpg" },
        customPricing: { '100g': 149, '250g': 359, '500g': 699, '1kg': 1349 }
    },
    { 
        id: 4, 
        name: "Coriander Powder", 
        category: "powder", 
        rating: 4.7, 
        reviews: 334, 
        badge: "organic", 
        emoji: "🌿",
        shortDesc: "Aromatic ground coriander seeds",
        description: "Freshly ground coriander seeds with a warm, nutty, citrusy flavor.",
        images: { packaged: "images/coriander-packaged.jpg" },
        customPricing: { '100g': 79, '250g': 189, '500g': 369, '1kg': 719 }
    },
    { 
        id: 5, 
        name: "Cumin Coriander Powder", 
        category: "powder", 
        rating: 4.8, 
        reviews: 298, 
        badge: "new", 
        emoji: "🟤",
        shortDesc: "Perfect blend of cumin & coriander",
        description: "A traditional Indian blend of freshly ground cumin and coriander seeds.",
        images: { packaged: "images/cumin-coriander-packaged.jpg" },
        customPricing: { '100g': 109, '250g': 259, '500g': 509, '1kg': 999 }
    },

    // ─── SIGNATURE MASALAS ────────────────────────────────
    { 
        id: 6, 
        name: "Rajwadi Garam Masala", 
        category: "masala", 
        rating: 4.9, 
        reviews: 756, 
        badge: "best", 
        emoji: "🥘",
        shortDesc: "Royal blend of aromatic whole spices",
        description: "Our premium Rajwadi Garam Masala is a royal blend of over 15 whole spices.",
        images: { packaged: "images/rajwadi-garam-packaged.jpg" },
        customPricing: { '100g': 149, '250g': 359, '500g': 699, '1kg': 1349 }
    },
    { 
        id: 7, 
        name: "All-in-One Masala", 
        category: "masala", 
        rating: 4.9, 
        reviews: 923, 
        badge: "best", 
        emoji: "🍛",
        shortDesc: "Universal masala for all Indian dishes",
        description: "One masala for all your needs! Works with vegetables, dals, curries, and rice.",
        images: { packaged: "images/all-in-one-packaged.jpg" },
        customPricing: { '100g': 119, '250g': 289, '500g': 569, '1kg': 1099 }
    },
    { 
        id: 8, 
        name: "Sabji Masala", 
        category: "masala", 
        rating: 4.8, 
        reviews: 412, 
        badge: null, 
        emoji: "🍲",
        shortDesc: "Perfect masala for vegetable dishes",
        description: "Specially crafted for vegetable dishes.",
        images: { packaged: "images/sabji-masala-packaged.jpg" },
        customPricing: { '100g': 99, '250g': 247, '500g': 495, '1kg': 990 }
    },
    { 
        id: 9, 
        name: "Sambar Masala", 
        category: "masala", 
        rating: 4.7, 
        reviews: 243, 
        badge: null, 
        emoji: "🍜",
        shortDesc: "Authentic South Indian sambar spice",
        description: "Traditional South Indian sambar masala with roasted dals and aromatic spices.",
        images: { packaged: "images/sambar-masala-packaged.jpg" },
        customPricing: { '100g': 109, '250g': 269, '500g': 529, '1kg': 1049 }
    },
    { 
        id: 10, 
        name: "Kitchen King Masala", 
        category: "masala", 
        rating: 4.8, 
        reviews: 534, 
        badge: "best", 
        emoji: "👑",
        shortDesc: "King of all Indian masalas",
        description: "A regal blend that adds richness to paneer dishes, gravies, and vegetable curries.",
        images: { packaged: "images/kitchen-king-packaged.jpg" },
        customPricing: { '100g': 129, '250g': 319, '500g': 629, '1kg': 1249 }
    },
    { 
        id: 11, 
        name: "Curry Masala", 
        category: "masala", 
        rating: 4.8, 
        reviews: 389, 
        badge: "new", 
        emoji: "🍛",
        shortDesc: "Perfect blend for all curry preparations",
        description: "Restaurant-quality flavor to your homemade curries.",
        images: { packaged: "images/curry-masala-packaged.jpg" },
        customPricing: { '100g': 109, '250g': 269, '500g': 529, '1kg': 1049 }
    },
    { 
        id: 12, 
        name: "Fruit Chat Masala", 
        category: "masala", 
        rating: 4.9, 
        reviews: 678, 
        badge: "best", 
        emoji: "🍎",
        shortDesc: "Tangy & spicy fruit seasoning",
        description: "Perfect blend of tangy, salty, and spicy flavors for fruits and snacks.",
        images: { packaged: "images/fruit-chat-packaged.jpg" },
        customPricing: { '100g': 99, '250g': 247, '500g': 495, '1kg': 990 }
    },
    { 
        id: 13, 
        name: "Pani Puri Masala", 
        category: "masala", 
        rating: 4.9, 
        reviews: 812, 
        badge: "best", 
        emoji: "💧",
        shortDesc: "Authentic street-style pani puri flavor",
        description: "Recreate the magic of street-style pani puri at home!",
        images: { packaged: "images/pani-puri-packaged.jpg" },
        customPricing: { '100g': 119, '250g': 289, '500g': 569, '1kg': 1099 }
    },
    { 
        id: 14, 
        name: "Pickle Masala", 
        category: "masala", 
        rating: 4.7, 
        reviews: 456, 
        badge: null, 
        emoji: "🥭",
        shortDesc: "Traditional achaar masala blend",
        description: "Make delicious homemade pickles with our authentic pickle masala.",
        images: { packaged: "images/pickle-masala-packaged.jpg" },
        customPricing: { '100g': 99, '250g': 247, '500g': 495, '1kg': 990 }
    },
    { 
        id: 15, 
        name: "Shahi Paneer Masala", 
        category: "masala", 
        rating: 4.9, 
        reviews: 721, 
        badge: "best", 
        emoji: "🧀",
        shortDesc: "Royal masala for creamy paneer dishes",
        description: "Create restaurant-style Shahi Paneer at home!",
        images: { packaged: "images/shahi-paneer-packaged.jpg" },
        customPricing: { '100g': 139, '250g': 339, '500g': 659, '1kg': 1299 }
    },
    { 
        id: 16, 
        name: "Tea Masala (Chai Masala)", 
        category: "masala", 
        rating: 4.9, 
        reviews: 1032, 
        badge: "best", 
        emoji: "☕",
        shortDesc: "Aromatic masala for perfect chai",
        description: "Transform your regular tea into aromatic masala chai!",
        images: { packaged: "images/tea-masala-packaged.jpg" },
        customPricing: { '100g': 129, '250g': 319, '500g': 629, '1kg': 1249 }
    },
    { 
        id: 17, 
        name: "Chhole Masala", 
        category: "masala", 
        rating: 4.8, 
        reviews: 645, 
        badge: null, 
        emoji: "🫘",
        shortDesc: "Authentic Punjabi chhole spice mix",
        description: "Restaurant-style chhole at home!",
        images: { packaged: "images/chhole-masala-packaged.jpg" },
        customPricing: { '100g': 109, '250g': 269, '500g': 529, '1kg': 1049 }
    },
    { 
        id: 18, 
        name: "Pav Bhaji Masala", 
        category: "masala", 
        rating: 4.8, 
        reviews: 567, 
        badge: "new", 
        emoji: "🍞",
        shortDesc: "Mumbai-style pav bhaji spice",
        description: "Bring the taste of Mumbai streets to your kitchen!",
        images: { packaged: "images/pav-bhaji-packaged.jpg" },
        customPricing: { '100g': 109, '250g': 269, '500g': 529, '1kg': 1049 }
    },
    { 
        id: 19, 
        name: "Chicken Masala", 
        category: "masala", 
        rating: 4.9, 
        reviews: 823, 
        badge: null, 
        emoji: "🍗",
        shortDesc: "Rich blend for chicken curries",
        description: "Perfect masala for chicken curries, tikka, and grilled preparations.",
        images: { packaged: "images/chicken-masala-packaged.jpg" },
        customPricing: { '100g': 139, '250g': 339, '500g': 659, '1kg': 1299 }
    },
    { 
        id: 20, 
        name: "Biryani Masala", 
        category: "masala", 
        rating: 4.9, 
        reviews: 1156, 
        badge: "best", 
        emoji: "🍚",
        shortDesc: "Royal biryani spice blend",
        description: "Make authentic Hyderabadi/Lucknowi biryani.",
        images: { packaged: "images/biryani-masala-packaged.jpg" },
        customPricing: { '100g': 149, '250g': 359, '500g': 699, '1kg': 1349 }
    },

    // ─── WHOLE SPICES ─────────────────────────────────────
    { 
        id: 21, 
        name: "Whole Black Pepper", 
        category: "whole", 
        rating: 4.8, 
        reviews: 289, 
        badge: "organic", 
        emoji: "⚫",
        shortDesc: "Premium whole black peppercorns",
        description: "Fresh whole black peppercorns from Kerala.",
        images: { packaged: "images/black-pepper-packaged.jpg" },
        customPricing: { '100g': 179, '250g': 439, '500g': 869, '1kg': 1699 }
    },
    { 
        id: 22, 
        name: "Green Cardamom (Elaichi)", 
        category: "whole", 
        rating: 4.9, 
        reviews: 412, 
        badge: "organic", 
        emoji: "💚",
        shortDesc: "Fragrant green cardamom pods",
        description: "Premium green cardamom pods with intense aroma.",
        images: { packaged: "images/cardamom-packaged.jpg" },
        customPricing: { '50g': 299, '100g': 579, '250g': 1399, '500g': 2699 }
    },
    { 
        id: 23, 
        name: "Cinnamon Sticks (Dalchini)", 
        category: "whole", 
        rating: 4.8, 
        reviews: 267, 
        badge: "organic", 
        emoji: "🟫",
        shortDesc: "Sweet & aromatic cinnamon bark",
        description: "True Ceylon cinnamon sticks.",
        images: { packaged: "images/cinnamon-packaged.jpg" },
        customPricing: { '50g': 129, '100g': 249, '250g': 599, '500g': 1179 }
    },
    { 
        id: 24, 
        name: "Kasuri Methi", 
        category: "special", 
        rating: 4.8, 
        reviews: 345, 
        badge: null, 
        emoji: "🌾",
        shortDesc: "Sun-dried fenugreek leaves",
        description: "Sun-dried fenugreek leaves for rich curries.",
        images: { packaged: "images/kasuri-methi-packaged.jpg" },
        customPricing: { '50g': 79, '100g': 149, '250g': 359, '500g': 699 }
    },
    { 
        id: 25, 
        name: "Bay Leaves (Tej Patta)", 
        category: "whole", 
        rating: 4.6, 
        reviews: 156, 
        badge: null, 
        emoji: "🍃",
        shortDesc: "Fragrant Indian bay leaves",
        description: "Hand-picked Indian bay leaves.",
        images: { packaged: "images/bay-leaves-packaged.jpg" },
        customPricing: { '25g': 49, '50g': 89, '100g': 169, '250g': 399 }
    },
    { 
        id: 26, 
        name: "Star Anise", 
        category: "whole", 
        rating: 4.7, 
        reviews: 134, 
        badge: "new", 
        emoji: "⭐",
        shortDesc: "Star-shaped aromatic spice",
        description: "Beautiful star anise with unique flavor.",
        images: { packaged: "images/star-anise-packaged.jpg" },
        customPricing: { '25g': 89, '50g': 169, '100g': 329, '250g': 799 }
    },
    { 
        id: 27, 
        name: "Cloves (Laung)", 
        category: "whole", 
        rating: 4.7, 
        reviews: 198, 
        badge: null, 
        emoji: "🌰",
        shortDesc: "Whole cloves with intense flavor",
        description: "Premium whole cloves.",
        images: { packaged: "images/cloves-packaged.jpg" },
        customPricing: { '50g': 149, '100g': 289, '250g': 699, '500g': 1349 }
    },

    // ─── SPECIAL BLENDS ───────────────────────────────────
    { 
        id: 28, 
        name: "Chaat Masala Special", 
        category: "special", 
        rating: 4.8, 
        reviews: 534, 
        badge: null, 
        emoji: "🍟",
        shortDesc: "Tangy chaat masala mix",
        description: "Perfect chatpata seasoning.",
        images: { packaged: "images/chaat-masala-packaged.jpg" },
        customPricing: { '100g': 99, '250g': 247, '500g': 495, '1kg': 990 }
    }
];

// ==========================================
// 🛠️ PRICING HELPER FUNCTIONS
// ==========================================

/**
 * Get weight-based pricing variants for a specific product.
 * 
 * @param {Object} product - The product object
 * @returns {Array} Array of { label, price } objects
 */
export function getProductPricing(product) {
    if (!product) return [];
    
    // 1. First try: use customPricing from the product itself
    if (product.customPricing && Object.keys(product.customPricing).length > 0) {
        return Object.entries(product.customPricing).map(([label, price]) => ({
            label,
            price
        }));
    }
    
    // 2. Fallback: look up the product in PRODUCTS_SEED by ID
    // (In case Firestore has stale data without customPricing)
    const seedProduct = PRODUCTS_SEED.find(p => p.id === product.id);
    if (seedProduct && seedProduct.customPricing) {
        console.log(`ℹ️ Using seed pricing for: ${product.name}`);
        return Object.entries(seedProduct.customPricing).map(([label, price]) => ({
            label,
            price
        }));
    }
    
    // 3. Last resort: default pricing
    console.warn(`⚠️ No pricing found for product: ${product.name || 'unknown'} (ID: ${product.id})`);
    return [
        { label: '100g', price: 99 },
        { label: '250g', price: 247 },
        { label: '500g', price: 495 },
        { label: '1kg',  price: 990 }
    ];
}

/**
 * Get category metadata (label, icon, color).
 */
export function getCategoryInfo(categoryKey) {
    return CATEGORY_METADATA[categoryKey] || { 
        label: categoryKey, 
        icon: '📦', 
        color: '#666' 
    };
}

/**
 * Get the minimum price for a product (for "starts from ₹X" display).
 */
export function getMinPrice(product) {
    const variants = getProductPricing(product);
    if (variants.length === 0) return 0;
    return Math.min(...variants.map(v => v.price));
}

/**
 * Get the maximum price for a product.
 */
export function getMaxPrice(product) {
    const variants = getProductPricing(product);
    if (variants.length === 0) return 0;
    return Math.max(...variants.map(v => v.price));
}

/**
 * Get the default/recommended weight variant (middle option).
 */
export function getDefaultVariant(product) {
    const variants = getProductPricing(product);
    if (variants.length === 0) return null;
    const middleIndex = Math.floor(variants.length / 2);
    return variants[middleIndex];
}

/**
 * Get a specific variant by label.
 * Example: getVariantByLabel(product, '500g')
 */
export function getVariantByLabel(product, label) {
    const variants = getProductPricing(product);
    return variants.find(v => v.label === label) || null;
}

// ==========================================
// FIREBASE FUNCTIONS
// ==========================================
// ⬇️ Increment this number whenever you change PRODUCTS_SEED to force refresh
const SEED_VERSION = 4;  // ⬆️ BUMPED from 3 to 4 to refresh with new pricing structure

export async function fetchProducts() {
    try {
        const versionDoc = await getDoc(doc(db, 'meta', 'version'));
        const currentVersion = versionDoc.exists() ? versionDoc.data().value : 0;
        
        if (currentVersion < SEED_VERSION) {
            console.log(`🔄 Updating products from v${currentVersion} to v${SEED_VERSION}...`);
            
            const oldSnapshot = await getDocs(collection(db, 'products'));
            for (const d of oldSnapshot.docs) {
                await deleteDoc(d.ref);
            }
            
            await seedProducts();
            await setDoc(doc(db, 'meta', 'version'), { value: SEED_VERSION });
            
            console.log(`✅ Updated to v${SEED_VERSION}`);
            return PRODUCTS_SEED;
        }
        
        const snapshot = await getDocs(collection(db, 'products'));
        if (snapshot.empty) {
            console.log('📦 First-time seeding to Firebase...');
            await seedProducts();
            await setDoc(doc(db, 'meta', 'version'), { value: SEED_VERSION });
            return PRODUCTS_SEED;
        }
        return snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
    } catch (e) {
        console.error('Fetch products error:', e);
        return PRODUCTS_SEED;
    }
}

export async function seedProducts() {
    try {
        for (const product of PRODUCTS_SEED) {
            await addDoc(collection(db, 'products'), product);
        }
        console.log('✅ Products seeded to Firebase');
    } catch (e) {
        console.error('Seed error:', e);
    }
}

export async function getProduct(id) {
    try {
        const snapshot = await getDocs(query(collection(db, 'products'), where('id', '==', parseInt(id))));
        if (!snapshot.empty) {
            const d = snapshot.docs[0];
            return { ...d.data(), docId: d.id };
        }
        return PRODUCTS_SEED.find(p => p.id === parseInt(id));
    } catch (e) {
        return PRODUCTS_SEED.find(p => p.id === parseInt(id));
    }
}

export async function saveOrder(orderData) {
    try {
        const docRef = await addDoc(collection(db, 'orders'), {
            ...orderData,
            createdAt: serverTimestamp()
        });
        console.log('✅ Order saved:', docRef.id);
        
        try {
            await fetch('/api/notify-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
        } catch (e) {
            console.log('Notifications will work after Vercel deployment');
        }
        
        return docRef.id;
    } catch (e) {
        console.error('Save order error:', e);
        const orders = JSON.parse(localStorage.getItem('silkspices_orders') || '[]');
        orders.unshift(orderData);
        localStorage.setItem('silkspices_orders', JSON.stringify(orders));
        return null;
    }
}

export async function fetchOrders() {
    try {
        const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
    } catch (e) {
        console.error('Fetch orders error:', e);
        return JSON.parse(localStorage.getItem('silkspices_orders') || '[]');
    }
}

export async function updateOrderStatus(docId, status) {
    try {
        await updateDoc(doc(db, 'orders', docId), { 
            status, 
            updatedAt: serverTimestamp() 
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function fetchReviews(productId) {
    try {
        const q = query(
            collection(db, 'reviews'),
            where('productId', '==', parseInt(productId))
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
    } catch (e) {
        return [];
    }
}

export async function addReview(review) {
    try {
        await addDoc(collection(db, 'reviews'), {
            ...review,
            createdAt: serverTimestamp()
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function adminLogin(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function adminLogout() {
    await signOut(auth);
}

export function checkAuth(callback) {
    return onAuthStateChanged(auth, callback);
}
// ==========================================
// 💳 PAYMENT VERIFICATION FUNCTIONS
// ==========================================

/**
 * Update payment status for an order
 * @param {string} docId - Firestore document ID
 * @param {string} status - 'verified', 'rejected', or 'refunded'
 * @param {string} notes - Optional admin notes
 */
export async function updatePaymentStatus(docId, status, notes = '') {
    try {
        const orderRef = doc(db, 'orders', docId);
        const orderSnap = await getDoc(orderRef);
        
        if (!orderSnap.exists()) {
            throw new Error('Order not found');
        }
        
        const orderData = orderSnap.data();
        
        await updateDoc(orderRef, {
            paymentStatus: status,
            paymentVerifiedAt: status === 'verified' ? serverTimestamp() : null,
            paymentNotes: notes,
            status: status === 'verified' ? 'confirmed' : orderData.status,
            updatedAt: serverTimestamp()
        });
        
        // Send email to customer if verified
        if (status === 'verified' && orderData.customer?.email) {
            await sendPaymentConfirmationEmail(orderData, docId);
        }
        
        console.log(`✅ Payment ${status} for order ${docId}`);
        return true;
    } catch (e) {
        console.error('Update payment status error:', e);
        return false;
    }
}

/**
 * Send payment confirmation email to customer via SendGrid
 * (Uses Vercel serverless function - falls back gracefully if not deployed)
 */
export async function sendPaymentConfirmationEmail(orderData, orderId) {
    try {
        const emailData = {
            to: orderData.customer.email,
            customerName: orderData.customer.name,
            orderId: 'SS-' + orderId.substring(0, 8).toUpperCase(),
            amount: orderData.total,
            items: orderData.items,
            address: `${orderData.customer.address}, ${orderData.customer.city} - ${orderData.customer.pincode}`,
            phone: orderData.customer.phone
        };
        
        const response = await fetch('/api/send-payment-confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emailData)
        });
        
        if (response.ok) {
            console.log('✅ Confirmation email sent to', orderData.customer.email);
            return true;
        }
    } catch (e) {
        console.log('ℹ️ Email API not available yet (deploy to Vercel to enable)');
    }
    return false;
}

/**
 * Get payment statistics for dashboard
 */
export async function getPaymentStats() {
    try {
        const snapshot = await getDocs(collection(db, 'orders'));
        const orders = snapshot.docs.map(d => d.data());
        
        return {
            total: orders.length,
            pendingUPI: orders.filter(o => o.paymentMethod === 'UPI' && o.paymentStatus === 'claimed').length,
            verifiedUPI: orders.filter(o => o.paymentMethod === 'UPI' && o.paymentStatus === 'verified').length,
            codOrders: orders.filter(o => o.paymentMethod === 'COD').length,
            totalRevenue: orders
                .filter(o => o.paymentStatus === 'verified' || o.paymentMethod === 'COD')
                .reduce((sum, o) => sum + (o.total || 0), 0),
            pendingRevenue: orders
                .filter(o => o.paymentStatus === 'claimed')
                .reduce((sum, o) => sum + (o.total || 0), 0)
        };
    } catch (e) {
        console.error('Stats error:', e);
        return { total: 0, pendingUPI: 0, verifiedUPI: 0, codOrders: 0, totalRevenue: 0, pendingRevenue: 0 };
    }
}

export { db, auth };