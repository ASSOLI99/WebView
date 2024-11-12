import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { WebView } from "react-native-webview";

const FullScreenWebView = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false); // Track if there's a back history
  const webViewRef = useRef<WebView>(null);

  const onLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const onLoadEnd = () => setLoading(false);

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  // Update canGoBack state when the navigation state changes
  const onNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
  };

  // Handle back button for navigation within WebView history
  const handleBackPress = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  // Listen for the hardware back button press on Android
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, [canGoBack]);

  return (
    <View style={styles.container}>
      <View style={styles.statusBarBackground}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor="transparent"
        />
      </View>

      {/* Loading Spinner */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load page.</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => webViewRef.current?.reload()}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: "https://entaj.tech" }}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={onError}
        onNavigationStateChange={onNavigationStateChange} // Track navigation state
        style={styles.webView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBarBackground: {
    height: StatusBar.currentHeight || 44,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 2,
  },
  errorContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -50 }],
    alignItems: "center",
    zIndex: 3,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  webView: {
    flex: 1,
  },
});

export default FullScreenWebView;
