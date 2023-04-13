import { replace } from '@itznevikat/router';
import { PanelTypes } from '@routes/structure.navigate';
import { Component, ReactNode } from 'react';

export class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(properties: { children: ReactNode; fallback: ReactNode }) {
    super(properties);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render will show the fallback UI.
    replace(PanelTypes.ERROR);
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: any) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.info(error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}
