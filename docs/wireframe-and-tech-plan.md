# NCERT Paper Generator - Complete Wireframe & Technical Plan

## 📱 App Overview
A comprehensive mobile app for NCERT teachers to create, manage, and generate test papers with rich question databases, PDF/Word export, and admin management.

## 🏗️ Technical Architecture

### Core Technologies
- **Framework**: React Native with Expo SDK 52
- **Navigation**: Expo Router 4.0.17 with Tab-based primary navigation
- **State Management**: React Context + useReducer for complex state
- **Database**: SQLite with expo-sqlite for offline-first approach
- **Authentication**: Firebase Auth with SMS OTP
- **File Storage**: Expo FileSystem + Cloud Storage (Firebase Storage)
- **PDF Generation**: react-native-html-to-pdf + expo-print
- **Rich Text**: react-native-render-html + custom editor
- **Image Processing**: expo-image-manipulator for compression/resizing
- **Notifications**: Expo Notifications
- **Monetization**: Expo AdMob (Banner, Interstitial, Rewarded)

### Performance Optimizations
- **Lazy Loading**: React.lazy() for heavy components
- **Virtual Lists**: FlatList with getItemLayout for large datasets
- **Image Optimization**: WebP format, multiple resolutions
- **Caching**: React Query for API caching
- **Background Tasks**: Expo TaskManager for paper generation queue

---

## 📋 Screen-by-Screen Wireframe & Technical Details

### 1. 🔐 Authentication Flow

#### 1.1 Welcome/Onboarding Screen
```
┌─────────────────────────────────────┐
│  [NCERT Logo]                      │
│                                     │
│  📚 NCERT Paper Generator          │
│                                     │
│  [Hero Image - Teachers/Students]   │
│                                     │
│  ✓ 50,000+ Questions               │
│  ✓ PDF & Word Export               │
│  ✓ Rich Text Support               │
│  ✓ Offline Access                  │
│                                     │
│  [Continue with Phone Number] 📱   │
│                                     │
│  👥 Join 10,000+ Teachers          │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **Component**: `WelcomeScreen.tsx`
- **Libraries**: 
  - `expo-linear-gradient` for background
  - `react-native-reanimated` for animations
  - `expo-font` for custom typography
- **Features**:
  - Animated hero section with Lottie animations
  - Statistics counter animation
  - Smooth transitions to phone verification

#### 1.2 Phone Verification Screen
```
┌─────────────────────────────────────┐
│  ← [Back]    Phone Verification     │
│                                     │
│  📱 Enter your mobile number        │
│                                     │
│  🇮🇳 +91 [__________]              │
│                                     │
│  [Send OTP]                        │
│                                     │
│  ─────── OTP SCREEN ─────────       │
│                                     │
│  Enter 6-digit code sent to         │
│  +91 98765-43210                    │
│                                     │
│  [_] [_] [_] [_] [_] [_]           │
│                                     │
│  Resend in 30s                      │
│  [Verify & Continue]                │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **Component**: `PhoneVerificationScreen.tsx`
- **Libraries**:
  - `react-native-otp-inputs` for OTP input
  - `expo-sms` for auto-fill OTP
  - `react-native-country-picker-modal` for country selection
- **Features**:
  - Auto-focus OTP inputs
  - Resend timer with countdown
  - SMS auto-detection
  - Input validation and error states

### 2. 🏠 Main Dashboard

