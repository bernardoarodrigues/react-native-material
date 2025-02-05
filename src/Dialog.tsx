import React, { useEffect, useMemo, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, TouchableWithoutFeedback, ViewProps } from 'react-native';
import { Portal } from './base/PortalContext';
import Surface from './Surface';

export interface DialogProps extends ViewProps {
  visible?: boolean;

  onDismiss?: () => void;

  onLayout?: () => void;
}

const Dialog: React.FC<DialogProps> = ({ visible = false, onDismiss, onLayout, children }) => {
  const [portalVisible, setPortalVisible] = useState(visible);

  const animatedValue = useMemo(() => new Animated.Value(visible ? 1 : 0), []);

  useEffect(() => {
    if (visible) setPortalVisible(true);

    Animated.timing(animatedValue, {
      toValue: visible ? 1 : 0,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: Platform.OS !== 'android',
    }).start(() => {
      if (!visible) setPortalVisible(false);
    });
  }, [visible]);

  if (!portalVisible) return null;

  return (
    <Portal>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: animatedValue }]} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.container, { opacity: animatedValue }]}
        pointerEvents="box-none"
        needsOffscreenAlphaCompositing={Platform.OS === 'android'}
        onLayout={onLayout}
      >
        <Surface category="medium" elevation={24} style={[styles.surface]}>
          {children}
        </Surface>
      </Animated.View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  surface: {
    flex: 1,
    marginHorizontal: 20,
  },
});

export default Dialog;
