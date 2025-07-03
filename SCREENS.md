Here's a **detailed list of screens** your **Live E-Commerce App** will need to achieve full functionality — covering both the **buyer and seller journeys**, including **live streaming, product management, delivery, and user profiles**. The screens are categorized for **authentication**, **e-commerce**, **seller tools**, **live features**, and **admin/backend** interfaces.

---

## 🔐 **Authentication & Onboarding**

1. **Welcome Screen**

   * Choose to Login or Signup.
   * App intro (optional carousel).

2. **Login Screen**

   * Email/Phone + Password.
   * Social login (Google, Apple, Facebook).
   * Forgot Password.

3. **Signup Screen**

   * Name, Email/Phone, Password.
   * Optional role tag (but allow dynamic switching later).
   * OTP verification (if using phone/email).

4. **OTP Verification Screen**

   * For phone/email verification during signup or password reset.

5. **Password Reset Screen**

   * OTP + New password fields.

6. **Profile Setup Screen**

   * Profile photo, address, city, state, pin code.
   * Choose interests/tags (for personalized feed).

---

## 🛒 **Buyer-Focused Screens**

1. **Home Screen (Product Feed)**

   * Product carousel (featured items).
   * Categories grid (Electronics, Fashion, etc.).
   * Live sessions preview tiles.
   * Recently viewed & recommendations.

2. **Search Screen**

   * Search bar, auto-suggestions.
   * Filter (price, category, rating, live products).
   * Sort by price, popularity, etc.

3. **Product Details Screen**

   * Title, images/videos, price, description.
   * Reviews and ratings.
   * "Add to Cart", "Buy Now", "Save for Later".
   * Seller details, return/cancel policy.

4. **Cart Screen**

   * List of added items.
   * Quantity management.
   * Remove/edit.
   * Proceed to checkout.

5. **Checkout Screen**

   * Delivery address selection.
   * Payment method (UPI, Card, COD).
   * Order summary.

6. **Order Success Screen**

   * Order ID, confirmation.
   * Estimated delivery time.

7. **Order History Screen**

   * List of orders with status badges.
   * View details button.

8. **Order Details Screen**

   * Product summary, status, tracking.
   * Cancel or return options.
   * Shiprocket tracking embed.

9. **Wishlist / Saved Items Screen**

   * Items saved for later.
   * “Move to Cart” option.

10. **Live Session Explore Screen**

    * List of all ongoing/upcoming lives.
    * Searchable/sortable by category.
    * View count badges.

11. **Live Viewing Screen (Agora Integrated)**

    * Live video.
    * Real-time chat.
    * Tagged products in side/bottom sheet.
    * Click to view/buy tagged items.

---

## 🛍️ **Seller-Focused Screens**

1. **Seller Dashboard**

   * At-a-glance view: orders, live stats, product metrics.

2. **My Products Screen**

   * List of uploaded products.
   * Visibility toggle (Public/Private).
   * Edit/Delete options.

3. **Add/Edit Product Screen**

   * Title, images, price, quantity.
   * Tags, description, isLiveTaggable toggle.
   * Category and sub-category.

4. **Live Session Setup Screen**

   * Title, time (immediate/scheduled).
   * Select products to tag.
   * Start Live / Schedule buttons.

5. **Live Broadcasting Screen (Agora Host)**

   * Camera on/off, mic controls.
   * Tag product in real-time (floating panel).
   * Viewer count and chat interface.

6. **My Orders Screen (Seller View)**

   * Received orders with status.
   * Mark as Packed / Dispatch.
   * View Shiprocket label / AWB ID.

7. **Order Fulfillment Screen**

   * Integrate Shiprocket order creation and tracking.
   * Print label.
   * Update status from Packed → Dispatched → Delivered.

8. **Live Session History Screen**

   * Past live sessions.
   * View tagged products and engagement stats.

9. **Sales Analytics Screen**

   * Views per product/live.
   * Conversion rate.
   * Revenue dashboard.

---

## 👤 **User Profile & Settings**

1. **My Profile Screen**

   * Edit profile image, address, phone, email.
   * Switch between buyer/seller modes (if UI allows toggling).

2. **Settings Screen**

   * Change password.
   * Notification preferences.
   * Logout button.

3. **Address Book Screen**

   * List of saved addresses.
   * Add / Edit / Delete address.

4. **Support / Help Screen**

   * FAQs, contact support form.
   * Chat with support (if implemented).

5. **Referral & Rewards Screen** *(Optional)*

   * Refer friends, track rewards.

---

## 📊 **Admin / Moderation (Optional Web Interface)**

1. **User Management Dashboard**

   * List/search of all users.
   * Ban/verify/suspend controls.

2. **Product Moderation Screen**

   * Approve/reject flagged products.
   * Monitor for inappropriate content.

3. **Live Session Moderation**

   * Active sessions list.
   * Join session, monitor, kick or mute.

4. **Revenue & Insights**

   * Platform-wide sales stats.
   * Seller leaderboard.
   * Category-wise performance.

---

## 📌 Optional / Extra Screens

1. **Notifications Screen**

   * Order updates, delivery tracking.
   * Upcoming live alerts.
   * Promo banners / discount alerts.

2. **Coupon/Offer Screen**

   * Apply coupon codes.
   * List of current offers.

3. **Review & Rating Screen**

   * Submit review post-order.
   * View & manage given reviews.

4. **Language & Localization Settings**

   * Change app language, currency (if global).

---

## ✅ Summary (Master Checklist of Screens)

| Screen                         | Role   | Must-Have? |
| ------------------------------ | ------ | ---------- |
| Welcome/Login/Signup           | Both   | ✅          |
| Profile Setup                  | Both   | ✅          |
| Home/Search/Product Details    | Buyer  | ✅          |
| Cart/Checkout/Order History    | Buyer  | ✅          |
| Wishlist                       | Buyer  | ✅          |
| Seller Dashboard               | Seller | ✅          |
| Add/Edit Product               | Seller | ✅          |
| Start/Schedule Live            | Seller | ✅          |
| Broadcast (Agora)              | Seller | ✅          |
| Live Viewer                    | Buyer  | ✅          |
| Orders (both buyer/seller)     | Both   | ✅          |
| Order Fulfillment (Shiprocket) | Seller | ✅          |
| Notifications                  | Both   | ✅          |
| Settings/Profile Edit          | Both   | ✅          |
| Support/Help                   | Both   | ✅          |
| Analytics                      | Seller | ✅          |
| Admin Tools                    | Admin  | Optional   |
| Review & Rating                | Buyer  | ✅          |

---

Let me know if you also want **navigation wireframes**, **component breakdowns**, or **React Native routing structure**.