#### 2.1 Dashboard Home Screen
```
┌─────────────────────────────────────┐
│  Good Morning, Dr. Sharma! 🌅      │
│  [Profile Pic] [🔔 Notifications]   │
│                                     │
│  📊 Quick Stats                     │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │ 45  │ │ 12  │ │123  │ │Math │   │
│  │Paper│ │This │ │Ques │ │Most │   │
│  │     │ │Month│ │     │ │Used │   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
│                                     │
│  🚀 Quick Actions                   │
│  ┌──────────┐ ┌──────────┐         │
│  │ 📝 Create│ │ 📚 Browse│         │
│  │   Paper  │ │Questions │         │
│  └──────────┘ └──────────┘         │
│  ┌──────────┐ ┌──────────┐         │
│  │ 📄 My    │ │ 💬 Contact│         │
│  │  Papers  │ │   Admin  │         │
│  └──────────┘ └──────────┘         │
│                                     │
│  📈 Recent Activity                 │
│  • Paper generated - Math Class 10 │
│  • Question added - Physics Ch 5   │
│  • Downloaded - Sample Paper #123  │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **Component**: `DashboardScreen.tsx`
- **State Management**: Context for user stats and recent activities
- **Libraries**:
  - `react-native-chart-kit` for statistics visualization
  - `react-native-super-grid` for quick actions grid
  - `react-native-skeleton-placeholder` for loading states
- **Features**:
  - Real-time statistics updates
  - Animated counters for stats
  - Pull-to-refresh functionality
  - Deep linking to specific actions

### 3. 📝 Paper Creation Flow

#### 3.1 Paper Type Selection
```
┌─────────────────────────────────────┐
│  ← Create New Paper                 │
│                                     │
│  Select Paper Type                  │
│                                     │
│  ┌─────────────┐ ┌─────────────┐   │
│  │ 📝 General  │ │ ☑️  MCQ     │   │
│  │    Paper    │ │   Paper     │   │
│  └─────────────┘ └─────────────┘   │
│                                     │
│  ┌─────────────┐ ┌─────────────┐   │
│  │ 📖 Unit     │ │ ⏰ Term     │   │
│  │   Test      │ │   Paper     │   │
│  └─────────────┘ └─────────────┘   │
│                                     │
│  ┌─────────────┐ ┌─────────────┐   │
│  │ 🎓 Half     │ │ 🏆 Board    │   │
│  │  Yearly     │ │   Exam      │   │
│  └─────────────┘ └─────────────┘   │
│                                     │
│  [Continue] →                       │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **Component**: `PaperTypeSelectionScreen.tsx`
- **Navigation**: Stack navigator within Create tab
- **Libraries**:
  - `react-native-reanimated` for card animations
  - Custom card components with haptic feedback
- **Features**:
  - Animated card selection
  - Type-specific templates
  - Progress indicator

#### 3.2 Paper Configuration
```
┌─────────────────────────────────────┐
│  ← Paper Details                    │
│                                     │
│  📋 Basic Information               │
│  ┌─────────────────────────────────┐ │
│  │ Paper Title                     │ │
│  │ [Mathematics Unit Test]         │ │
│  └─────────────────────────────────┘ │
│                                     │
│  Subject: [Mathematics ▼]          │
│  Class: [Class 10 ▼]               │
│  Chapter: [Linear Equations ▼]     │
│                                     │
│  ⏱️ Duration: [180] minutes         │
│  🎯 Total Marks: [100]              │
│                                     │
│  📊 Question Distribution           │
│  ┌─────────────────────────────────┐ │
│  │ MCQ (1 mark): [10] questions    │ │
│  │ Short (3 marks): [5] questions  │ │
│  │ Long (5 marks): [4] questions   │ │
│  └─────────────────────────────────┘ │
│                                     │
│  [Next: Select Questions] →         │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **Component**: `PaperConfigurationScreen.tsx`
- **Form Management**: `react-hook-form` for validation
- **Libraries**:
  - `react-native-picker-select` for dropdowns
  - `react-native-slider` for mark distribution
- **Features**:
  - Real-time validation
  - Auto-calculation of total marks
  - Template-based pre-filling

#### 3.3 Question Selection Interface
```
┌─────────────────────────────────────┐
│  ← Select Questions (15/25)         │
│                                     │
│  🔍 [Search questions...]           │
│  🔽 [Filters] 📊 [Sort: Most Used] │
│                                     │
│  📚 Mathematics > Class 10 > Ch 5   │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ ☑️ What is the value of x in... │ │
│  │    MCQ • 1 mark • Easy • ⭐4.5  │ │
│  │    Used 45 times • 2 days ago   │ │
│  │    [Preview] [Edit] [Add]       │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ ☐ Solve the quadratic equation │ │
│  │    Long Answer • 5 marks • Med  │ │
│  │    Used 23 times • 1 week ago   │ │
│  │    [Preview] [Edit] [Add]       │ │
│  └─────────────────────────────────┘ │
│                                     │
│  [+ Add Custom Question]            │
│  [Generate Paper] 🎯               │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **Component**: `QuestionSelectionScreen.tsx`
- **Data Management**: 
  - SQLite queries with FTS (Full Text Search)
  - React Query for caching and pagination
