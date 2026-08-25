import React, { useRef, useState, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';

// The hosted Base44 app for Richmond Harvest Map
const APP_URL = 'https://richmond-harvest-map.base44.app';

export default function App() {
  const webviewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  // Let Android hardware back button navigate within the WebView first
  React.useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack();
        return true;
      }
      return false;
    };
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1F4B3F" />
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#1F4B3F" />
        </View>
      )}
      <WebView
        ref={webviewRef}
        source={{ uri: APP_URL }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
        startInLoadingState
        allowsBackForwardNavigationGestures
        domStorageEnabled
        javaScriptEnabled
        geolocationEnabled
        originWhitelist={['*']}
        setSupportMultipleWindows={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1F4B3F',
  },
  webview: {
    flex: 1,
    backgroundColor: '#FBF3E1',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBF3E1',
  },
});
