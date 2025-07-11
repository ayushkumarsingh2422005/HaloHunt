# HaloHunt Application Endpoints

Base URL: `https://halo-hunt.vercel.app`

## Authentication Screens

### Login
- **URL**: `/login`
- **Description**: User login screen with email/password authentication
- **Features**:
  - Email and password input fields with validation
  - "Remember me" checkbox
  - Password visibility toggle
  - Forgot password link
  - Social login options (Google, Facebook)
  - Link to signup page
  - Form validation and error handling
  - Loading state during authentication

### Signup
- **URL**: `/signup`
- **Description**: New user registration screen
- **Features**:
  - Full name, email, password, and confirm password fields
  - Password visibility toggles
  - Terms and conditions agreement checkbox
  - Social signup options (Google, Facebook)
  - Link to login page
  - Comprehensive form validation
  - Success confirmation screen after signup
  - Loading state during registration

### Forgot Password
- **URL**: `/forgot-password`
- **Description**: Password recovery request screen
- **Features**:
  - Email input field with validation
  - Form submission with loading state
  - Success confirmation screen after submission
  - Link back to login page

### Reset Password
- **URL**: `/reset-password?token=[reset_token]`
- **Description**: Password reset screen (accessed via email link)
- **Features**:
  - New password and confirm password fields
  - Password visibility toggles
  - Token validation
  - Success confirmation screen after password reset
  - Link to login page after completion
  - Loading states during token verification and password reset

## Main Application Screens

### Home Page
- **URL**: `/`
- **Description**: Main landing page for the application
- **Features**:
  - Product listings
  - Navigation to other sections
  - Authentication state awareness (login/logout)

### Search
- **URL**: `/search`
- **Description**: Product search page
- **Features**:
  - Search input field
  - Filter options
  - Product listings based on search criteria

### Live
- **URL**: `/live`
- **Description**: Live shopping events page
- **Features**:
  - Ongoing and upcoming live shopping events
  - Event details and participation options

### Live Host
- **URL**: `/live/host`
- **Description**: Page for hosts to manage their live shopping events
- **Features**:
  - Event creation and management tools
  - Analytics and viewer information

### Live View
- **URL**: `/live/view/[id]`
- **Description**: Page for viewing a specific live shopping event
- **Features**:
  - Live video stream
  - Product information
  - Chat/interaction features
  - Purchase options

### Cart
- **URL**: `/cart`
- **Description**: Shopping cart page
- **Features**:
  - List of items in cart
  - Quantity adjustment
  - Price calculations
  - Checkout button

### Checkout
- **URL**: `/checkout`
- **Description**: Order completion and payment page
- **Features**:
  - Shipping information
  - Payment method selection
  - Order summary
  - Order placement

### Profile
- **URL**: `/profile`
- **Description**: User profile page
- **Features**:
  - User information
  - Order history
  - Account settings
  - Logout option

### User Profile
- **URL**: `/profile/[id]`
- **Description**: Public profile page for viewing other users
- **Features**:
  - User information
  - Products/listings by the user
  - Reviews and ratings

### Landing
- **URL**: `/landing`
- **Description**: Marketing landing page
- **Features**:
  - Platform introduction
  - Key features
  - Registration/login options

### Notifications
- **URL**: `/notifications`
- **Description**: User notifications page
- **Features**:
  - List of notifications
  - Read/unread status
  - Notification management

## Mobile Responsiveness

All screens have been optimized for mobile devices with:
- Responsive layouts
- Appropriate spacing and font sizes
- Touch-friendly input elements
- Proper viewport settings
- Mobile-optimized navigation

## Authentication Flow

1. User accesses login page
2. User can:
   - Log in with existing credentials
   - Navigate to signup to create a new account
   - Request password reset via forgot password
3. After password reset request, user receives an email
4. User clicks the reset link and sets a new password
5. User is redirected to login with new credentials

## Navigation Structure

- Bottom navigation on mobile (Home, Live, Search, Cart, Profile)
- Side navigation on desktop
- Top header with search bar and authentication controls
- Context-aware navigation based on authentication state 