- **Libraries**:
  - `react-native-super-grid` for question grid
  - `react-native-modal` for preview/edit modals
  - `fuse.js` for fuzzy search
- **Features**:
  - Infinite scroll with pagination
  - Multi-select with batch operations
  - Real-time search and filtering
  - Question preview with rich text rendering

### 4. 📚 Question Management

#### 4.1 Question Bank Browser
```
┌─────────────────────────────────────┐
│  Question Bank 📚                   │
│  [🔍 Search] [🔽 Filter] [+ Add]    │
│                                     │
│  📊 [All] [Math] [Physics] [My Qs]  │
│                                     │
│  Sort: [Most Used ▼]               │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 🔢 What is the derivative of... │ │
│  │ Mathematics • Class 12 • Ch 6   │ │
│  │ Short Answer • 3 marks • Medium │ │
│  │ ⭐ 4.2 • Used 67 times • Own Q  │ │
│  │ [👁️ View] [✏️ Edit] [🚩 Report] │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 🧪 Balance the chemical eq...   │ │
│  │ Chemistry • Class 10 • Ch 3     │ │
│  │ MCQ • 1 mark • Easy • ⭐ 4.8    │ │
│  │ Used 89 times • Admin Q         │ │
│  │ [👁️ View] [📋 Copy] [🚩 Report] │ │
│  └─────────────────────────────────┘ │
│                                     │
│  [Load More...] ↻                   │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **Component**: `QuestionBankScreen.tsx`
- **Database**: 
  - SQLite with FTS5 for full-text search
  - Indexed columns for fast filtering
- **Libraries**:
  - `react-native-fast-image` for optimized image loading
  - `react-native-ratings` for star ratings
  - `react-native-actionsheet` for question actions
- **Features**:
  - Advanced filtering (subject, class, difficulty, type)
  - Sorting by usage, rating, date
  - Batch operations (delete, export, categorize)
  - Offline-first with sync capabilities

#### 4.2 Question Editor/Creator
```
┌─────────────────────────────────────┐
│  ← Create Question                  │
│  [💾 Save] [👁️ Preview] [🗑️ Delete] │
│                                     │
│  📋 Question Details                │
│  Subject: [Mathematics ▼]          │
│  Class: [Class 10 ▼]               │
│  Chapter: [Linear Equations ▼]     │
│  Type: [MCQ ▼] Marks: [1]          │
│  Difficulty: [Easy ▼]              │
│                                     │
│  📝 Question Content                │
│  ┌─────────────────────────────────┐ │
│  │ [B] [I] [U] [🔗] [📷] [📊]      │ │
│  │                                 │ │
│  │ What is the value of x in the   │ │
│  │ equation 2x + 5 = 15?           │ │
│  │                                 │ │
│  │ [📷 Image placeholder]          │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ✅ Answer Options (MCQ)            │
│  A) [x = 5] ☑️ Correct             │
│  B) [x = 10]                       │
│  C) [x = 15]                       │
│  D) [x = 20]                       │
│  [+ Add Option]                     │
│                                     │
│  💡 Explanation (Optional)          │
│  [Rich text editor...]             │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **Component**: `QuestionEditorScreen.tsx`
- **Rich Text**: 
  - Custom rich text editor with toolbar
  - HTML-based content storage
- **Libraries**:
  - `react-native-render-html` for display
  - `expo-image-picker` for image selection
  - `expo-image-manipulator` for image processing
