# Richmond Harvest Map — Expo WebView Wrapper

Wraps the hosted Base44 web app (`https://richmond-harvest-map.base44.app`) in a
native Android shell so it can be published to the Google Play Store.

## One-time setup (do this yourself first)

1. Install deps:
   ```bash
   npm install
   ```
2. Log into Expo (create a free account at expo.dev if you don't have one):
   ```bash
   npx expo login
   ```
3. Initialize EAS for this project — this creates the Expo project and writes
   a real `projectId` into `app.json` (replacing the placeholder):
   ```bash
   npx eas init
   ```
4. Push this project to a **new GitHub repo**, then connect that repo to your
   Expo project at expo.dev → your project → **Configuration → GitHub**.
   (EAS builds triggered remotely need the GitHub connection.)
5. Add real icon/splash images to `./assets/`:
   - `icon.png` (1024×1024)
   - `adaptive-icon.png` (1024×1024, transparent bg ok)
   - `splash.png` (1284×2778 recommended)

## Once that's done

Tell Claude your Expo project's full name (`@your-expo-username/richmond-harvest-map`)
or the `projectId` from `app.json`, and it can:
- Trigger an EAS Android build (`build_run`)
- Check build status (`build_list`)
- Submit the finished build to your connected Google Play Developer account
  (`build_submit`, track: internal/alpha/beta/production)

## Notes

- `com.richmondharvestmap.app` is the Android package name in `app.json` —
  change it if you'd prefer something else, but it must be unique on the
  Play Store and can't be changed after your first release.
- The WebView wrapper enables geolocation so "near me" style features in the
  web app keep working; Android will prompt the user for location permission
  the first time it's used.
- Hardware back button navigates within the site before exiting the app.
