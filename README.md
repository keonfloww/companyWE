# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### For Android

```bash
# OR using Yarn
yarn && yarn android
```

### For iOS

```bash
# OR using Yarn
yarn && yarn ios
```

### TODO:

- ✅ MVVM - MVP architecture with DDD approach
- ✅ Atomics design
- ✅ Navigation service to use outside context
- ✅ Debug view for development
- ✅ Handle theme provider
- ✅ Separate basic env
- ✅ Base Form Item
- ✅ Eslint, Prettier
- ✅ Babel alias config
- ✅ Global props
- ✅ Localization by namespace
- ✅ Setup Redux and Redux Persist store
- [ ] Handle theme provider from rneui for StyleSheet
- [ ] MKKV mix Redux Persit
- [ ] Form items validation utils
- [ ] Splash screen with react native bootsplash
- [ ] Init react-native-modalize common component(modal, bottom sheet)
- [ ] Fastlane CI/CD to distribute IPA to testflight, apk to Slack/Firebase project
- [ ] Create common component in Troove design
- [ ] Install patch-package for custom the library
- [ ] Create hook for Troove websocket event

# Follow MVVM - MVP for this project:

- Model: Our store reducers slice, slice.api
- View: Components in Screen, View
- ViewModel:
  > > Custom hook by actor/model (useUserViewModel)
  > > This view model will hold whole of logic of the actor/model
- Presenter/Controller: Create custom hook for each View, Screen. Then use in specific View, Screen

# Project DDD structure:

> Here, we focus on structure project as unit of features.
> Then we can easy to develop new features or clone our features skeleton to new project.

```
├── src
│   ├── assets
│   ├── components
│   ├── i18n
│   ├── layouts
│   ├── models
│   ├── navigation
│   ├── redux
│   ├── screens
│   ├── ├── Home
│   ├── ├── ├── components
│   ├── ├── ├── hooks
│   ├── ├── ├── screens
│   ├── ├── ├── ├── Index.tsx
│   ├── ├── ├── ├── Create.tsx
│   ├── ├── ├── ├── Update.tsx
│   ├── ├── ├── ├── Delete.tsx
│   ├── ├── ├── views
│   ├── ├── ├── HomeScreen.tsx
│   ├── ├── Intro
│   ├── ├── ├── components
│   ├── ├── ├── hooks
│   ├── ├── ├── screens
│   ├── ├── ├── views
│   ├── ├── ├── IntroScreen.tsx
│   ├── ├── Other features...
│   ├── services
│   ├── utils
│   ├── views
│   ├── model
│   ├── index.js
└── ...
```