- **Features**:
  - WYSIWYG rich text editing
  - Image upload with compression
  - LaTeX math equation support
  - Auto-save drafts
  - Version control for questions

### 5. 📄 Paper Management

#### 5.1 My Papers List
```
┌─────────────────────────────────────┐
│  My Papers 📄                       │
│  [🔍 Search] [🔽 Filter] [📤 Export]│
│                                     │
│  📊 [All] [Drafts] [Published]      │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 📝 Mathematics Unit Test        │ │
│  │ Class 10 • 25 questions • 100M  │ │
│  │ Created: 2 days ago • Draft     │ │
│  │ [📱 Edit] [👁️ View] [📄 PDF]    │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 📝 Physics Term Paper           │ │
│  │ Class 12 • 30 questions • 150M  │ │
│  │ Created: 1 week ago • Published │ │
│  │ Downloaded 15 times             │ │
│  │ [📱 Edit] [📄 PDF] [🔗 Share]   │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 📝 Chemistry MCQ Test           │ │
│  │ Class 11 • 40 questions • 80M   │ │
│  │ Created: 2 weeks ago • Published│ │
│  │ [📱 Edit] [📄 PDF] [🗑️ Delete]  │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **Component**: `MyPapersScreen.tsx`
- **Storage**: SQLite for metadata, FileSystem for PDF cache
- **Libraries**:
  - `react-native-share` for sharing papers
  - `expo-document-picker` for import/export
- **Features**:
  - Paper status tracking (draft/published)
  - Usage analytics per paper
  - Bulk operations (delete, export, share)
  - Cloud sync for backup

#### 5.2 Paper Preview/Editor
```
┌─────────────────────────────────────┐
│  ← Mathematics Unit Test            │
│  [📱 Edit] [📄 PDF] [🔗 Share]      │
│                                     │
│  📋 Paper Information               │
│  Subject: Mathematics               │
│  Class: 10 • Duration: 3 hours     │
│  Total Marks: 100 • Questions: 25  │
│                                     │
│  📝 Paper Content Preview          │
│  ┌─────────────────────────────────┐ │
│  │ MATHEMATICS UNIT TEST           │ │
│  │ Class: X        Time: 3 Hours   │ │
│  │ Max Marks: 100                  │ │
│  │                                 │ │
│  │ SECTION A - MCQ (1 mark each)   │ │
│  │                                 │ │
│  │ 1. What is the value of x...    │ │
│  │    a) 5  b) 10  c) 15  d) 20    │ │
│  │                                 │ │
│  │ 2. Solve for y in the...        │ │
│  │    a) 2  b) 4   c) 6   d) 8     │ │
│  │                                 │ │
│  │ SECTION B - Short Answer (3M)   │ │
│  │                                 │ │
│  │ 3. Explain the concept of...    │ │
│  └─────────────────────────────────┘ │
│                                     │
│  [📄 Generate PDF] [📝 Edit Paper]  │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **Component**: `PaperPreviewScreen.tsx`
- **PDF Generation**: 
  - HTML template system
  - `expo-print` for PDF creation
- **Libraries**:
  - `react-native-webview` for HTML preview
  - Custom PDF templates
- **Features**:
  - Real-time preview
  - Multiple export formats (PDF, Word, HTML)
  - Custom paper templates
  - Answer key generation

### 6. 👤 User Profile & Settings

#### 6.1 Profile Screen
```
┌─────────────────────────────────────┐
│  Profile 👤                         │
│  [⚙️ Settings] [🔔 Notifications]   │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │     [Profile Picture]           │ │
│  │                                 │ │
│  │    Dr. Priya Sharma             │ │
│  │    Mathematics Teacher          │ │
│  │    Delhi Public School          │ │
│  │    📱 +91 98765-43210           │ │
│  │                                 │ │
│  │    [Edit Profile]               │ │
│  └─────────────────────────────────┘ │
│                                     │
│  📊 Your Statistics                 │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │ 45  │ │ 123 │ │Math │ │ 4.8 │   │
│  │Paper│ │Ques │ │Subj │ │Rate │   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
│                                     │
│  🎯 Achievements                    │
│  🏆 Paper Master (50+ papers)      │
│  📚 Question Contributor (100+ Qs) │
│  ⭐ Top Rated (4.5+ rating)        │
│                                     │
│  📱 App Settings                    │
│  • Notification Preferences        │
│  • Download Settings               │
│  • Privacy & Security              │
│  • Help & Support                  │
│  • About App                       │
│                                     │
│  [🚪 Sign Out]                     │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **Component**: `ProfileScreen.tsx`
- **Data Management**: AsyncStorage for preferences
- **Libraries**:
  - `expo-image-picker` for profile picture
  - `react-native-chart-kit` for statistics
- **Features**:
  - Profile picture upload and crop
  - Achievement system
  - Usage analytics
  - Settings management

### 7. 🔧 Admin Panel

#### 7.1 Admin Dashboard
```
┌─────────────────────────────────────┐
│  Admin Panel 🛠️                    │
│  [📊 Analytics] [⚙️ Settings]       │
│                                     │
│  📈 System Overview                 │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │1,234│ │5,678│ │2,345│ │ 23  │   │
│  │Users│ │Ques │ │Paper│ │Repo │   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
│                                     │
│  🚀 Quick Actions                   │
│  ┌──────────┐ ┌──────────┐         │
│  │ 📝 Add   │ │ 📚 Manage│         │
│  │Question  │ │Questions │         │
│  └──────────┘ └──────────┘         │
│  ┌──────────┐ ┌──────────┐         │
│  │ 👥 User  │ │ 🔔 Send  │         │
│  │Management│ │Notification       │         │
│  └──────────┘ └──────────┘         │
│                                     │
│  🚨 Pending Actions                 │
│  • 5 Question Reports to Review    │
│  • 3 User Queries Pending          │
│  • 2 Content Approval Requests     │
│                                     │
│  📊 Recent Activity                 │
│  • New user registered - Dr. Kumar │
│  • Question reported - Math Q#1234 │
│  • Paper generated - Physics Test  │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **Component**: `AdminDashboardScreen.tsx`
- **Role-based Access**: JWT tokens with role validation
- **Libraries**:
  - `react-native-chart-kit` for analytics
  - Real-time updates with WebSocket
- **Features**:
  - Real-time system monitoring
  - User activity tracking
  - Content moderation queue
  - System health metrics

#### 7.2 Question Management (Admin)
```
┌─────────────────────────────────────┐
│  ← Question Management              │
│  [🔍 Search] [🔽 Filter] [+ Add]    │
│                                     │
│  📊 Status: [All] [Pending] [Live]  │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 🔢 What is the derivative...    │ │
│  │ Math • Class 12 • Ch 6 • Live   │ │
│  │ Created by: Dr. Sharma          │ │
│  │ ⭐ 4.2 • Used 67 times          │ │
│  │ [✏️ Edit] [👁️ View] [🗑️ Delete] │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 🚨 Balance the chemical...      │ │
│  │ Chemistry • Class 10 • Reported │ │
│  │ Issue: Incorrect answer         │ │
│  │ Reported by: Teacher A          │ │
│  │ [🔍 Review] [✅ Approve] [❌ Reject] │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 📝 Solve the quadratic...       │ │
│  │ Math • Class 10 • Pending       │ │
│  │ Submitted by: Dr. Patel         │ │
│  │ [✅ Approve] [✏️ Edit] [❌ Reject] │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **Component**: `AdminQuestionManagementScreen.tsx`
- **Workflow**: Question approval pipeline
- **Libraries**:
  - Content moderation APIs
  - Batch operation utilities
- **Features**:
  - Bulk approval/rejection
  - Content quality scoring
  - Plagiarism detection
  - Version history tracking

### 8. 🔔 Notifications & Communication

#### 8.1 Notifications Center
```
┌─────────────────────────────────────┐
│  Notifications 🔔                   │
│  [Mark All Read] [⚙️ Settings]      │
│                                     │
│  📊 [All] [System] [Updates] [Ads]  │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 🆕 New questions added!         │ │
│  │ 50+ Math questions for Class 10 │ │
│  │ 2 hours ago • [View Questions]  │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ ✅ Paper generation complete    │ │
│  │ "Physics Term Test" is ready    │ │
│  │ 1 day ago • [Download PDF]     │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 🎯 Weekly Challenge!            │ │
│  │ Create 5 papers to earn rewards │ │
│  │ 3 days ago • [Join Challenge]   │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 📱 App Update Available         │ │
│  │ Version 2.1 with new features   │ │
│  │ 1 week ago • [Update Now]      │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **Component**: `NotificationsScreen.tsx`
- **Push Notifications**: Expo Notifications
- **Libraries**:
  - Local notification scheduling
  - Deep linking for notification actions
- **Features**:
  - Rich notifications with actions
  - Notification categories and filtering
  - Read/unread status tracking
  - Notification history

#### 8.2 Contact Admin/Support
```
┌─────────────────────────────────────┐
│  ← Contact Support                  │
│                                     │
│  💬 How can we help you?            │
│                                     │
│  📋 Select Category                 │
│  ┌─────────────────────────────────┐ │
│  │ ☑️ Question Issue               │ │
│  │ ☐ Technical Problem             │ │
│  │ ☐ Feature Request               │ │
│  │ ☐ Account Issue                 │ │
│  │ ☐ Other                         │ │
│  └─────────────────────────────────┘ │
│                                     │
│  📝 Subject                         │
│  [Incorrect answer in Math Q#1234] │
│                                     │
│  💬 Describe your issue             │
│  ┌─────────────────────────────────┐ │
│  │ The answer provided for         │ │
│  │ question #1234 seems incorrect. │ │
│  │ The correct answer should be... │ │
│  │                                 │ │
│  │                                 │ │
│  └─────────────────────────────────┘ │
│                                     │
│  📎 Attach Screenshot (Optional)    │
│  [📷 Take Photo] [🖼️ Choose Image]  │
│                                     │
│  [📤 Send Message]                  │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **Component**: `ContactSupportScreen.tsx`
- **Ticketing System**: Custom support ticket management
- **Libraries**:
  - `expo-image-picker` for attachments
  - Email/SMS integration for notifications
- **Features**:
  - Categorized support requests
  - File attachments support
  - Auto-response system
  - Ticket tracking and status updates

### 9. 💰 Monetization Integration

#### 9.1 Ad Integration Points
```
┌─────────────────────────────────────┐
│  📱 App with Ad Placements          │
│                                     │
│  🏠 Dashboard                       │
│  ┌─────────────────────────────────┐ │
│  │ [Banner Ad - Top]               │ │
│  └─────────────────────────────────┘ │
│  • Quick Stats                      │
│  • Quick Actions                    │
│  ┌─────────────────────────────────┐ │
│  │ [Native Ad - Between Content]   │ │
│  └─────────────────────────────────┘ │
│  • Recent Activity                  │
│                                     │
│  📝 Paper Generation                │
│  • Show Interstitial after paper   │
│    generation complete              │
│                                     │
│  📄 PDF Download                    │
│  • Rewarded Ad for premium features│
│  • "Watch ad to unlock answer key" │
│                                     │
│  📚 Question Bank                   │
│  ┌─────────────────────────────────┐ │
│  │ [Banner Ad - Bottom]            │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Technical Implementation:**
- **AdMob Integration**: `expo-ads-admob`
- **Ad Types**:
  - Banner ads on main screens
  - Interstitial ads after major actions
  - Rewarded ads for premium features
- **Libraries**:
  - `react-native-google-mobile-ads`
  - Ad mediation for better revenue
- **Features**:
  - Non-intrusive ad placement
  - Frequency capping
  - User consent management
  - Revenue analytics

---

## 🗄️ Database Schema

### SQLite Tables Structure

```sql
-- Users Table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone_number TEXT UNIQUE NOT NULL,
    name TEXT,
    email TEXT,
    school_name TEXT,
    subjects TEXT, -- JSON array
    role TEXT DEFAULT 'teacher', -- teacher, admin
    profile_picture TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    parent_id INTEGER,
    order_index INTEGER DEFAULT 0,
    created_by INTEGER,
    FOREIGN KEY (parent_id) REFERENCES categories(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Questions Table
CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    question_type TEXT NOT NULL, -- mcq, short, long, fill, passage, etc.
    subject_id INTEGER,
    class_level TEXT,
    chapter TEXT,
    difficulty TEXT, -- easy, medium, hard
    marks INTEGER DEFAULT 1,
    options TEXT, -- JSON for MCQ options
    correct_answer TEXT,
    explanation TEXT,
    images TEXT, -- JSON array of image URLs
    tags TEXT, -- JSON array
    created_by INTEGER,
    approved_by INTEGER,
    status TEXT DEFAULT 'pending', -- pending, approved, rejected
    version INTEGER DEFAULT 1,
    parent_question_id INTEGER, -- for versioning
    usage_count INTEGER DEFAULT 0,
    rating REAL DEFAULT 0,
    rating_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES categories(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (approved_by) REFERENCES users(id),
    FOREIGN KEY (parent_question_id) REFERENCES questions(id)
);

-- Papers Table
CREATE TABLE papers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    paper_type TEXT NOT NULL,
    subject_id INTEGER,
    class_level TEXT,
    duration INTEGER, -- in minutes
    total_marks INTEGER,
    instructions TEXT,
    created_by INTEGER,
    status TEXT DEFAULT 'draft', -- draft, published
    template_data TEXT, -- JSON
    generated_pdf_path TEXT,
    generated_word_path TEXT,
    download_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES categories(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Paper Questions Junction Table
CREATE TABLE paper_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    paper_id INTEGER,
    question_id INTEGER,
    section_name TEXT,
    question_order INTEGER,
    custom_marks INTEGER, -- override default marks
    custom_content TEXT, -- for manual questions
    is_custom BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (paper_id) REFERENCES papers(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Question Reports Table
CREATE TABLE question_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER,
    reported_by INTEGER,
    reason TEXT NOT NULL,
    details TEXT,
    status TEXT DEFAULT 'pending', -- pending, resolved, dismissed
    resolved_by INTEGER,
    resolution_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    resolved_at DATETIME,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (reported_by) REFERENCES users(id),
    FOREIGN KEY (resolved_by) REFERENCES users(id)
);

-- Support Tickets Table
CREATE TABLE support_tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    category TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    attachments TEXT, -- JSON array
    status TEXT DEFAULT 'open', -- open, in_progress, resolved, closed
    priority TEXT DEFAULT 'medium', -- low, medium, high, urgent
    assigned_to INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Notifications Table
CREATE TABLE notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT, -- system, update, promotion
    data TEXT, -- JSON for additional data
    read_status BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- User Preferences Table
CREATE TABLE user_preferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE,
    notification_settings TEXT, -- JSON
    download_preferences TEXT, -- JSON
    ui_preferences TEXT, -- JSON
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Analytics Table
CREATE TABLE analytics_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    event_type TEXT NOT NULL,
    event_data TEXT, -- JSON
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Full Text Search Virtual Table
CREATE VIRTUAL TABLE questions_fts USING fts5(
    content,
    explanation,
    tags,
    content='questions',
    content_rowid='id'
);
```

---

## 🔄 State Management Architecture

### Context Structure
```typescript
// Global App Context
interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  preferences: UserPreferences;
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

// Question Management Context
interface QuestionContextType {
  questions: Question[];
  filters: QuestionFilters;
  searchQuery: string;
  selectedQuestions: Question[];
  pagination: PaginationState;
}

// Paper Creation Context
interface PaperContextType {
  currentPaper: Paper | null;
  paperConfig: PaperConfig;
  selectedQuestions: Question[];
  generationStatus: GenerationStatus;
  previewData: PreviewData | null;
}

// Admin Context
interface AdminContextType {
  pendingReports: QuestionReport[];
  systemStats: SystemStats;
  userManagement: UserManagementState;
  contentModeration: ModerationQueue;
}
```

---

## 📱 Performance Optimization Strategies

### 1. **Image Optimization**
```typescript
// Image compression and resizing
const optimizeImage = async (uri: string, size: 'small' | 'medium' | 'large') => {
  const sizeMap = {
    small: { width: 200, height: 200 },
    medium: { width: 400, height: 400 },
    large: { width: 800, height: 800 }
  };
  
  return await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: sizeMap[size] }],
    { compress: 0.8, format: ImageManipulator.SaveFormat.WEBP }
  );
};
```

### 2. **Virtual Lists for Large Datasets**
```typescript
// Optimized question list rendering
const QuestionList = ({ questions }: { questions: Question[] }) => {
  const getItemLayout = useCallback((data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  return (
    <FlatList
      data={questions}
      renderItem={({ item }) => <QuestionCard question={item} />}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={10}
    />
  );
};
```

### 3. **Background Paper Generation**
```typescript
// Queue-based paper generation
const generatePaperInBackground = async (paperConfig: PaperConfig) => {
  return await TaskManager.defineTask('PAPER_GENERATION', async ({ data }) => {
    const { paperConfig } = data;
    
    // Generate paper in background
    const pdfPath = await generatePDF(paperConfig);
    const wordPath = await generateWord(paperConfig);
    
    // Send notification when complete
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Paper Ready!',
        body: `${paperConfig.title} has been generated successfully.`,
        data: { pdfPath, wordPath }
      },
      trigger: null
    });
  });
};
```

---

## 🔐 Security Implementation

### 1. **Authentication Flow**
```typescript
// JWT-based authentication with role management
interface AuthToken {
  userId: number;
  role: 'teacher' | 'admin';
  permissions: string[];
  exp: number;
}

const authenticateUser = async (phoneNumber: string, otp: string) => {
  const response = await api.post('/auth/verify-otp', {
    phoneNumber,
    otp
  });
  
  const { token, user } = response.data;
  await SecureStore.setItemAsync('auth_token', token);
  return { token, user };
};
```

### 2. **Data Encryption**
```typescript
// Sensitive data encryption
const encryptSensitiveData = async (data: string) => {
  const key = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    'your-secret-key'
  );
  return await Crypto.encryptAsync(data, key);
};
```

---

## 📊 Analytics & Monitoring

### Event Tracking
```typescript
// Analytics event tracking
const trackEvent = async (eventType: string, eventData: any) => {
  await database.executeSql(
    'INSERT INTO analytics_events (user_id, event_type, event_data) VALUES (?, ?, ?)',
    [currentUser.id, eventType, JSON.stringify(eventData)]
  );
};

// Usage examples
trackEvent('paper_generated', { paperType, questionCount, subject });
trackEvent('question_added', { questionType, subject, difficulty });
trackEvent('pdf_downloaded', { paperId, downloadMethod });
```

---

## 🚀 Deployment & Distribution

### Build Configuration
```json
{
  "expo": {
    "name": "NCERT Paper Generator",
    "slug": "ncert-paper-generator",
    "version": "1.0.0",
    "platforms": ["ios", "android"],
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.ncert.papergenerator"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.ncert.papergenerator",
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "plugins": [
      "expo-camera",
      "expo-image-picker",
      "expo-document-picker",
      "expo-notifications",
      [
        "expo-ads-admob",
        {
          "androidAppId": "ca-app-pub-xxxxxxxx~xxxxxxxx",
          "iosAppId": "ca-app-pub-xxxxxxxx~xxxxxxxx"
        }
      ]
    ]
  }
}
```

This comprehensive wireframe and technical plan provides a complete roadmap for building your NCERT Paper Generator app with all the features you requested, using the latest React Native and Expo technologies for optimal performance and user experience.